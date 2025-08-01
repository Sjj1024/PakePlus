import http from '@/utils/request'
import { urlMap } from '@/utils/common'
// import http from '@/utils/http'

export default {
    // get ppnotes
    getPPNotes() {
        return http(`${urlMap.ppnotes}`, {
            method: 'get',
        })
    },
}
