<template>
    <div></div>
    <!-- new version dialog -->
    <el-dialog
        v-model="versionDialog"
        width="400"
        center
        :show-close="false"
        :close-on-click-modal="false"
    >
        <template #header>
            <div class="diaHeader">
                <span>{{ t('updateTips') }}</span>
            </div>
        </template>
        <div class="diaContent" v-html="notes"></div>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-if="!rawJson.force" @click="versionDialog = false">
                    {{ t('cancel') }}
                </el-button>
                <el-button type="primary" @click="confirmUpdate">
                    {{ t('confirm') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { isTauri, loadingText, oneMessage, isNew } from '@/utils/common'
import { ref, onMounted } from 'vue'
import { usePPStore } from '@/store'
import packageJson from '@root/package.json'
import ppupdate from '@root/scripts/ppupdate.json'
import { check } from '@tauri-apps/plugin-updater'
import { useI18n } from 'vue-i18n'
import { ElLoading } from 'element-plus'
import { listen } from '@tauri-apps/api/event'
import { relaunch } from '@tauri-apps/plugin-process'

const { t } = useI18n()
const store = usePPStore()

const versionDialog = ref(false)
const rawJson = ref<any>(ppupdate)
const notes = ref<any>('')
let update: any = null

const checkUpdate = async (tips: boolean = false) => {
    let loading = null
    if (tips) {
        loading = ElLoading.service({
            lock: true,
            text: t('checkUpdate'),
            background: 'rgba(0, 0, 0, 0.7)',
        })
    }
    update = await check()
    console.log('update', update)
    if (update && isNew(update.version, packageJson.version)) {
        store.isUpdate = true
        rawJson.value = update.rawJson as any
        notes.value =
            rawJson.value[localStorage.getItem('lang') || 'zh'] ||
            'There is a new version available(有新版本更新)'
        versionDialog.value = true
    } else {
        tips && oneMessage.success(t('versionTips'))
    }
    loading && loading.close()
}

const confirmUpdate = async () => {
    // await update.value.downloadAndInstall()
    versionDialog.value = false
    let downloaded = 0
    let contentLength = 0
    const loading = ElLoading.service({
        lock: true,
        text: t('startUpdate'),
        background: 'rgba(0, 0, 0, 0.7)',
    })
    try {
        await update.downloadAndInstall((event: any) => {
            loadingText(
                `${t('updateProgress')}
                ${((downloaded / contentLength) * 100).toFixed(2)}%`
            )
            switch (event.event) {
                case 'Started':
                    contentLength = event.data.contentLength
                    break
                case 'Progress':
                    downloaded += event.data.chunkLength
                    break
                case 'Finished':
                    console.log('download finished')
                    break
            }
        })
        await relaunch()
    } catch (error: any) {
        console.log('error', error)
        oneMessage.error(error || t('updateError'))
        loading.close()
    }
}

onMounted(async () => {
    // TODO check action is over
    // check version
    isTauri && checkUpdate()
    await listen('update-event', (event: any) => {
        if (event.payload.type === 'update-now') {
            confirmUpdate()
        } else if (event.payload.type === 'update-check') {
            checkUpdate(true)
        }
    })
})
</script>

<style scoped></style>
