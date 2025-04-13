import { convertToLocalTime, initProject } from '@/utils/common'
import { defineStore } from 'pinia'
import githubApi from '@/apis/github'

export const usePakeStore = defineStore('pakeplus', {
    state: () => {
        return {
            // 用户信息
            userInfo: localStorage.getItem('userInfo')
                ? JSON.parse(localStorage.getItem('userInfo') as string)
                : {
                      login: '',
                      id: 0,
                      node_id: '',
                      avatar_url: '',
                      gravatar_id: '',
                      url: '',
                      html_url: 'https://github.com/Sjj1024',
                      followers_url: '',
                      following_url: '',
                      gists_url: '',
                      starred_url: '',
                      subscriptions_url: '',
                      organizations_url: '',
                      repos_url: '',
                      events_url: '',
                      received_events_url: '',
                      type: 'User',
                      site_admin: false,
                      name: '1024小神',
                      company: '',
                      blog: '',
                      location: '',
                      email: null,
                      hireable: null,
                      bio: 'Who am I? \r\nWhere am I? \r\nWhat am I going to do?\r\n',
                      twitter_username: null,
                      notification_email: null,
                      public_repos: 46,
                      public_gists: 1,
                      followers: 120,
                      following: 61,
                      created_at: '2019-03-10T04:28:19Z',
                      updated_at: '2024-08-22T04:54:05Z',
                  },
            // sha info
            shaInfo: {
                desktopMain: '',
                desktopWeb: '',
                iosMain: '',
                iosWeb: '',
                androidMain: '',
                androidWeb: '',
            },
            // 当前项目
            currentProject: localStorage.getItem('currentProject')
                ? JSON.parse(localStorage.getItem('currentProject') as string)
                : initProject,
            // 当前项目发布
            currentRelease: localStorage.getItem('currentRelease')
                ? JSON.parse(localStorage.getItem('currentRelease') as string)
                : {
                      url: '',
                      assets_url: '',
                      upload_url: '',
                      html_url: '',
                      id: 0,
                      node_id: '',
                      tag_name: '',
                      target_commitish: '',
                      name: '',
                      draft: false,
                      prerelease: false,
                      created_at: '2024-09-23T10:46:29Z',
                      published_at: '2024-09-23T10:48:30Z',
                      assets: [],
                      tarball_url: '',
                      zipball_url: '',
                      body: '',
                  },
            // 项目列表
            projectList: localStorage.getItem('projectList')
                ? JSON.parse(localStorage.getItem('projectList') as string)
                : ([] as Project[]),
            // 发布信息
            releases: localStorage.getItem('releases')
                ? JSON.parse(localStorage.getItem('releases') as string)
                : ({
                      pakeplus: {
                          url: '',
                          assets_url: '',
                          upload_url: '',
                          html_url: '',
                          id: 0,
                          node_id: '',
                          tag_name: '',
                          target_commitish: '',
                          name: '',
                          draft: false,
                          prerelease: false,
                          created_at: '2024-09-23T10:46:29Z',
                          published_at: '2024-09-23T10:48:30Z',
                          assets: [],
                          tarball_url: '',
                          zipball_url: '',
                          body: '',
                      },
                  } as { [key: string]: any }),
            //  token
            token: localStorage.getItem('token') || '',
            //  重新预览倒计时
            previewSecond: 60,
            // 预览静态文件夹路径
            previewPath: '',
            // timer
            timer: 0 as any,
            age: 18,
            sex: '男',
        }
    },
    getters: {
        getAddAge: (state) => {
            return (num: number) => state.age + num
        },
        noSjj1024: (state) => {
            return state.userInfo.login !== 'Sjj1024'
        },
        isRelease: (state) => {
            console.log('isReleaseisRelease', state.currentRelease)
            return (
                state.currentRelease !== undefined &&
                state.currentRelease.id !== 0
            )
        },
    },
    actions: {
        actionSecond() {
            console.log(
                'actionSecond',
                this.previewSecond,
                this.previewPath,
                this.currentProject.htmlPath
            )
            if (
                this.previewPath !== '' &&
                this.currentProject.htmlPath === this.previewPath
            ) {
                this.previewSecond = 60
                this.timer && clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.previewSecond--
                    if (this.previewSecond <= -1) {
                        this.timer && clearInterval(this.timer)
                        this.previewSecond = 60
                    }
                }, 1000)
            }
        },
        setPreviewPath(path: string) {
            this.previewPath = path
        },
        setToken(token: any) {
            this.token = token
            localStorage.setItem('token', token)
        },
        setUser(info: any) {
            this.userInfo = info
            localStorage.setItem('userInfo', JSON.stringify(info))
        },
        setCurrentProject(info: any) {
            this.currentProject = info
            // if project not in projectList, add it
            this.addUpdatePro(info)
            localStorage.setItem('currentProject', JSON.stringify(info))
        },
        addUpdatePro(project: Project) {
            this.currentProject = project
            localStorage.setItem('currentProject', JSON.stringify(project))
            const exist = this.projectList.findIndex((item: Project) => {
                return item.name === project.name
            })
            if (exist !== -1) {
                this.projectList[exist] = project
            } else {
                this.projectList.push(project)
            }
            localStorage.setItem(
                'projectList',
                JSON.stringify(this.projectList)
            )
        },
        delProject(project: Project) {
            // delete release
            this.setRelease(project.name, { id: 0 })
            const exist = this.projectList.findIndex((item: Project) => {
                return item.name === project.name
            })
            if (exist !== -1) {
                this.projectList.splice(exist, 1)
                localStorage.setItem(
                    'projectList',
                    JSON.stringify(this.projectList)
                )
            }
        },
        setRelease(proName: string, info: any) {
            if (info && info.id !== 0) {
                this.releases[proName] = info
            } else {
                delete this.releases[proName]
            }
            if (proName === this.currentProject.name) {
                this.currentRelease = info
            }
            localStorage.setItem('releases', JSON.stringify(this.releases))
        },
        async setCurrentRelease() {
            console.log('setCurrentRelease', this.currentRelease)
            if (
                this.releases[this.currentProject.name] &&
                this.releases[this.currentProject.name].id !== 0
            ) {
                this.currentRelease = this.releases[this.currentProject.name]
                this.getRelease()
            } else {
                this.currentRelease = { id: 0 }
                await this.getRelease()
            }
        },
        // update tauri config
        updateTauriConfig(info: any) {
            this.currentProject.url = info.windows.url
            this.currentProject.more = info
            localStorage.setItem(
                'currentProject',
                JSON.stringify(this.currentProject)
            )
        },
        async getRelease() {
            // if token is null, return
            if (localStorage.getItem('token')) {
                const releaseRes: any = await githubApi.getReleasesAssets(
                    this.userInfo.login,
                    'PakePlus',
                    this.currentProject.name
                )
                console.log('releaseRes', releaseRes)
                if (
                    releaseRes.status === 200 &&
                    releaseRes.data.assets.length >= 3
                ) {
                    // filter current project version
                    const assets = releaseRes.data.assets.filter(
                        (item: any) => {
                            return (
                                item.name.includes(
                                    this.currentProject.version
                                ) || item.name.includes('tar')
                            )
                        }
                    )
                    const releaseData = {
                        ...releaseRes.data,
                        assets: assets.map((asset: any) => {
                            return {
                                ...asset,
                                updated_at: convertToLocalTime(
                                    asset.updated_at
                                ),
                            }
                        }),
                    }
                    this.setRelease(this.currentProject.name, releaseData)
                    this.currentRelease = releaseData
                    return releaseData
                } else {
                    console.error('releaseRes error', releaseRes)
                    this.setRelease(this.currentProject.name, { id: 0 })
                    return null
                }
            }
        },
        // android build step
        async *androidBuildStep() {
            // 1. delete release
            yield 'delete release'
            // 2. update icon
            yield 'update icon'
            // 3. update build.yml
            yield 'update android.yml'
            // 4. update custom.js
            yield 'update custom.js'
            // 5. dispatch action
            yield 'dispatch action'
        },
    },
})
