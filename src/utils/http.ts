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
            'User-Agent': 'PostmanRuntime/7.41.2',
        }
    if (options?.data) {
        options.body = JSON.stringify(options.data)
    }
    // get params
    if (options?.params) {
        url = `${url}?${new URLSearchParams(options.params)}`
    }
    options = { ...commonOptions, ...options }
    console.log('request-------', buildFullPath(baseURL, url), options)
    return fetch(buildFullPath(baseURL, url), options)
        .then(async (response: any) => {
            console.log('fetch success response', response.json())
            // maybe response.body is null
            const data = response.body ? await response.json() : {}
            console.log('data----', data)
            if (response.status >= 200 && response.status < 500) {
                return Promise.resolve({ status: response.status, data: data })
            }
            return Promise.reject({
                status: response.status,
                data: data,
            })
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
