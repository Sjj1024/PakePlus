<template>
    <div class="homeBox">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <span>APP管理</span>
                </div>
                <div class="toolTips">
                    <span>
                        开源免费创建，编辑，调试打包跨平台APP，仅仅只需要一个Token
                    </span>
                    <el-icon class="tipsIcon"><InfoFilled /></el-icon>
                </div>
            </div>
            <!-- 设置按钮 -->
            <div class="setting" @click="dialogVisible = true">
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
            <!-- 新建按钮 -->
            <div class="project newProject" @click="pushEdit">
                <el-icon :size="26"><Plus /></el-icon>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="500">
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
                <el-button @click="testToken">测试</el-button>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveToken">
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
import { ElMessageBox } from 'element-plus'
import githubApi from '@/apis/github'
import { ElMessage } from 'element-plus'

const router = useRouter()

const token = ref(localStorage.getItem('token') || '')

const dialogVisible = ref(false)

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

// 跳转到新建页面
const pushEdit = () => {
    router.push('/edit')
}

// 存储token
const saveToken = () => {
    dialogVisible.value = false
    localStorage.setItem('token', token.value)
}

// 测试token是否可用
const testToken = async () => {
    const res: any = await githubApi.gitRatelimit()
    // const res: any = getApiLimit()
    console.log('testToken', res)
    if (res.status === 200) {
        ElMessage.success('Token可用')
    } else {
        ElMessage.error('Token不可用.')
    }
}

onMounted(() => {
    appWindow.setTitle('PakePlus')
})
</script>

<style lang="scss" scoped>
.homeBox {
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
            margin-right: 10px;
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
    justify-content: flex-start;
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
