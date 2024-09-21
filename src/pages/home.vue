<template>
    <div class="homeBox">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <span>项目管理</span>
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
            <div class="project" v-for="i in 8" :key="i">
                <img
                    src="https://hadoappusage.oss-cn-shanghai.aliyuncs.com/static/pad_image/blueBg.png"
                    class="appIcon"
                    alt="appIcon"
                />
                <div class="infoBox">
                    <div class="appBox">
                        <div class="appName">测试阮家</div>
                        <div class="appVersion">1.01</div>
                    </div>
                    <div class="appDesc">我的第一个让UN就爱你</div>
                </div>
            </div>
            <!-- new project -->
            <div class="project newProject" @click="showBranchDialog">
                <el-icon :size="26"><Plus /></el-icon>
            </div>
        </div>
        <!-- config github token -->
        <el-dialog v-model="tokenDialog" width="500" center>
            <template #header>
                <div class="diaHeader">
                    <span>配置Token</span>
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
                    <el-button type="primary" @click="creatBranch">
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

const router = useRouter()
const store = usePakeStore()

const token = ref(localStorage.getItem('token') || '')
const tokenDialog = ref(false)
const branchDialog = ref(false)
const branchName = ref('')

const appList = ref([
    {
        appName: '测试阮家',
        appIcon:
            'https://hadoappusage.oss-cn-shanghai.aliyuncs.com/static/pad_image/blueBg.png',
        appVersion: '1.0',
        appResp: 'https://github.com/',
        appUrl: 'https://www.csdn.net/',
        appId: 'sdfafsasofja',
        appDesc: '我的第一个让UN就爱你',
    },
])

// new barnch config
const showBranchDialog = () => {
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

// 跳转到新建页面
const pushEdit = () => {
    // 先获取一次sha，为后续工作做准备
    getCommitSha()
    // need creat new branch, first input project name
    router.push('/edit')
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

// creat project branch
const creatBranch = async () => {
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
            console.log('branchInfo success', branchInfo)
            store.setCurrentProject(branchInfo)
            // update new branch build.yml文件内容
            updateBuildYml()
            //  并更新tauri.config.json里面的内容
            router.push('/publish')
        } else if (res.status === 422) {
            console.log('项目已经存在')
            // ElMessage.success('项目已经存在')
            // router.push('/publish')
        } else {
            console.log('branchInfo error', res)
            ElMessage.success(`项目创建失败: ${res.data.message}`)
        }
    } else {
        ElMessage.error('请输入纯英文项目名称')
    }
}

// 更新build.yml文件内容
const updateBuildYml = async () => {
    // get build.yml file sha
    const shaRes = await getFileSha(
        '.github/workflows/build.yml',
        branchName.value
    )
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200) {
        // get build.yml file content
        const content = await invoke('update_build_file', {
            branch: branchName.value,
        })
        console.log('content', content)
        // update build.yml file content
        const updateRes: any = await githubApi.updateBuildYmlFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update from pakeplus',
                content: content,
                sha: shaRes.data.sha,
                branch: branchName.value,
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
    // background-color: red;

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .headerTitle {
            font-size: large;
            font-weight: bold;
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
        margin-top: 10px;

        .project {
            height: 200px;
            border-radius: 5px;
            border: 1px solid gray;
            margin-bottom: 10px;

            .appIcon {
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
