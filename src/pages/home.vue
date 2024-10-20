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
            <!-- 设置按钮 -->
            <div class="toolBox">
                <!-- TODO theme change -->
                <!-- <div class="theme">
                    <el-dropdown>
                        <span class="dropdownLink">
                            <span class="iconfont themeIcon">&#xe635;</span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>{{
                                    t('darkMode')
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                    t('lightMode')
                                }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div> -->
                <div class="language">
                    <el-dropdown>
                        <span class="dropdownLink">
                            <span class="iconfont langIcon">
                                {{ locale === 'en' ? '&#xe6a3;' : '&#xe6a2;' }}
                            </span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="changeLang('en')"
                                    >English</el-dropdown-item
                                >
                                <el-dropdown-item @click="changeLang('zh')"
                                    >简体中文</el-dropdown-item
                                >
                                <el-dropdown-item>繁体中文</el-dropdown-item>
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
            <!-- 已有项目列表 -->
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
                    <el-icon class="diaTipsIcon"><Warning /></el-icon>
                </div>
            </template>
            <div class="diaContent">
                <el-input
                    v-model="token"
                    autocomplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="请输入Token"
                    class="tokenInput"
                />
                <el-button @click="testToken(true)">{{
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
        <!-- config new branch name -->
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
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'
import githubApi from '@/apis/github'
import { ElMessage } from 'element-plus'
import { usePakeStore } from '@/store'
import { pakeUrlMap, openUrl } from '@/utils/common'
import pakePlusIcon from '@/assets/images/pakeplus.png'
import { useI18n } from 'vue-i18n'
import { getVersion } from '@tauri-apps/api/app'

const router = useRouter()
const store = usePakeStore()
const { t, locale } = useI18n()

const token = ref(localStorage.getItem('token') || '')
const version = ref('')
const tokenDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')

// go project detail
const goProject = (pro: Project) => {
    store.setCurrentProject(pro)
    router.push('/edit')
}

// go about
const goAbout = () => {
    router.push('/about')
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
        ElMessage.error('请先配置Token')
        return
    }
}

// 语言切换
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

// 测试token是否可用
const testToken = async (tips: boolean = true) => {
    const res: any = await githubApi.gitUserInfo(token.value)
    console.log('testToken', res)
    if (res.status === 200) {
        tips && ElMessage.success('Token可用')
        if (!tips) {
            tokenDialog.value = false
        }
        // 本地存储并且fork仓库
        localStorage.setItem('token', token.value)
        store.setUser(res.data)
        forkProgect()
    } else {
        ElMessage.error('Token不可用')
    }
}

// fork仓库以及准备工作
const forkProgect = async () => {
    // fork仓库
    const forkRes = await githubApi.forkProgect({
        name: 'PakePlus',
        default_branch_only: true,
    })
    console.log('forkRes', forkRes)
    if (forkRes.status === 202) {
        store.setRepository(forkRes.data)
    }
    // start仓库
    const startRes = await githubApi.startProgect()
    console.log('startRes', startRes)
    if (startRes.status === 204) {
        console.log('start仓库成功')
    }
    // enable github action
    deleteBuildYml()
}

// 获取最后一次提交的commit sha
const getCommitSha = async () => {
    const res: any = await githubApi.getCommitSha(
        store.userInfo.login,
        'PakePlus'
    )
    console.log('getCommitSha', res.data[0])
    if (res.status === 200) {
        store.setCommitSha(res.data[0])
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
            const branchInfo = {
                ...res.data,
                name: branchName.value,
                desc: 'this is a pakeplus project',
                url: '',
                showName: 'pakeplus',
                appid: 'com.pakeplus.desktop',
                icon: '',
                version: '0.0.1',
                platform: 'desktop',
            }
            console.log('branch Info success', branchInfo)
            store.setCurrentProject(branchInfo)
            creatLoading.value = false
            router.push('/edit')
            // update new branch build.yml文件内容
            // updateBuildYml(branchName.value)
        } else if (res.status === 422) {
            console.log('项目已经存在')
            creatLoading.value = false
            ElMessage.success('项目已经存在')
            // router.push('/publish')
        } else {
            // creatLoading.value = false
            console.log('branchInfo error', res)
            ElMessage.success(`项目创建失败: ${res.data.message}`)
        }
    } else {
        ElMessage.error('请输入纯英文项目名称')
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

const getPakePlusInfo = async () => {
    const pakeVersion = await getVersion()
    console.log('pakeVersion', pakeVersion)
    version.value = pakeVersion
}

// reset release info
const resetReleaseInfo = () => {
    store.setRelease({
        id: 0,
    })
}

onMounted(() => {
    appWindow.setTitle('PakePlus')
    getPakePlusInfo()
    resetReleaseInfo()
})
</script>

<style lang="scss" scoped>
.homeBox {
    padding: 10px 20px;

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
                        color: black;
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
                        color: black;
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
            border: 1px solid #ccc;
            margin-bottom: 10px;
            background-color: #f7f7f7;
            overflow: hidden;

            &:hover {
                box-shadow: #ccc 0px 0px 10px;
            }

            .appIcon {
                width: 100%;
                height: 66%;
                object-fit: cover;
                border-radius: 5px 5px 0 0;
                background-color: white;
            }

            .appPreview {
                width: 100%;
                height: 66%;
            }

            .infoBox {
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
                border: 1px solid #ccc;
                .addIcon {
                    color: rgb(90, 90, 90);
                }
            }

            .addIcon {
                color: gray;
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
            color: black;
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
