<template>
    <div
        class="historyBox"
        v-loading="getLoading"
        element-loading-text="请求中..."
    >
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <div class="backBox" @click="backHome">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>返回</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span>
                        {{ releaseData.tag_name }}
                        v{{ store.currentProject.version }}
                    </span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ releaseData.body || t('releaseBody') }}
                        <!-- 开源免费创建，编辑，调试打包跨平台APP，仅仅只需要一个Token -->
                    </span>
                </div>
            </div>
            <!-- 设置按钮 -->
            <div class="setting">
                <el-icon :size="26" @click="deleteRelease"><Delete /></el-icon>
            </div>
        </div>
        <!-- only get latest version by tag name -->
        <el-table :data="releaseAssets" style="width: 100%">
            <!-- <el-table-column prop="name" label="资源名称" width="380" /> -->
            <el-table-column label="资源名称" width="460">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span @click="copyDownlink(scope.row)" class="fileLink">
                            {{ scope.row.name }}
                        </span>
                        <span class="copyLink" @click="openDownlink(scope.row)">
                            下载
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="资源大小" width="120">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>
                            {{ (scope.row.size / 1024 / 1024).toFixed(2) }}
                            MB
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="发布日期" />
        </el-table>
        <!-- share and push bug -->
        <div class="shareBox">
            <!-- <el-button type="primary">
                <span>发布页面</span>
            </el-button>
            <el-button type="primary">
                <span>报告问题</span>
            </el-button> -->
            <div class="tips">
                资源说明：dmg结尾的是macOS版本，deb结尾的是Linux版本，exe和msi结尾的是Windows版本，点击资源名称可以复制下载链接，点击下载会使用浏览器下载软件包。
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePakeStore } from '@/store'
import githubApi from '@/apis/github'
import { ElMessage, ElMessageBox } from 'element-plus'
import { open } from '@tauri-apps/api/shell'
import { writeText } from '@tauri-apps/api/clipboard'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const store = usePakeStore()
const { t } = useI18n()

// back
const backHome = () => {
    router.go(-1)
}

const releaseData = ref({
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
})

// get latest release assets by tag name
const releaseAssets = computed(() => {
    return releaseData.value.assets.filter((item: any) => {
        return (
            item.name.includes(store.currentProject.version) ||
            item.name.includes('tar.gz')
        )
    })
})

// getLoading
const getLoading = ref(false)

// get latest release assets by tag name
const getLatestRelease = async () => {
    const releaseRes: any = await githubApi.getReleasesAssets(
        store.userInfo.login,
        'PakePlus',
        store.currentProject.name
    )
    console.log('releaseRes', releaseRes)
    if (releaseRes.status === 200 && releaseRes.data.length > 3) {
        // filter current project version
        releaseData.value = releaseRes.data
        getLoading.value = false
    } else {
        console.log('releaseRes error', releaseRes)
        // sometime get one assets
        setTimeout(() => getLatestRelease(), 1000)
    }
}

// delete lasted release
const deleteRelAssets = async () => {
    if (releaseData.value.id !== 0) {
        const releaseRes: any = await githubApi.deleteRelease(
            store.userInfo.login,
            'PakePlus',
            releaseData.value.id
        )
        console.log('deleteRelease', releaseRes)
        ElMessage.success('删除成功')
        store.setRelease({ id: 0 })
        router.go(-1)
    }
}

// delete release
const deleteRelease = async () => {
    ElMessageBox.confirm('确定要删除这个版本吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        console.log('delete project')
        deleteRelAssets()
    })
}

// open downlink by chrome
const openDownlink = async (asset: any) => {
    await open(asset.browser_download_url)
}

// copy downlink
const copyDownlink = async (asset: any) => {
    await writeText(asset.browser_download_url)
    ElMessage.success('复制成功')
}

// 打包后的历史记录
onMounted(() => {
    // must do, edit page submit will creat new release
    if (store.release.id === 0) {
        getLoading.value = true
        getLatestRelease()
    } else {
        releaseData.value = store.release
    }
})
</script>

<style lang="scss" scoped>
.historyBox {
    padding: 10px 20px;

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .headerTitle {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .backBox {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                // color: var(--el-text-color-regular);
                cursor: pointer;
            }
        }

        .toolTips {
            color: gray;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 2px;

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
            cursor: pointer;
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

    .shareBox {
        margin-top: 10px;

        .tips {
            color: gray;
            font-size: 14px;
        }
    }
}

.fileLink {
    color: #0969da;
    cursor: pointer;
    // font-weight: bold;

    &:hover {
        text-decoration: underline;
        text-decoration-color: #0969da;
        text-underline-offset: 1px;
    }
}

.copyLink {
    margin-left: 10px;
    cursor: pointer;
    color: #0969da;
    &:hover {
        color: #1163c1;
        font-weight: bold;
    }
}
</style>
