<template>
    <div class="homeBox">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <span>{{ t('projectTitle') }}</span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ t('projectTips') }}
                    </span>
                    <span
                        @click="openUrl(pakeUrlMap.github)"
                        class="iconfont githubIcon"
                    >
                        &#xe709;
                    </span>
                </div>
            </div>
            <!-- set button -->
            <div class="toolBox">
                <!-- theme change -->
                <div class="theme">
                    <el-dropdown>
                        <span class="dropdownLink">
                            <span class="iconfont themeIcon">&#xe635;</span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="chageTheme('dark')">
                                    {{ t('darkMode') }}
                                </el-dropdown-item>
                                <el-dropdown-item @click="chageTheme('light')">
                                    {{ t('lightMode') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="language">
                    <el-dropdown>
                        <span class="dropdownLink">
                            <span class="iconfont langIcon">
                                {{ locale === 'en' ? '&#xe6a3;' : '&#xe6a2;' }}
                            </span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="changeLang('en')">
                                    English
                                </el-dropdown-item>
                                <el-dropdown-item @click="changeLang('zh')">
                                    简体中文
                                </el-dropdown-item>
                                <el-dropdown-item @click="changeLang('zhTw')">
                                    繁体中文
                                </el-dropdown-item>
                                <el-dropdown-item @click="changeLang('ja')">
                                    日本語
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="setting" @click="tokenDialog = true">
                    <!-- <span class="userName">{{ store.userInfo.login }}</span> -->
                    <span class="iconfont setIcon">&#xe667;</span>
                </div>
            </div>
        </div>
        <div class="projectBox">
            <!-- project list -->
            <div
                class="project"
                v-for="pro in store.projectList"
                :key="pro.id"
                @click="goProject(pro)"
            >
                <img :src="getImgUrl(pro.icon)" class="appIcon" alt="appIcon" />
                <div class="infoBox">
                    <div class="appBox">
                        <div class="appName">{{ pro.name }}</div>
                        <div class="appVersion">{{ pro.version }}</div>
                    </div>
                    <span class="appDesc">
                        {{ pro.desc || 'this is a pakeplus project' }}
                    </span>
                </div>
            </div>
            <!-- new project -->
            <div class="project newProject" @click="showBranchDialog">
                <el-icon class="addIcon" :size="26"><Plus /></el-icon>
            </div>
        </div>
        <!-- version -->
        <div class="version" @click="goAbout">v{{ version }}</div>
        <!-- config github token -->
        <el-dialog v-model="tokenDialog" width="500" center>
            <template #header>
                <div class="diaHeader">
                    <span>Github Token</span>
                    <!-- <el-icon class="diaTipsIcon"><Warning /></el-icon> -->
                </div>
            </template>
            <div class="diaContent">
                <el-input
                    v-model="token"
                    autocomplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="github token"
                    class="tokenInput"
                />
                <el-button @click="testToken(true)" :loading="testLoading">{{
                    t('testToken')
                }}</el-button>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="tokenDialog = false">{{
                        t('cancel')
                    }}</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="testToken(false)">
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- config new project name -->
        <el-dialog v-model="branchDialog" width="400" center>
            <template #header>
                <div class="diaHeader">
                    <span>{{ t('projectName') }}</span>
                </div>
            </template>
            <div class="diaContent">
                <el-input
                    v-model="branchName"
                    autocomplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    :placeholder="t('projectNamePlaceholder')"
                    class="tokenInput"
                />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="branchDialog = false">{{
                        t('cancel')
                    }}</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                        type="primary"
                        @click="creatBranch"
                        :loading="creatLoading"
                    >
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- tips new version -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'
import githubApi from '@/apis/github'
import { ElMessage } from 'element-plus'
import { usePakeStore } from '@/store'
import { pakeUrlMap, openUrl, initProject } from '@/utils/common'
import pakePlusIcon from '@/assets/images/pakeplus.png'
import { useI18n } from 'vue-i18n'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { getVersion } from '@tauri-apps/api/app'
import { invoke } from '@tauri-apps/api/tauri'

const router = useRouter()
const store = usePakeStore()
const { t, locale } = useI18n()

const token = ref(localStorage.getItem('token') || '')
const version = ref('')
const tokenDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')
const testLoading = ref(false)

const chageTheme = (theme: string) => {
    if (theme === 'light') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
    }
    localStorage.setItem('theme', theme)
}

// go project detail
const goProject = (pro: Project) => {
    store.setCurrentProject(pro)
    router.push('/edit')
}

// go about
const goAbout = () => {
    router.push('/about')
}

// get img url
const getImgUrl = (filePath: string) => {
    if (filePath) {
        const timestamp = new Date().getTime()
        return `${convertFileSrc(filePath)}?t=${timestamp}`
    } else {
        return pakePlusIcon
    }
}

// new barnch config
const showBranchDialog = () => {
    // dev need config
    // router.push('/edit')
    getCommitSha()
    // checkout has github token
    if (localStorage.getItem('token')) {
        // need creat new branch, first input project name
        branchDialog.value = true
    } else {
        tokenDialog.value = true
        ElMessage.error(t('configToken'))
        return
    }
}

const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

// check token and confirm token is ok
const testToken = async (tips: boolean = true) => {
    testLoading.value = true
    const res: any = await githubApi.gitUserInfo(token.value)
    console.log('testToken', res)
    if (res.status === 200) {
        localStorage.setItem('token', token.value)
        store.setUser(res.data)
        forkProgect(tips)
    } else {
        ElMessage.error(t('tokenError'))
        testLoading.value = false
    }
}

// fork and start
const forkProgect = async (tips: boolean = true) => {
    // fork action is async
    const forkRes: any = await githubApi.forkProgect({
        name: 'PakePlus',
        default_branch_only: true,
    })
    console.log('forkRes', forkRes)
    if (forkRes.status === 202) {
        store.setRepository(forkRes.data)
    } else if (forkRes.status === 403) {
        // maybe account has locked
        testLoading.value = false
        ElMessage.error(forkRes.data.message)
    } else {
        console.log('fork error', forkRes)
        testLoading.value = false
        ElMessage.error(forkRes.data.message)
    }
    // start
    const startRes = await githubApi.startProgect()
    console.log('startRes', startRes)
    if (startRes.status === 204) {
        console.log('start success')
    }
    // wait fork done, enable github action
    const timer = setInterval(async () => {
        const status = await getCommitSha()
        console.log('wait fork done', status)
        if (status) {
            deleteBuildYml()
            timer && clearInterval(timer)
            testLoading.value = false
            if (!tips) {
                tokenDialog.value = false
            } else {
                ElMessage.success(t('tokenOk'))
            }
        } else {
            console.log('wait fork done')
        }
    }, 1000)
}

// get commit sha
const getCommitSha = async () => {
    const res: any = await githubApi.getCommitSha(
        store.userInfo.login,
        'PakePlus'
    )
    console.log('getCommitSha', res.data[0])
    if (res.status === 200) {
        store.setCommitSha(res.data[0])
        return true
    } else {
        return false
    }
}

// 获取需要更新的文件sha
const getFileSha = async (filePath: string, branch: string) => {
    const res: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        filePath,
        { ref: branch }
    )
    console.log('getBranch', res)
    return res
}

// button loading
const creatLoading = ref(false)

// creat project branch
const creatBranch = async () => {
    creatLoading.value = true
    await uploadBuildYml()
    // checkout branch name is english
    if (branchName.value && /^[A-Za-z0-9]+$/.test(branchName.value)) {
        console.log('branchName.value', branchName.value)
        const res: any = await githubApi.createBranch(
            store.userInfo.login,
            'PakePlus',
            {
                ref: `refs/heads/${branchName.value}`,
                sha: store.commit.sha,
            }
        )
        console.log('createBranch', res)
        // 201 is ok
        if (res.status === 201) {
            const branchInfo: Project = {
                ...res.data,
                ...initProject,
                name: branchName.value,
            }
            console.log('branch Info success', branchInfo)
            store.setCurrentProject(branchInfo)
            creatLoading.value = false
            router.push('/edit')
            // update new branch build.yml file
            // updateBuildYml(branchName.value)
        } else if (res.status === 422) {
            console.log('project existed')
            creatLoading.value = false
            ElMessage.success(t('projectExist'))
            // router.push('/publish')
        } else if (res.status === 401) {
            ElMessage.error(t('tokenError'))
            creatLoading.value = false
        } else {
            creatLoading.value = false
            console.log('branchInfo error', res)
            ElMessage.error(`${t('creatProjectError')}: ${res.data.message}`)
        }
    } else {
        ElMessage.error(t('englishName'))
        creatLoading.value = false
    }
}

// creat build yml
const uploadBuildYml = async (branchName: string = 'main') => {
    // get build.yml file content
    const content = await invoke('update_build_file', {
        name: 'PakePlus',
        body: 'This is a workflow to help you automate the publishing of your PakePlus project to GitHub Packages.',
    })
    console.log('content', content)
    // update build.yml file content
    const updateRes: any = await githubApi.createBuildYml(
        store.userInfo.login,
        'PakePlus',
        {
            message: 'update build.yml from pakeplus',
            content: content,
        }
    )
    if (updateRes.status === 200 || updateRes.status === 201) {
        console.log('updateRes', updateRes)
    } else {
        console.log('updateRes error', updateRes)
    }
}

// delete build yml file, must do, because main branch need action promise
const deleteBuildYml = async (branchName: string = 'main') => {
    const shaRes = await getFileSha('.github/workflows/build.yml', branchName)
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200) {
        const deleteRes: any = await githubApi.deleteBuildYml(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'delete build.yml from pakeplus',
                sha: shaRes.data.sha,
                branch: branchName,
            }
        )
        if (deleteRes.status === 200) {
            console.log('deleteRes', deleteRes)
        } else {
            console.log('deleteRes error', deleteRes)
        }
    }
}

// check update
const checkUpdate = async () => {
    const updateJson = await githubApi.getUpdateFile()
    console.log('updateJson', updateJson)
}

const getPakePlusInfo = async () => {
    const pakeVersion = await getVersion()
    console.log('pakeVersion', pakeVersion)
    version.value = pakeVersion
    await checkUpdate()
}

// reset release info
const resetReleaseInfo = () => {
    store.setRelease({
        id: 0,
    })
}

// merge and update pakeplus
const mergeUpdateRep = async () => {
    if (token.value) {
        const res = await githubApi.mergeUpdateRep(
            store.userInfo.login,
            'PakePlus'
        )
        console.log('merge update PakePlus', res)
    }
}

onMounted(() => {
    appWindow.setTitle('PakePlus')
    getPakePlusInfo()
    resetReleaseInfo()
    mergeUpdateRep()
})
</script>

<style lang="scss" scoped>
.homeBox {
    padding: 10px 20px;
    position: relative;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.5s, color 0.5s;

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .headerTitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 20px;
            font-weight: bold;
            height: 30px;
            line-height: 30px;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .wxIcon {
                width: 22px;
                height: 22px;
                margin-left: 10px;
            }
        }

        .toolTips {
            color: gray;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height: 22px;
            line-height: 22px;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .tipsIcon {
                margin-left: 6px;
                cursor: pointer;
            }

            .githubIcon {
                width: 20px;
                height: 20px;
                font-size: 18px;
                margin-left: 10px;
                cursor: pointer;
                &:hover {
                    color: black;
                }
            }
        }

        .toolBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .dropdownLink {
                margin-right: 20px;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                cursor: default;

                .themeIcon,
                .langIcon,
                .setIcon {
                    font-size: 20px;
                    color: gray;
                    user-select: none;
                    &:hover {
                        color: var(--text-color);
                    }
                }
            }

            .setting {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .userName {
                    margin-right: 6px;
                }

                .setIcon {
                    font-size: 20px;
                    color: gray;
                    cursor: pointer;
                    &:hover {
                        color: var(--text-color);
                    }
                }
            }
        }

        .headerTool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .control {
                color: #2a598a;
                cursor: pointer;
            }
        }
    }

    .projectBox {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        gap: 10px;
        margin-top: 20px;

        .project {
            height: 200px;
            border-radius: 5px;
            border: 1px solid var(--box-shadow);
            margin-bottom: 10px;
            background-color: var(--project-bg);
            overflow: hidden;
            transition: background-color 0.5s, color 0.5s;

            &:hover {
                box-shadow: var(--box-shadow) 0px 0px 10px;
                transform: scale(1.01);
            }

            .appIcon {
                z-index: 1;
                width: 100%;
                height: 66%;
                object-fit: cover;
                border-radius: 2px 2px 0 0;
                background-color: var(--project-bg);
                transition: transform 0.3s ease;
                transition: background-color 0.5s, color 0.5s;
            }

            .appPreview {
                width: 100%;
                height: 66%;
            }

            .infoBox {
                z-index: 2;
                padding: 5px;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                cursor: default;

                .appBox {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .appDesc {
                    max-width: 124px;
                    display: -webkit-box;
                    font-size: small;
                    color: gray;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }

        .newProject {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            &:hover {
                color: black;
                border: 1px solid var(--box-shadow);
                transition: background-color 0.5s, color 0.5s;

                .addIcon {
                    color: var(--box-shadow);
                    font-size: 36px !important;
                    font-weight: bold;
                }
            }

            .addIcon {
                color: var(--box-shadow);
                transition: font-size 0.1s, font-weight 0.5s;
            }
        }
    }

    .version {
        position: fixed;
        bottom: 16px;
        right: 20px;
        color: gray;
        cursor: pointer;

        &:hover {
            color: var(--text-color);
        }
    }
}

.diaBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .diaContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

.diaHeader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;

    .diaTipsIcon {
        margin-left: 5px;
        cursor: pointer;
    }
}

.diaContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .tokenInput {
        margin-right: 10px;
    }
}
</style>
