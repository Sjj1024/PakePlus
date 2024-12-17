// import { HttpVerb, fetch } from '@tauri-apps/api/http'

// // 重新获取API接口速率
// export const getApiLimit = () => {
//     let payload = {
//         method: 'GET' as HttpVerb,
//         headers: {
//             'User-Agent': 'PostmanRuntime/7.41.2',
//         },
//     }
//     fetch('https://api.github.com/rate_limit', payload)
//         .then(({ status, data }) => {
//             console.log('apilimit---', status, data)
//             if (status >= 200 && status < 500) {
//                 console.log('apilimit---', data)
//             }
//         })
//         .catch((err) => {
//             console.error('apilimiterr-------', err)
//         })
// }
