import http from '@/utils/http'
import { ResponseType } from '@tauri-apps/api/http'

export default {
    // get github api rate limit
    gitRatelimit(token: string) {
        return http('/rate_limit', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'PostmanRuntime/7.41.2',
            },
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
    // creat file contents
    updateConfigFile(body: any) {
        return http(`/repos/{owner}/{repo}/contents/{path}`, {
            method: 'post',
            body,
        })
    },
    // creat file contents
    updateMainRsFile(body: any) {
        return http(`/repos/{owner}/{repo}/contents/{path}`, {
            method: 'post',
            body,
        })
    },
}
