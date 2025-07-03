<template>
    <div class="homeBox" :class="{ isWeb: !isTauri }">
        <div class="homeHeader">
            <div>
                <div class="headerTitle" @click="delPakePlus">
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
                                <el-dropdown-item @click="changeLang('ko')">
                                    한국어
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
                        @click="tokenDialog = true"
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
                        <!-- <div class="appVersion">{{ pro.version }}</div> -->
                    </div>
                    <span class="appDesc">
                        {{ pro?.desktop?.desc || 'this is a pakeplus project' }}
                    </span>
                </div>
            </div>
            <!-- new project -->
            <div class="project" @click="showBranchDialog">
                <el-icon class="addIcon" :size="26"><Plus /></el-icon>
                <img
                    :src="pakePlusIcon"
                    class="appIcon"
                    alt="appIcon"
                    style="opacity: 0"
                />
                <div class="infoBox">
                    <div class="appBox">
                        <div class="appName">&nbsp;</div>
                        <div class="appVersion">&nbsp;</div>
                    </div>
                    <span class="appDesc">&nbsp;</span>
                </div>
            </div>
        </div>
        <!-- version -->
        <!-- <el-popover width="50" content="Top" placement="top">
            <template #reference>
                <div class="version" @click="goAbout">v{{ version }}</div>
            </template>
        </el-popover> -->
        <!-- <el-button @click="goAbout" link class="version">
            v{{ version }}
        </el-button> -->
        <!-- <el-button @click="goAbout" text link class="version">
            v{{ version }}
        </el-button> -->
        <el-dropdown placement="top" size="small">
            <div
                class="version"
                :class="{ isUpdate: store.isUpdate }"
                @click="goAbout('about')"
            >
                v{{ packageJson.version }}
            </div>
            <template #dropdown>
                <el-dropdown-menu class="updateMenu">
                    <el-dropdown-item
                        class="updateBtn"
                        v-if="
                            isTauri && store.isUpdate && store.ppnotes.overall
                        "
                        @click="sendUpdateEvent('update-now')"
                    >
                        {{ t('updateNow') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                        v-else-if="isTauri && store.ppnotes.overall"
                        @click="sendUpdateEvent('update-check')"
                    >
                        {{ t('checkUpdate') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="goAbout('superpower')">
                        {{ t('superpower') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="goAbout('about')">
                        {{ t('aboutUs') }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- config github token and user info -->
        <el-dialog
            v-model="tokenDialog"
            width="500"
            center
            :show-close="false"
            :close-on-click-modal="false"
        >
            <template #header>
                <div class="diaHeader">
                    <span>
                        {{
                            store.userInfo.login && !testLoading
                                ? ''
                                : 'Github Token'
                        }}
                    </span>
                </div>
            </template>
            <!-- user info -->
            <div
                v-if="store.userInfo.login && !testLoading"
                class="userContent"
            >
                <div class="userAvatarBox">
                    <img
                        class="userAvatar"
                        :src="store.userInfo.avatar_url"
                        alt="avatar"
                        @click="openUrl(store.userInfo.html_url)"
                    />
                </div>
                <div class="line">
                    {{ t('userName') }}: {{ store.userInfo.login }}
                </div>
                <div class="line tokenLine" @click="copyToken">
                    token: {{ store.token }}
                </div>
                <div class="tokenTips">
                    {{ t('tokenTips') }}
                </div>
            </div>
            <!-- token input -->
            <div v-else class="diaContent">
                <el-input
                    v-model.trim="store.token"
                    autocomplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="github token"
                    class="tokenInput"
                    type="password"
                    show-password
                    :disabled="testLoading"
                    @keyup.enter="testToken(true)"
                />
                <el-button
                    v-if="store.userInfo.login === ''"
                    @click="testToken(true)"
                    :loading="testLoading"
                    :type="store.userInfo.login !== '' ? 'success' : ''"
                    class="testTokenBtn"
                >
                    {{ t('testToken') }}
                </el-button>
                <el-button
                    v-else
                    @click="testToken(false)"
                    :loading="testLoading"
                    type="success"
                    class="testTokenBtn"
                >
                    <el-icon><Check /></el-icon>
                </el-button>
            </div>
            <template #footer>
                <div
                    v-if="store.userInfo.login && !testLoading"
                    class="dialog-footer"
                >
                    <!-- user logout -->
                    <el-button @click="logout">{{ t('quit') }}</el-button>
                    <!-- sync all branch -->
                    <el-button
                        type="success"
                        plain
                        @click="forkStartShas(false)"
                    >
                        {{ t('sync') }}
                    </el-button>
                    <!-- user confirm -->
                    <el-button
                        type="primary"
                        plain
                        @click="tokenDialog = false"
                    >
                        {{ t('confirm') }}
                    </el-button>
                </div>
                <div v-else class="dialog-footer">
                    <!-- token cancel -->
                    <el-button @click="cancelToken" :disabled="testLoading">
                        {{ t('cancel') }}
                    </el-button>
                    <!-- token confirm -->
                    <el-button
                        type="primary"
                        @click="testToken(false)"
                        :disabled="testLoading"
                    >
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- config new project name -->
        <el-dialog
            v-model="branchDialog"
            width="400"
            center
            :show-close="false"
            :close-on-click-modal="false"
        >
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
                    @input="proExist = false"
                    @keyup.enter="creatProject()"
                />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="branchDialog = false">
                        {{ t('cancel') }}
                    </el-button>
                    <el-popconfirm
                        v-if="proExist"
                        hide-icon
                        :title="t('confirmDelete')"
                        cancel-button-type="info"
                        placement="top"
                        @confirm="delProject"
                    >
                        <template #reference>
                            <el-button type="danger">
                                {{ t('delete') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-button
                        type="warning"
                        disabled
                        v-if="proExist"
                        @click="branchDialog = false"
                    >
                        {{ t('sync') }}
                    </el-button>
                    <el-button
                        type="primary"
                        @click="creatProject"
                        :loading="creatLoading"
                    >
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import githubApi from '@/apis/github'
import { usePPStore } from '@/store'
import { Plus, Check } from '@element-plus/icons-vue'
import {
    urlMap,
    openUrl,
    chageTheme,
    isTauri,
    platforms,
    createBranch,
    webBranch,
    mainBranch,
    getCustomJsFetch,
    supportPP,
    getBuildYmlFetch,
    oneMessage,
    upstreamUser,
    isDev,
    syncAllBranch,
} from '@/utils/common'
import ppconfig from '@root/scripts/ppconfig.json'
import pakePlusIcon from '@/assets/images/pakeplus.png'
import { useI18n } from 'vue-i18n'
import { getCurrentWindow } from '@tauri-apps/api/window'
import packageJson from '../../package.json'
import { emit } from '@tauri-apps/api/event'

const router = useRouter()
const store = usePPStore()
const { t, locale } = useI18n()
const tokenDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')
const testLoading = ref(false)
// button loading
const creatLoading = ref(false)
// proExist
const proExist = ref(false)

// copy token
const copyToken = () => {
    navigator.clipboard.writeText(store.token)
    oneMessage.success(t('copySuccess'))
}

// logout
const logout = async () => {
    localStorage.clear()
    store.$reset()
}

// del pakeplus!
const delPakePlus = async () => {
    if (isDev) {
        await githubApi.deleteProgect(store.userInfo.login, 'PakePlus')
        await githubApi.deleteProgect(store.userInfo.login, 'PakePlus-iOS')
        await githubApi.deleteProgect(store.userInfo.login, 'PakePlus-Android')
        localStorage.removeItem('projectList')
        localStorage.removeItem('releases')
        store.$reset()
        console.log('reset success')
    } else {
        console.log('isDev false')
    }
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
                        'PakePlus',
                        store.shaInfo.desktopWeb
                    )
                    createBranch(
                        store.userInfo.login,
                        pro.name,
                        'PakePlus-iOS',
                        store.shaInfo.iosWeb
                    )
                    createBranch(
                        store.userInfo.login,
                        pro.name,
                        'PakePlus-Android',
                        store.shaInfo.androidWeb
                    )
                }
            })
            .catch((err: any) => {
                console.error('getBranch error', err)
            })
    }
}

// go about
const goAbout = (route: string = 'about') => {
    if (route !== 'about') {
        router.push('/tauriapi')
    } else if (isTauri) {
        router.push('/tauriapi?about=true')
    } else {
        router.push('/about')
    }
}

// new barnch config
const showBranchDialog = () => {
    if (store.projectList.length !== 0 && !isDev) {
        oneMessage.error(t('limitProject'))
        return
    }
    // if token exist, then creat branch, else next page
    // token.value && getCommitSha()
    // checkout has github token
    if (store.token === '') {
        // oneMessage.error(t('configToken'))
        console.log(t('configToken'))
    } else {
        getMainSha('PakePlus')
        getWebSha('PakePlus')
        getMainSha('PakePlus-iOS')
        getWebSha('PakePlus-iOS')
        getMainSha('PakePlus-Android')
        getWebSha('PakePlus-Android')
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
            const userInfo: any = await githubApi.gitUserInfo(store.token)
            console.log('testToken userInfo', userInfo)
            if (userInfo.status === 200) {
                // check user was tags
                const tagsRes: any = await githubApi.gitUserTags(
                    userInfo.data.url
                )
                console.log('testToken tagsRes', tagsRes)
                if (tagsRes.status === 404) {
                    localStorage.clear()
                    store.setUser({ login: '' })
                    oneMessage.error(t('userPrivate'))
                    testLoading.value = false
                    return
                }
                localStorage.setItem('token', store.token)
                store.setUser(userInfo.data)
                try {
                    if (userInfo.data.login !== upstreamUser) {
                        await forkStartShas(tips)
                    } else {
                        await commitShas(tips)
                    }
                } catch (error) {
                    oneMessage.error(t('tokenError'))
                    localStorage.clear()
                    store.setUser({ login: '' })
                }
            } else {
                localStorage.clear()
                store.setUser({ login: '' })
                oneMessage.error(t('tokenError'))
                testLoading.value = false
            }
        } catch (error) {
            localStorage.clear()
            store.setUser({ login: '' })
            console.error('testToken error', error)
            oneMessage.error(t('networkError'))
            testLoading.value = false
        }
    } else {
        console.log('test token tips false')
        tokenDialog.value = false
    }
}

const commitShas = async (tips: boolean = true) => {
    // wait fork done, enable github action
    let getCount = 0
    while (true && getCount < 6) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('wait fork done......', testLoading.value)
        const res = await Promise.all([
            getMainSha('PakePlus'),
            getWebSha('PakePlus'),
            getMainSha('PakePlus-iOS'),
            getWebSha('PakePlus-iOS'),
            getMainSha('PakePlus-Android'),
            getWebSha('PakePlus-Android'),
        ])
            .then(async (res) => {
                console.log('wait fork done res', res)
                getCount++
                if (res[0] && res[1] && res[2] && res[3]) {
                    // delete build.yml
                    let deleteRes = true
                    if (store.noSjj1024) {
                        const pp = await deleteBuildYml(mainBranch, 'PakePlus')
                        const ppa = await deleteBuildYml(
                            mainBranch,
                            'PakePlus-Android'
                        )
                        const ppi = await deleteBuildYml(
                            mainBranch,
                            'PakePlus-iOS'
                        )
                        deleteRes = pp && ppa && ppi
                    }
                    if (deleteRes) {
                        testLoading.value = false
                        if (!tips) {
                            tokenDialog.value = false
                        } else {
                            oneMessage.success(t('tokenOk'))
                        }
                    } else {
                        localStorage.clear()
                        store.setUser({ login: '' })
                        testLoading.value = false
                        return false
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
        } else if (store.userInfo.login === '') {
            console.log('token promise break')
            break
        }
    }
    if (getCount >= 6) {
        localStorage.clear()
        store.setUser({ login: '' })
        oneMessage.error(t('initError'))
    }
    testLoading.value = false
    return false
}

// fork and start
const forkStartShas = async (tips: boolean = true) => {
    testLoading.value = true
    // fork action is async
    const forkRes: any = await Promise.all([
        forkPakePlus('PakePlus'),
        forkPakePlus('PakePlus-iOS'),
        forkPakePlus('PakePlus-Android'),
    ])
    if (forkRes.every((item: any) => item)) {
        console.log('forkRes', forkRes)
    } else {
        console.error('fork error', forkRes)
    }
    await supportPP()
    // sync all branch
    await syncAllBranch(store.token, store.userInfo.login, true)
    // get commit sha
    await commitShas(tips)
}

// fork pakeplus-android and pakeplus-ios
const forkPakePlus = async (repo: string = 'PakePlus') => {
    const forkRes: any = await githubApi.forkProgect(repo, {
        name: repo,
        default_branch_only: false,
    })
    if (forkRes.status === 202) {
        console.log('forkPakePlus', forkRes)
        return true
    } else if (forkRes.status === 403 || forkRes.status === 404) {
        // maybe account has locked
        store.setUser({ login: '' })
        testLoading.value = false
        oneMessage.error(forkRes.data.message || t('tokenError'))
        return false
    } else {
        store.setUser({ login: '' })
        testLoading.value = false
        oneMessage.error(forkRes.data.message || t('tokenError'))
        return false
    }
}

// get commit sha
const getMainSha = async (repo: string = 'PakePlus') => {
    // get commit sha by branch name
    const res: any = await githubApi.getCommitShaRef(
        store.userInfo.login,
        repo,
        mainBranch
    )
    if (res.status === 200 && res.data) {
        if (repo === 'PakePlus') {
            store.shaInfo.desktopMain = res.data.sha
        } else if (repo === 'PakePlus-iOS') {
            store.shaInfo.iosMain = res.data.sha
        } else if (repo === 'PakePlus-Android') {
            store.shaInfo.androidMain = res.data.sha
        }
        localStorage.setItem('shaInfo', JSON.stringify(store.shaInfo))
        return true
    } else {
        return false
    }
}

// get commit sha
const getWebSha = async (repo: string = 'PakePlus') => {
    // get commit sha by branch name
    const res: any = await githubApi.getCommitShaRef(
        store.userInfo.login,
        repo,
        webBranch
    )
    if (res.status === 200 && res.data) {
        if (repo === 'PakePlus') {
            store.shaInfo.desktopWeb = res.data.sha
        } else if (repo === 'PakePlus-iOS') {
            store.shaInfo.iosWeb = res.data.sha
        } else if (repo === 'PakePlus-Android') {
            store.shaInfo.androidWeb = res.data.sha
        }
        return true
    } else {
        return false
    }
}

// delete project confirm
const delProject = () => {
    if (
        branchName.value === 'main' ||
        branchName.value === 'dev' ||
        branchName.value === 'web' ||
        branchName.value === 'web2' ||
        branchName.value === webBranch
    ) {
        oneMessage.error(t('cantDelete'))
        return
    } else {
        store.delProject(branchName.value)
        branchName.value = ''
        oneMessage.success(t('deleteSuccess'))
    }
    proExist.value = false
}

// creat project branch,
const creatProject = async () => {
    creatLoading.value = true
    proExist.value = false
    if (branchName.value === 'ppdebug') {
        var _ = new window.VConsole()
        branchName.value = ''
        creatLoading.value = false
        branchDialog.value = false
        return
    } else if (branchName.value === 'ppdev') {
        router.push('/tauriapi')
        branchName.value = ''
        creatLoading.value = false
        branchDialog.value = false
        return
    } else if (
        branchName.value === 'main' ||
        branchName.value === 'web2' ||
        branchName.value === webBranch
    ) {
        oneMessage.error(t('banned'))
        branchName.value = ''
        creatLoading.value = false
        return
    }
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
            if (
                (res.status === 404 && !include) ||
                (res.status === 200 &&
                    res.data.ref != `refs/heads/${branchName.value}`)
            ) {
                const branchInfo: Project = {
                    ...res.data,
                    ...ppconfig,
                    name: branchName.value,
                    showName: branchName.value,
                    appid: `com.${branchName.value}.app`,
                    customJs: customJs,
                    more: {
                        ...ppconfig.more,
                        windows: {
                            ...ppconfig.more.windows,
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
                const createRes: any = Promise.all([
                    createBranch(
                        store.userInfo.login,
                        branchName.value,
                        'PakePlus',
                        store.shaInfo.desktopWeb
                    ),
                    createBranch(
                        store.userInfo.login,
                        branchName.value,
                        'PakePlus-Android',
                        store.shaInfo.androidWeb
                    ),
                    createBranch(
                        store.userInfo.login,
                        branchName.value,
                        'PakePlus-iOS',
                        store.shaInfo.iosWeb
                    ),
                ]).then((res) => {
                    console.log('createBranch res', res)
                    return res.every((item) => item)
                })
                if (createRes) {
                    router.push('/edit')
                } else {
                    oneMessage.error(t('createBranchError'))
                    creatLoading.value = false
                }
            } else if (
                res.status === 200 &&
                res.data.ref === `refs/heads/${branchName.value}`
            ) {
                creatLoading.value = false
                proExist.value = true
                oneMessage.success(t('projectExist'))
                // router.push('/publish')
            } else if (res.status === 401) {
                oneMessage.error(t('tokenError'))
                creatLoading.value = false
            } else {
                creatLoading.value = false
                console.error('branchInfo error', res)
                oneMessage.error(
                    `${t('creatProjectError')}: ${
                        res?.data?.message || 'unknown error'
                    }`
                )
            }
        } else {
            store.setCurrentProject({
                ...ppconfig,
                name: branchName.value,
                showName: branchName.value,
                appid: `com.${branchName.value}.app`,
                customJs: customJs,
            })
            router.push('/edit')
        }
    } else {
        oneMessage.error(t('englishName'))
        creatLoading.value = false
    }
}

// creat build yml
const uploadBuildYml = async (
    _: string = mainBranch,
    repo: string = 'PakePlus'
) => {
    // get build.yml file content
    const content = await getBuildYmlFetch({
        repo: repo,
        name: 'PakePlus',
        body: 'This is a workflow to help you automate the publishing of your PakePlus project to GitHub Packages.',
    })
    // create build.yml file content
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const createRes: any = await githubApi.createBuildYml(
        store.userInfo.login,
        repo,
        {
            message: 'create build.yml from pakeplus',
            content: content,
        }
    )
    if (createRes.status === 200 || createRes.status === 201) {
        console.log('uploadBuildYml Res', createRes)
    } else {
        console.log('uploadBuildYml error, but not important', createRes)
    }
}

// delete build yml file, must do, because main branch need action promise
const deleteBuildYml = async (
    branchName: string = mainBranch,
    repo: string = 'PakePlus'
) => {
    const shaRes: any = await githubApi.getFileSha(
        store.userInfo.login,
        repo,
        '.github/workflows/build.yml',
        { ref: branchName }
    )
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200) {
        const deleteRes: any = await githubApi.deleteBuildYml(
            store.userInfo.login,
            repo,
            {
                message: 'delete build.yml from pakeplus',
                sha: shaRes.data.sha,
                branch: branchName,
            }
        )
        if (deleteRes.status === 200) {
            console.log('deleteBuildYml', deleteRes)
            await uploadBuildYml(branchName, repo)
            return true
        } else {
            console.error('deleteBuildYml error', deleteRes)
            oneMessage.error(deleteRes.message || t('noWorkflowPermission'))
            return false
        }
    } else if (shaRes.status === 404) {
        // no workflow file
        await uploadBuildYml(branchName, repo)
        return true
    } else {
        // no workflow permission
        return false
    }
}

// check update
const sendUpdateEvent = async (type: string) => {
    await emit('update-event', { type: type })
}

onMounted(() => {
    if (isTauri) {
        const window = getCurrentWindow()
        window.setTitle('PakePlus')
    } else {
        oneMessage.error(t('webNotStable'))
    }
})
</script>

<style>
.el-popconfirm__action {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.el-popconfirm__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

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
                    width: 23px;
                    height: 23px;
                    border-radius: 50%;
                    transition: transform 0.2s ease;
                    box-shadow: 0 0 0 1px var(--avatar-shadow);

                    &:hover {
                        transform: scale(1.08);
                        cursor: pointer;
                    }
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
            height: 100%;
            border-radius: 10px;
            padding: 0px 10px 0 10px;
            background-color: var(--project-bg);
            overflow: hidden;
            transition: box-shadow 0.2s, transform 0.2s;
            border: 1px solid var(--project-border);
            position: relative;

            &:hover {
                cursor: pointer;
                box-shadow: var(--box-shadow) 0px 0px 10px;
                transform: scale(1.01);

                .appIcon {
                    transform: scale(1.02);
                }

                .addIcon {
                    color: var(--box-shadow);
                    font-size: 36px !important;
                    font-weight: bold;
                }
            }

            .appIcon {
                z-index: 1;
                width: 100%;
                margin-top: 10px;
                object-fit: cover;
                border-radius: 20px;
                background-color: var(--project-bg);
                transition: transform 0.2s ease;
            }

            .addIcon {
                color: var(--box-shadow);
                transition: all 0.2s ease;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
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

                .appBox {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .appName {
                        width: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 18px;
                        font-weight: bold;
                    }

                    // .appVersion {
                    //     font-weight: bold;
                    // }
                }

                .appDesc {
                    display: -webkit-box;
                    font-size: 12px;
                    color: gray;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    // margin-top: 6px;
                }
            }
        }

        .newProject {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            transition: all 0.2s ease;

            &:hover {
                color: black;
                cursor: pointer;

                .addIcon {
                    color: var(--box-shadow);
                    font-size: 36px !important;
                    font-weight: bold;
                }
            }

            .addIcon {
                color: var(--box-shadow);
                transition: all 0.2s ease;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .version {
        position: fixed;
        bottom: 16px;
        right: 20px;
        color: gray;
        cursor: pointer;
        font-size: 17px;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard syntax */

        &:hover {
            color: var(--text-color);
        }
    }

    .isUpdate {
        color: #e83737;

        &:hover {
            color: #e83737;
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

.testTokenBtn {
    width: 58px;
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

    .tokenLine {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        text-align: center;
    }

    .tokenTips {
        color: gray;
    }

    .userAvatarBox {
        .userAvatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.05);
                cursor: pointer;
            }
        }
    }
}
</style>
