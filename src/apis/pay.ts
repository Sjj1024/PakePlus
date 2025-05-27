import http from '@/utils/request'

const baseURL = import.meta.env.VITE_PAY_DOMAIN

export default {
    // get pay code
    getPayCode(params: any) {
        return http(`${baseURL}/api/native`, {
            method: 'post',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: params,
        })
    },
}
