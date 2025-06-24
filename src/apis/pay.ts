import { basePAYJSURL, baseYUNPAYURL } from '@/utils/common'
import http from '@/utils/request'

export default {
    // get pay code
    getPayJsCode(params: any) {
        return http(`${basePAYJSURL}/api/native`, {
            method: 'post',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: params,
        })
    },
    getYunPayCode(params: any) {
        return http(`${baseYUNPAYURL}/api/pay/wxpay/nativePay`, {
            method: 'post',
            data: params,
        })
    },
}
