<template>
    <div
        class="historyBox"
        v-loading.fullscreen.lock="getLoading"
        :class="{ isWeb: !isTauri }"
        :element-loading-text="t('requesting')"
    >
        <div class="homeHeader">
            <div class="headerBox">
                <div class="headerTitle">
                    <div class="backBox" @click="router.push('/edit')">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>{{ t('back') }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span>
                        {{ store.currentRelease?.tag_name }}
                        v{{ store.currentProject?.version }}
                    </span>
                </div>
                <div class="toolTips">
                    <div class="tipsBody">
                        <!-- {{ t('releaseNotes') }} -->
                        {{ store.currentRelease?.body || t('releaseBody') }}
                    </div>
                </div>
            </div>
            <div class="setting">
                <el-icon :size="22" @click="delDialog = true">
                    <Delete />
                </el-icon>
            </div>
        </div>
        <!-- only get latest version by tag name -->
        <el-table :data="store.currentRelease?.assets" style="width: 100%">
            <el-table-column :label="t('assetName')">
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
                        <el-progress
                            v-if="
                                downProcess[`${scope.row.id}`] &&
                                downProcess[`${scope.row.id}`] < 100
                            "
                            :percentage="downProcess[`${scope.row.id}`]"
                        />
                        <el-icon
                            class="folderOpen"
                            @click="openUrl(selectedDir)"
                            v-else-if="
                                downProcess[`${scope.row.id}`] &&
                                downProcess[`${scope.row.id}`] === 100
                            "
                        >
                            <Folder />
                        </el-icon>
                        <span
                            v-else
                            class="copyLink"
                            @click="
                                isTauri
                                    ? downAssets(scope.row)
                                    : openUrl(scope.row.browser_download_url)
                            "
                        >
                            {{ t('download') }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <!-- download progress -->
            <!-- <el-table-column label="下载进度" width="120">
                <template #default="scope">
                    <el-progress :percentage="downProcess[`${scope.row.id}`]" />
                </template>
            </el-table-column> -->
            <!-- url code -->
            <el-table-column :label="t('urlCode')" width="140" align="center">
                <template #default="scope">
                    <el-popover
                        popper-class="popoverBox"
                        :width="100"
                        placement="top"
                    >
                        <template #reference>
                            <span class="iconfont downCode"> &#xe76e; </span>
                        </template>
                        <img
                            :src="scope.row.qrcode"
                            alt="download qr"
                            class="downloadQrcode"
                            style="width: 120px; height: 120px"
                        />
                    </el-popover>
                </template>
            </el-table-column>
            <!-- asset type -->
            <el-table-column :label="t('assetType')" width="120">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>
                            {{ typeFunc(scope.row.name) }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <!-- asset size -->
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
            <!-- publish time -->
            <el-table-column
                prop="updated_at"
                width="160"
                :label="t('releaseDate')"
            />
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
        <!-- delete release -->
        <el-dialog v-model="delDialog" width="400" center>
            <template #header>
                <div class="diaHeader">
                    {{ store.currentRelease.tag_name }}
                    v{{ store.currentProject.version }}
                </div>
            </template>
            <div class="diaContent">
                {{ t('deleteRelease') }}
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="delDialog = false">{{
                        t('cancel')
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="deleteRelAssets()"
                        :loading="delLoading"
                    >
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePPStore } from '@/store'
import { ArrowLeft, Delete, Folder } from '@element-plus/icons-vue'
import githubApi from '@/apis/github'
import {
    openUrl,
    isTauri,
    copyText,
    oneMessage,
    openSelect,
} from '@/utils/common'
import { useI18n } from 'vue-i18n'
import { basename, join } from '@tauri-apps/api/path'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'

const router = useRouter()
const store = usePPStore()
const { t } = useI18n()

// getLoading
const getLoading = ref(false)
const delDialog = ref(false)
const delLoading = ref(false)

// asset type
const typeFunc = (name: string) => {
    if (name.includes('.dmg')) {
        return name.includes('aarch64') ? 'macOS arm' : 'macOS x64'
    } else if (
        name.includes('.deb') ||
        name.includes('.AppImage') ||
        name.includes('.rpm')
    ) {
        return name.includes('amd64') ? 'Linux amd64' : 'Linux x64'
    } else if (name.includes('.exe') || name.includes('.msi')) {
        return name.includes('arm64') ? 'Windows arm' : 'Windows x64'
    } else if (name.includes('.apk')) {
        return 'Android 7.0+'
    } else if (name.includes('.ipa')) {
        return 'iOS 15.6+'
    } else if (name.includes('.pwa')) {
        return 'PWA'
    } else if (name.includes('.gz')) {
        return t('zipFile')
    } else {
        return t('unknown')
    }
}

// delete lasted release
const deleteRelAssets = async () => {
    delLoading.value = true
    if (store.currentRelease.id !== 0) {
        const releaseRes: any = await githubApi.deleteRelease(
            store.userInfo.login,
            'PakePlus',
            store.currentRelease.id
        )
        console.log('deleteRelease', releaseRes)
        delLoading.value = false
        delDialog.value = false
        oneMessage.success(t('delSuccess'))
        router.push('/edit?delrelease=true')
    }
    delLoading.value = false
    delDialog.value = false
}

// copy downlink
const copyDownlink = async (asset: any) => {
    await copyText(asset.browser_download_url)
    oneMessage.success(t('copySuccess'))
}

// 多文件下载进度
const downProcess = reactive<{ [key: string]: number }>({})
listen('download_progress', (event: any) => {
    downProcess[event.payload.fileId] = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
    console.log('downProcess---------', downProcess)
})

// download file
let selectedDir: any = ref(localStorage.getItem('selectedDir') || '')
const downAssets = async (asset: any) => {
    selectedDir.value = await openSelect(true, [])
    if (!selectedDir.value) {
        return
    } else {
        localStorage.setItem('selectedDir', selectedDir.value)
    }
    const fileId = `${asset.id}`
    const url = asset.browser_download_url
    const fileName = await basename(url)
    const savePath = await join(selectedDir.value, fileName)
    console.log('fileName, savePath', fileName, savePath)
    downProcess[fileId] = 0.01
    invoke('download_file', {
        url,
        savePath,
        fileId,
    })
}

onMounted(async () => {
    // must do, edit page submit will creat new release
    if (store.currentRelease.id === 0) {
        getLoading.value = true
        await store.setCurrentRelease()
        getLoading.value = false
    }
})
</script>

<style lang="scss" scoped>
.diaContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.historyBox {
    padding: 10px 20px;

    .homeHeader {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        position: relative;

        .headerBox {
            flex: 1;
        }

        .headerTitle {
            width: 95%;
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

.folderOpen {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        color: #1163c1;
        font-weight: bold;
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

.downCode {
    cursor: pointer;
}
</style>
