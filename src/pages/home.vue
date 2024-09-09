<template>
    <div class="homeBox">
        <div class="homeHeader">
            <div class="headerTitle">APP管理</div>
            <div class="headerTool">
                <div class="toolTips">创建，编辑，调试APP</div>
                <div class="control">管理</div>
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
            <div class="newProject" @click="pushEdit">
                <el-icon><Plus /></el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'

const router = useRouter()

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

onMounted(() => {
    appWindow.setTitle('TurnApp')
})
</script>

<style lang="scss" scoped>
.homeBox {
    .homeHeader {
        .headerTitle {
            font-size: large;
            font-weight: bold;
        }

        .headerTool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .toolTips {
                color: gray;
            }

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
            width: 100%;
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
            width: 100%;
            height: 200px;
            border-radius: 5px;
            border: 1px solid gray;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
