import axios from 'axios'
import i18n from '@/lang/index'
import { oneMessage } from './common'

// base url
const baseURL = import.meta.env.VITE_GITHUB_DOMAIN

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, pathUrl: string) => {
    if (baseURL && !isAbsoluteURL(pathUrl)) {
        return combineURLs(baseURL, pathUrl)
    }
    return pathUrl
}

const http = axios.create({
    baseURL,
    // timeout
    timeout: 60 * 1000 * 10,
})

http.interceptors.request.use((config) => {
    const requestUrl = buildFullPath(baseURL, config.url || '')
    if (
        !config.headers['Authorization'] &&
        localStorage.getItem('token') &&
        requestUrl.includes('github')
    ) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`
    }
    config.url = requestUrl
    config.headers['Content-Length'] = undefined
    return config
})

http.interceptors.response.use(
    (res) => {
        const rateLimit = {
            limit: res.headers['x-ratelimit-limit'],
            remaining: res.headers['x-ratelimit-remaining'],
            reset: res.headers['x-ratelimit-reset'],
            used: res.headers['x-ratelimit-used'],
        }
        // 如果已使用超过1000次，显示错误
        if (rateLimit.used && rateLimit.used > 1000) {
            oneMessage.error(i18n.global.t('apiLimit'))
        }
        return Promise.resolve(res)
    },
    (error) => {
        console.log('axios error:', error)
        if (200 <= error.status && error.status < 500) {
            return Promise.resolve({ status: error.status, data: error.data })
        }
        return Promise.reject(error)
    }
)

export default http
