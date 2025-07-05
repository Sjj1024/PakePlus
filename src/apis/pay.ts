import {
    basePayjsUrl,
    baseYunPayUrl,
    ppApisDomain,
    zPayDomain,
} from '@/utils/common'
import request from '@/utils/request'
import http from '@/utils/http'

export default {
    // get pay code
    getPayJsCode(params: any) {
        return request(`${basePayjsUrl}/api/native`, {
            method: 'post',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: params,
        })
    },
    getYunPayCode(params: any) {
        return request(`${baseYunPayUrl}/api/pay/wxpay/nativePay`, {
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    },
    checkYunPayStatus(params: any) {
        return request(`${baseYunPayUrl}/api/system/order/getPayOrderInfo`, {
            method: 'GET',
            params,
        })
    },
    getZPayCode(params: any) {
        return http(`${zPayDomain}/mapi.php`, {
            method: 'get',
            params: params,
        })
    },
    getZPayCode2(params: any) {
        return http(`${zPayDomain}/mapi.php`, {
            method: 'post',
            body: params,
        })
    },
    checkZPayStatus(params: any) {
        return http(`${zPayDomain}/api.php`, {
            method: 'get',
            params: params,
        })
    },
    getPpApis() {
        return request(`${ppApisDomain}/login`, {
            method: 'get',
        })
    },
}
