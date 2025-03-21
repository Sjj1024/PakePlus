<template>
    <div class="homeBox" :class="{ isWeb: !isTauri }">
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
                        @click="openUrl(urlMap.github)"
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
                <div class="setting">
                    <!-- <span class="userName">{{ store.userInfo.login }}</span> -->
                    <img
                        v-if="store.userInfo.avatar_url"
                        :src="store.userInfo.avatar_url"
                        @click="userInfoDialog = true"
                        class="userAvatar"
                        alt="userAvatar"
                    />
                    <span
                        v-else
                        @click="tokenDialog = true"
                        class="iconfont setIcon"
                        >&#xe667;
                    </span>
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
                <img
                    :src="pro.icon || pakePlusIcon"
                    class="appIcon"
                    alt="appIcon"
                />
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
                    v-model.trim="store.token"
                    autocomplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="github token"
                    class="tokenInput"
                />
                <el-button @click="testToken(true)" :loading="testLoading">
                    {{ t('testToken') }}
                </el-button>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelToken">
                        {{ t('cancel') }}
                    </el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="testToken(false)">
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- github user info -->
        <el-dialog v-model="userInfoDialog" width="500" center>
            <template #header>
                <div class="diaHeader">
                    <!-- <span>User Info</span> -->
                    <!-- <el-icon class="diaTipsIcon"><Warning /></el-icon> -->
                </div>
            </template>
            <div class="userContent">
                <div class="userAvatarBox">
                    <img
                        class="userAvatar"
                        :src="store.userInfo.avatar_url"
                        alt="avatar"
                    />
                </div>
                <div class="line">
                    {{ t('userName') }}: {{ store.userInfo.login }}
                </div>
                <div class="line">token: {{ store.token }}</div>
                <div class="tokenTips">
                    {{ t('tokenTips') }}
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="logout">{{ t('quit') }}</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="userInfoDialog = false">
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
                    v-model.trim="branchName"
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
                        @click="creatProject()"
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
import githubApi from '@/apis/github'
import { ElMessage } from 'element-plus'
import { usePakeStore } from '@/store'
import { Plus } from '@element-plus/icons-vue'
import {
    urlMap,
    openUrl,
    initProject,
    isTauri,
    base64Decode,
    platforms,
    createBranch,
    webBranch,
    mainBranch,
    getBuildYml,
    getCustomJsFetch,
} from '@/utils/common'
import pakePlusIcon from '@/assets/images/pakeplus.png'
import { useI18n } from 'vue-i18n'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { tauriConfig } from '@/utils/common'
import packageJson from '../../package.json'

const router = useRouter()
const store = usePakeStore()
const { t, locale } = useI18n()
// const token = ref(localStorage.getItem('token') || '')
const version = ref(packageJson.version)
const tokenDialog = ref(false)
const userInfoDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')
const testLoading = ref(false)

const chageTheme = async (theme: string) => {
    if (theme === 'light') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
        // await setTheme('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
        // await setTheme('dark')
    }
    localStorage.setItem('theme', theme)
}

// logout
const logout = () => {
    localStorage.clear()
    userInfoDialog.value = false
    store.$reset()
}

// go project detail
const goProject = async (pro: Project) => {
    store.setCurrentProject(pro)
    router.push('/edit')
    branchName.value = pro.name
    // check branch exist
    if (store.token) {
        githubApi
            .getBranch(store.userInfo.login, 'PakePlus', branchName.value)
            .then((res: any) => {
                if (res.status === 200) {
                    console.log('branch exist')
                } else {
                    console.log('branch not exist')
                    createBranch(
                        store.userInfo.login,
                        pro.name,
                        store.webCommit.sha
                    )
                }
            })
            .catch((err: any) => {
                console.error('getBranch error', err)
            })
    }
}

// go about
const goAbout = () => {
    router.push('/about')
}

// new barnch config
const showBranchDialog = () => {
    // if token exist, then creat branch, else next page
    // token.value && getCommitSha()
    // checkout has github token
    if (store.token === '') {
        ElMessage.error(t('configToken'))
    }
    // need creat new branch, first input project name
    branchDialog.value = true
}

const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

const cancelToken = () => {
    tokenDialog.value = false
    store.token = ''
    localStorage.setItem('token', '')
}

// check token and confirm token is ok
const testToken = async (tips: boolean = true) => {
    if (localStorage.getItem('token') !== store.token || tips) {
        testLoading.value = true
        try {
            const res: any = await githubApi.gitUserInfo(store.token)
            console.log('testToken', res)
            if (res.status === 200) {
                localStorage.setItem('token', store.token)
                store.setUser(res.data)
                if (res.data.login !== 'Sjj1024') {
                    forkStartShas(tips)
                } else {
                    await commitShas(tips)
                }
            } else {
                store.setUser({})
                ElMessage.error(t('tokenError'))
                testLoading.value = false
            }
        } catch (error) {
            store.setUser({})
            console.error('testToken error', error)
            ElMessage.error(t('networkError'))
            testLoading.value = false
        }
    } else {
        tokenDialog.value = false
    }
}

const commitShas = async (tips: boolean = true) => {
    // wait fork done, enable github action
    let getCount = 0
    while (true && getCount < 6) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('wait fork done......', testLoading.value)
        const res = await Promise.all([getCommitSha(), getWebCommitSha()])
            .then((res) => {
                console.log('wait fork done res', res)
                getCount++
                if (res[0] && res[1]) {
                    // delete build.yml
                    store.noSjj1024 && deleteBuildYml()
                    testLoading.value = false
                    if (!tips) {
                        tokenDialog.value = false
                    } else {
                        ElMessage.success(t('tokenOk'))
                    }
                    return true
                }
                return false
            })
            .catch((err) => {
                console.error('wait fork done error', err)
                return false
            })
        if (res) {
            console.log('wait fork done break')
            break
        }
    }
    if (getCount >= 6) {
        store.setUser({})
        ElMessage.error(t('initError'))
    }
    testLoading.value = false
    return false
}

// fork and start
const forkStartShas = async (tips: boolean = true) => {
    // fork action is async
    const forkRes: any = await githubApi.forkProgect({
        name: 'PakePlus',
        default_branch_only: false,
    })
    if (forkRes.status === 202) {
        store.setRepository(forkRes.data)
    } else if (forkRes.status === 403) {
        // maybe account has locked
        testLoading.value = false
        ElMessage.error(forkRes.data.message)
        return
    } else {
        console.error('fork error', forkRes)
        testLoading.value = false
        ElMessage.error(forkRes.data.message)
        return
    }
    // start
    await githubApi.startProgect()
    // commit shas
    commitShas(tips)
}

// get commit sha
const getCommitSha = async () => {
    // get commit sha by branch name
    const res: any = await githubApi.getaCommitSha(
        store.userInfo.login,
        'PakePlus',
        mainBranch
    )
    if (res.status === 200 && res.data) {
        store.setCommitSha(res.data)
        return true
    } else {
        return false
    }
}

// get commit sha
const getWebCommitSha = async () => {
    // get commit sha by branch name
    const res: any = await githubApi.getaCommitSha(
        store.userInfo.login,
        'PakePlus',
        webBranch
    )
    if (res.status === 200 && res.data) {
        store.setWebCommit(res.data)
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
    return res
}

// button loading
const creatLoading = ref(false)

// creat project branch,
const creatProject = async () => {
    creatLoading.value = true
    // update build.yml file content
    // token.value && (await uploadBuildYml())
    if (branchName.value && /^[A-Za-z][A-Za-z0-9]*$/.test(branchName.value)) {
        const customJs = await getCustomJsFetch()
        // check branch exist
        if (store.token) {
            const res: any = await githubApi.getBranch(
                store.userInfo.login,
                'PakePlus',
                branchName.value
            )
            // 404 and store.projectList not include branchName.value
            const include = store.projectList.some(
                (item: Project) => item.name === branchName.value
            )
            if (res.status === 404 && !include) {
                const branchInfo: Project = {
                    ...res.data,
                    ...initProject,
                    name: branchName.value,
                    showName: branchName.value,
                    appid: `com.${branchName.value}.app`,
                    customJs: customJs,
                    more: {
                        ...tauriConfig,
                        windows: {
                            ...tauriConfig.windows,
                            label: branchName.value,
                            title: branchName.value,
                            userAgent: platforms['desktop'].userAgent,
                            width: platforms['desktop'].width,
                            height: platforms['desktop'].height,
                        },
                    },
                }
                store.setCurrentProject(branchInfo)
                creatLoading.value = false
                // update new branch build.yml file
                createBranch(
                    store.userInfo.login,
                    branchName.value,
                    store.webCommit.sha
                )
                router.push('/edit')
            } else if (res.status === 200) {
                creatLoading.value = false
                ElMessage.success(t('projectExist'))
                // router.push('/publish')
            } else if (res.status === 401) {
                ElMessage.error(t('tokenError'))
                creatLoading.value = false
            } else {
                creatLoading.value = false
                console.error('branchInfo error', res)
                ElMessage.error(
                    `${t('creatProjectError')}: ${res.data.message}`
                )
            }
        } else {
            store.setCurrentProject({
                ...initProject,
                name: branchName.value,
                showName: branchName.value,
                appid: `com.${branchName.value}.app`,
                customJs: customJs,
            })
            router.push('/edit')
        }
    } else {
        ElMessage.error(t('englishName'))
        creatLoading.value = false
    }
}

// creat build yml
const uploadBuildYml = async (_: string = 'main') => {
    console.log('uploadBuildYml', import.meta.env.DEV)
    // get build.yml file content
    const content = await getBuildYml({
        name: 'PakePlus',
        body: 'This is a workflow to help you automate the publishing of your PakePlus project to GitHub Packages.',
    })
    // console.log('content', content)
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
        console.log('uploadBuildYml Res', updateRes)
    } else {
        console.log('uploadBuildYml error, but not important', updateRes)
    }
}

// delete build yml file, must do, because main branch need action promise
const deleteBuildYml = async (branchName: string = mainBranch) => {
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
            console.log('deleteBuildYml', deleteRes)
            uploadBuildYml()
        } else {
            console.error('deleteBuildYml error', deleteRes)
        }
    }
}

// check update
const checkUpdate = async () => {
    const response = await githubApi.getPakePlusInfo()
    console.log('updateJson', response)
    const content = base64Decode(response.data.content)
    const pakePlusJson = JSON.parse(content)
    console.log('json', pakePlusJson)
    const version = pakePlusJson.version
    console.log('version', version)
    if (version !== packageJson.version) {
        console.log('update', version)
    }
}

const getPakePlusInfo = async () => {
    const pakeVersion = packageJson.version
    console.log('pakeVersion', pakeVersion)
    version.value = pakeVersion
}

onMounted(() => {
    if (isTauri) {
        const window = getCurrentWindow()
        window.setTitle('PakePlus')
    } else {
        ElMessage.error(t('webNotStable'))
    }
    getPakePlusInfo()
    checkUpdate()
})
</script>

<style lang="scss" scoped>
.homeBox {
    width: 100%;
    height: 100%;
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
                    color: var(--text-color);
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
                    font-size: 22px;
                    color: gray;
                    user-select: none;
                    cursor: pointer;
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
                cursor: pointer;

                .userName {
                    margin-right: 6px;
                }

                .userAvatar {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                }

                .setIcon {
                    font-size: 22px;
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
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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

                .appIcon {
                    transform: scale(1.02);
                }
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

.userContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .line {
        // width: 100%;
        margin-bottom: 6px;
    }

    .tokenTips {
        color: gray;
    }

    .userAvatarBox {
        .userAvatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}
</style>
