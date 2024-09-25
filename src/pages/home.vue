<template>
    <div class="homeBox">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <span>项目管理</span>
                    <img
                        :src="githubImg"
                        alt="github"
                        class="githubIcon"
                        @click="openUrl(pakeUrlMap.github)"
                    />
                    <!-- <img :src="zhifubaoImg" alt="github" class="githubIcon" /> -->
                    <!-- <img :src="weixinImg" alt="github" class="wxIcon" /> -->
                </div>
                <div class="toolTips">
                    <span>
                        开源免费创建，编辑，调试打包跨平台APP，仅仅只需要一个Token
                    </span>
                    <el-icon class="tipsIcon"><InfoFilled /></el-icon>
                </div>
            </div>
            <!-- 设置按钮 -->
            <div class="setting" @click="tokenDialog = true">
                <span class="userName">{{ store.userInfo.login }}</span>
                <el-icon :size="26"><Setting /></el-icon>
            </div>
        </div>
        <div class="projectBox">
            <!-- 已有项目列表 -->
            <div
                class="project"
                v-for="pro in store.projectList"
                :key="pro.id"
                @click="goProject"
            >
                <img
                    src="https://hadoappusage.oss-cn-shanghai.aliyuncs.com/static/pad_image/blueBg.png"
                    class="appIcon"
                    alt="appIcon"
                />
                <!-- <iframe
                    class="appPreview"
                    src="https://www.kuaishou.com"
                    frameborder="0"
                ></iframe> -->
                <div class="infoBox">
                    <div class="appBox">
                        <div class="appName">{{ pro.name }}</div>
                        <div class="appVersion">{{ pro.version }}</div>
                    </div>
                    <div class="appDesc">{{ pro.desc }}</div>
                </div>
            </div>
            <!-- new project -->
            <div class="project newProject" @click="showBranchDialog">
                <el-icon :size="26"><Plus /></el-icon>
            </div>
        </div>
        <!-- version -->
        <div class="version" @click="goAbout">v1.0.1</div>
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
                    placeholder="请输入Token"
                    class="tokenInput"
                />
                <el-button @click="testToken(true)">测试</el-button>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="tokenDialog = false">取消</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="testToken(false)">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- config new branch name -->
        <el-dialog v-model="branchDialog" width="400" center>
            <template #header>
                <div class="diaHeader">
                    <span>项目名称</span>
                </div>
            </template>
            <div class="diaContent">
                <el-input
                    v-model="branchName"
                    placeholder="请输入英文项目名称，例如：PakePlus"
                    class="tokenInput"
                />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="branchDialog = false">取消</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                        type="primary"
                        @click="creatBranch"
                        :loading="creatLoading"
                    >
                        确定
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
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/shell'
import githubImg from '@/assets/images/github.png'
import weixinImg from '@/assets/images/weixin.png'
import { pakeUrlMap } from '@/utils/common'

const router = useRouter()
const store = usePakeStore()

const token = ref(localStorage.getItem('token') || '')
const tokenDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')

// go project detail
const goProject = () => {
    router.push('/edit')
}

// open url by chrome
const openUrl = async (url: string) => {
    await open(url)
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
                name: branchName.value,
                ...res.data,
            }
            console.log('branch Info success', branchInfo)
            store.setCurrentProject(branchInfo)
            creatLoading.value = false
            router.push('/edit')
            // update new branch build.yml文件内容
            updateBuildYml(branchName.value)
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

// delete build yml file
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
            // new branch build.yml
            updateBuildYml(branchName)
        } else {
            console.log('deleteRes error', deleteRes)
        }
    }
}

// 更新build.yml文件内容
const updateBuildYml = async (branchName: string) => {
    // get build.yml file sha
    const shaRes = await getFileSha('.github/workflows/build.yml', branchName)
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get build.yml file content
        const content = await invoke('update_build_file')
        console.log('content', content)
        // update build.yml file content
        const updateRes: any = await githubApi.updateBuildYmlFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update build.yml from pakeplus',
                content: content,
                sha: shaRes.data.sha,
                branch: branchName,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.log('updateRes error', updateRes)
        }
    } else {
        console.log('getFileSha error', shaRes)
    }
}

onMounted(() => {
    appWindow.setTitle('PakePlus')
})
</script>

<style lang="scss" scoped>
.homeBox {
    padding: 20px;

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

            .githubIcon {
                width: 20px;
                height: 20px;
                margin-left: 10px;
            }

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

            .tipsIcon {
                margin-left: 6px;
                cursor: pointer;
            }
        }

        .setting {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-right: 10px;

            .userName {
                margin-right: 6px;
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
            border: 1px solid gray;
            margin-bottom: 10px;

            .appIcon {
                width: 100%;
                height: 66%;
            }

            .appPreview {
                width: 100%;
                height: 66%;
            }

            .infoBox {
                padding: 5px;
                .appBox {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .appDesc {
                    font-size: small;
                    color: gray;
                }
            }
        }
        .newProject {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .version {
        position: fixed;
        bottom: 20px;
        right: 20px;
        color: gray;
        cursor: pointer;
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
