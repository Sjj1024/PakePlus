import http from '@/utils/http'
import { ResponseType } from '@tauri-apps/api/http'

export default {
    // get github api rate limit
    gitRatelimit() {
        return http('/rate_limit', {
            method: 'get',
            responseType: ResponseType.JSON,
        })
    },
    // get github user info
    gitUserInfo() {
        return http('/user', {
            method: 'get',
            responseType: ResponseType.JSON,
        })
    },
    // creat project repository
    creatProgect(body: any) {
        return http(`/repos/Sjj1024/PakePlus/forks`, {
            method: 'post',
            body,
        })
    },
}
