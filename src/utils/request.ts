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
            limit: parseInt(res.headers['x-ratelimit-limit']) || 0,
            remaining: parseInt(res.headers['x-ratelimit-remaining']) || 0,
            reset: parseInt(res.headers['x-ratelimit-reset']) || 0,
            used: parseInt(res.headers['x-ratelimit-used']) || 0,
        }
        // 如果已使用超过1000次，显示错误
        if (rateLimit.used && rateLimit.used > 1000) {
            oneMessage.error(i18n.global.t('apiLimit'))
        }
        return Promise.resolve(res)
    },
    (error) => {
        console.error('HTTP request failed:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
        })

        if (error.response) {
            const status = error.response.status
            if (status >= 200 && status < 500) {
                return Promise.resolve({
                    status: status,
                    data: error.response.data || error.data,
                })
            }
        } else if (error.request) {
            oneMessage.error('Network error. Please check your connection.')
        } else {
            oneMessage.error('Request configuration error.')
        }

        return Promise.reject(error)
    }
)

export default http
