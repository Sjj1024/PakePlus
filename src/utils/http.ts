import { fetch } from '@tauri-apps/plugin-http'

// base url
const baseURL = `https://api.github.com`

const BODY_TYPE = {
    Form: 'Form',
    Json: 'Json',
    Text: 'Text',
    Bytes: 'Bytes',
}

const commonOptions = {
    timeout: 60,
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
    if (options?.body) {
        options.body = options.body
        // if (options.body.type === BODY_TYPE.Form) {
        //     options.headers['Content-Type'] = 'multipart/form-data'
        // }
    }
    // get params
    if (options?.params) {
        url = `${url}?${new URLSearchParams(options.params)}`
    }
    options = { ...commonOptions, ...options }
    console.log('request-------', buildFullPath(baseURL, url), options)
    return fetch(buildFullPath(baseURL, url), options)
        .then(async (response: any) => {
            const data = await response.json()
            if (response.status >= 200 && response.status < 500) {
                return { status: response.status, data: data }
            }
            return Promise.reject({
                status: response.status,
                data: data,
            })
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject(err)
        })
        .finally(() => {
            console.log('finally')
        })
}

export default http
