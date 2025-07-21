import { fetch } from '@tauri-apps/plugin-http'
import i18n from '@/lang'
import { ElMessage } from 'element-plus'

// base url
const baseURL = import.meta.env.VITE_GITHUB_DOMAIN

const commonOptions = {
    timeout: 60 * 1000,
}

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, requestedURL: string) => {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
}

const http = async (url: string, options: any = {}) => {
    if (!options.headers)
        options.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    if (options?.body) {
        options.body = JSON.stringify(options.body)
    }
    // get params
    if (options?.params) {
        url = `${url}?${new URLSearchParams(options.params)}`
    }
    options = { ...commonOptions, ...options }
    console.log('request-------', buildFullPath(baseURL, url), options)
    return fetch(buildFullPath(baseURL, url), options)
        .then(async (response: any) => {
            console.log('fetch success response')
            // maybe response.body is null
            return await response.json()
        })
        .catch((error) => {
            console.error('fetch error', error)
            ElMessage.error(i18n.global.t('networkError'))
            return Promise.resolve({ status: 400, msg: 'fetch error' })
        })
        .finally(() => {
            console.log('fetch finally')
        })
}

export default http
