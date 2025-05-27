import http from '@/utils/request'
// import http from '@/utils/http'

export default {
    // get github api rate limit
    gitRatelimit(token: string) {
        return http('/rate_limit', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    // get github user info
    gitUserInfo(token: string) {
        return http('/user', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    // start repository
    startProgect(repo: string) {
        return http(`/user/starred/Sjj1024/${repo}`, {
            method: 'put',
        })
    },
    // following user
    followingUser() {
        return http(`/user/following/Sjj1024`, {
            method: 'put',
        })
    },
    // creat project repository
    forkProgect(repo: string, body: any) {
        return http(`/repos/Sjj1024/${repo}/forks`, {
            method: 'post',
            data: body,
        })
    },
    // get commit sha
    getCommitSha(user: string, repo: string) {
        return http(`/repos/${user}/${repo}/commits`, {
            method: 'get',
        })
    },
    // get a commit sha
    getCommitShaRef(user: string, repo: string, ref: string) {
        return http(`/repos/${user}/${repo}/commits/${ref}`, {
            method: 'get',
        })
    },
    // creat branch
    createBranch(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/git/refs`, {
            method: 'post',
            data: body,
        })
    },
    // get branch
    getBranch(user: string, repo: string, branch: string) {
        return http(`/repos/${user}/${repo}/git/refs/heads/${branch}`, {
            method: 'get',
        })
    },
    // delete branch
    deleteBranch(user: string, repo: string, branch: string) {
        return http(`/repos/${user}/${repo}/git/refs/heads/${branch}`, {
            method: 'delete',
        })
    },
    // get file contents sha
    getFileSha(user: string, repo: string, path: string, params: any) {
        return http(`/repos/${user}/${repo}/contents/${path}`, {
            method: 'get',
            params,
        })
    },
    // update or create file contents
    updateFileContent(user: string, repo: string, path: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/${path}`, {
            method: 'put',
            data: body,
        })
    },
    // update build yml contents
    updateBuildYmlFile(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/.github/workflows/build.yml`,
            {
                method: 'put',
                data: body,
            }
        )
    },
    // update icon file contents
    updateIconFile(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/app-icon.png`, {
            method: 'put',
            data: body,
        })
    },
    // creat file contents
    updateConfigFile(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/src-tauri/tauri.conf.json`,
            {
                method: 'put',
                data: body,
            }
        )
    },
    // update Cargo.toml file contents
    updateCargoFile(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/src-tauri/Cargo.toml`, {
            method: 'put',
            data: body,
        })
    },
    // creat file contents
    updateMainRsFile(user: string, repo: string, body: any) {
        return http(`/repos/${user}/${repo}/contents/src-tauri/src/main.rs`, {
            method: 'put',
            data: body,
        })
    },
    // update custom js file
    updateCustomJsFile(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/src-tauri/data/custom.js`,
            {
                method: 'put',
                data: body,
            }
        )
    },
    // dispatch workflow
    dispatchWorkflow(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/actions/workflows/build.yml/dispatches`,
            {
                method: 'post',
                data: body,
            }
        )
    },
    // enable workflow
    enableWorkflow(user: string, repo: string) {
        return http(`/repos/${user}/${repo}/actions/permissions`, {
            method: 'put',
            data: {
                enabled: true,
                allowed_actions: 'all',
            },
        })
    },
    // delete build yml
    deleteBuildYml(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/.github/workflows/build.yml`,
            {
                method: 'delete',
                data: body,
            }
        )
    },
    // Creates build yml
    createBuildYml(user: string, repo: string, body: any) {
        return http(
            `/repos/${user}/${repo}/contents/.github/workflows/build.yml`,
            {
                method: 'put',
                data: body,
            }
        )
    },
    // get workflow runs
    getWorkflowRuns(user: string, repo: string, params: any) {
        return http(`/repos/${user}/${repo}/actions/runs`, {
            method: 'get',
            params,
        })
    },
    // get workflow run releases
    getReleasesAssets(user: string, repo: string, tag: string) {
        return http(`/repos/${user}/${repo}/releases/tags/${tag}`, {
            method: 'get',
        })
    },
    // Delete a release
    deleteRelease(user: string, repo: string, release_id: number) {
        return http(`/repos/${user}/${repo}/releases/${release_id}`, {
            method: 'delete',
        })
    },
    // get update file contents
    getUpdateFile() {
        return http(`https://sjj1024.github.io/PakePlus/update.json`, {
            method: 'get',
        })
    },
    // get pakeplus info
    getPakePlusInfo() {
        return http(`/repos/Sjj1024/PakePlus/contents/package.json`, {
            method: 'get',
        })
    },
    // get web config
    getWebConfig(fileName: string, branch: string) {
        return http(
            `/repos/Sjj1024/PakePlus/contents/src-tauri/data/${fileName}`,
            {
                method: 'get',
                params: {
                    ref: branch,
                },
            }
        )
    },
    // update and merge
    mergeUpdateRep(user: string, repo: string, branch: string) {
        return http(`/repos/${user}/${repo}/merge-upstream`, {
            method: 'post',
            data: { branch },
        })
    },
    // creat issue
    createIssue(body: any) {
        return http(`/repos/Sjj1024/PakePlus/issues`, {
            method: 'post',
            data: body,
        })
    },
    // rerun failed jobs
    rerunFailedJobs(user: string, repo: string, run_id: number) {
        return http(
            `/repos/${user}/${repo}/actions/runs/${run_id}/rerun-failed-jobs`,
            {
                method: 'post',
            }
        )
    },
    // delete repository
    deleteProgect(user: string, repo: string) {
        return http(`/repos/${user}/${repo}`, {
            method: 'delete',
        })
    },
    // get all branchs
    getAllBranchs(user: string, repo: string) {
        return http(`/repos/${user}/${repo}/branches`, {
            method: 'get',
        })
    },
    // get upstream branch last commit
    getUpstreamCommit(user: string, repo: string, branch: string) {
        return http(`/repos/${user}/${repo}/git/refs/heads/${branch}`, {
            method: 'get',
        })
    },
    // force update branch
    forceUpdateBranch(user: string, repo: string, branch: string, body: any) {
        return http(`/repos/${user}/${repo}/git/refs/heads/${branch}`, {
            method: 'patch',
            data: body,
        })
    },
}
