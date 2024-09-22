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
    gitUserInfo(token: string) {
        return http('/user', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'PostmanRuntime/7.41.2',
            },
            responseType: ResponseType.JSON,
        })
    },
    // start repository
    startProgect() {
        return http(`/user/starred/Sjj1024/PakePlus`, {
            method: 'put',
        })
    },
    // creat project repository
    forkProgect(body: any) {
        return http(`/repos/Sjj1024/PakePlus/forks`, {
            method: 'post',
            body,
        })
    },
    // get commit sha
    getCommitSha(user: string, repo: string) {
        return http(`/repos/${user}/${repo}/commits`, {
            method: 'get',
        })
    },
    // creat branch
    createBranch(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/git/refs`, {
            method: 'post',
            body,
        })
    },
    // get file contents sha
    getFileSha(user: string, repo: string, path: string, params: any) {
        return http(`/repos/${user}/${repo}/contents/${path}`, {
            method: 'get',
            params,
        })
    },
    // update file contents
    updateFileContent(user: string, repo: string, path: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/${path}`, {
            method: 'put',
            body,
        })
    },
    // update build yml contents
    updateBuildYmlFile(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/.github/workflows/build.yml`,
            {
                method: 'put',
                body,
            }
        )
    },
    // update icon file contents
    updateIconFile(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/app-icon.png`, {
            method: 'put',
            body,
        })
    },
    // creat file contents
    updateConfigFile(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/src-tauri/tauri.conf.json`,
            {
                method: 'put',
                body,
            }
        )
    },
    // creat file contents
    updateMainRsFile(body: any) {
        return http(`/repos/{owner}/{repo}/contents/{path}`, {
            method: 'post',
            body,
        })
    },
    // dispatch workflow
    dispatchWorkflow(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/actions/workflows/build.yml/dispatches`,
            {
                method: 'post',
                body,
            }
        )
    },
}
