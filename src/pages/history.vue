<template>
    <div
        class="historyBox"
        v-loading="getLoading"
        :element-loading-text="t('requesting')"
    >
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <div class="backBox" @click="backHome">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>{{ t('back') }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span>
                        {{ releaseData.tag_name }}
                        v{{ store.currentProject.version }}
                    </span>
                </div>
                <div class="toolTips">
                    <div class="tipsBody">
                        {{ releaseData.body || t('releaseBody') }}
                    </div>
                </div>
            </div>
            <div class="setting">
                <el-icon :size="26" @click="deleteRelease"><Delete /></el-icon>
            </div>
        </div>
        <!-- only get latest version by tag name -->
        <el-table :data="releaseData.assets" style="width: 100%">
            <el-table-column :label="t('assetName')" width="460">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span @click="copyDownlink(scope.row)" class="fileLink">
                            {{
                                scope.row.name.startsWith('_')
                                    ? store.currentProject.showName +
                                      scope.row.name
                                    : scope.row.name
                            }}
                        </span>
                        <span
                            class="copyLink"
                            @click="openUrl(scope.row.browser_download_url)"
                        >
                            {{ t('download') }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="t('assetSize')" width="120">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>
                            {{ (scope.row.size / 1024 / 1024).toFixed(2) }}
                            MB
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" :label="t('releaseDate')" />
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
                {{ t('assetDesc') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePakeStore } from '@/store'
import githubApi from '@/apis/github'
import { convertToLocalTime, openUrl } from '@/utils/common'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    assets: [],
    body: '',
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
    if (releaseRes.status === 200 && releaseRes.data.assets.length >= 3) {
        // filter current project version
        const assets = releaseRes.data.assets.filter((item: any) => {
            return (
                item.name.includes(store.currentProject.version) ||
                item.name.includes('tar')
            )
        })
        releaseData.value = {
            ...releaseRes.data,
            assets: assets.map((asset: any) => {
                return {
                    ...asset,
                    updated_at: convertToLocalTime(asset.updated_at),
                }
            }),
        }
        console.log('releaseData-----', releaseData.value)
        getLoading.value = false
    } else {
        getLoading.value = false
        console.error('releaseRes error', releaseRes)
        // sometime get one assets, will deep call
        // setTimeout(getLatestRelease, 1000)
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
        ElMessage.success(t('delSuccess'))
        store.setRelease('pakeplus', { id: 0 })
        router.go(-1)
    }
}

// delete release
const deleteRelease = async () => {
    ElMessageBox.confirm(t('confirmDelProject'), t('tips'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
    })
        .then(() => {
            console.log('delete deleteRelease')
            deleteRelAssets()
        })
        .catch(() => {
            console.log('catch deleteRelease')
        })
}

// copy downlink
const copyDownlink = async (asset: any) => {
    await writeText(asset.browser_download_url)
    ElMessage.success(t('copySuccess'))
}

onMounted(() => {
    // must do, edit page submit will creat new release
    if (store.releases.pakeplus.id === 0) {
        getLoading.value = true
        getLatestRelease()
    } else {
        releaseData.value = store.releases.pakeplus
    }
})
</script>

<style lang="scss" scoped>
.historyBox {
    // width: 100%;
    padding: 10px 20px;

    .homeHeader {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .headerTitle {
            width: 100%;
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
            width: 95%;
            color: gray;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 2px;

            .tipsBody {
                width: 100%;
                word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .tipsIcon {
                margin-left: 6px;
                cursor: pointer;
            }
        }

        .setting {
            position: fixed;
            top: 20px;
            right: 20px;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: pointer;
            color: gray;

            &:hover {
                color: var(--text-color);
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
