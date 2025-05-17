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
import { isTauri, loadingText, oneMessage } from '@/utils/common'
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

const checkUpdate = async () => {
    update = await check()
    console.log('update', update)
    if (update && update.version !== packageJson.version) {
        store.isUpdate = true
        versionDialog.value = true
        rawJson.value = update.rawJson as any
        notes.value = rawJson.value[localStorage.getItem('locale') || 'zh']
        console.log('notes', notes)
    } else {
        oneMessage.success(t('versionTips'))
    }
}

const confirmUpdate = async () => {
    // await update.value.downloadAndInstall()
    versionDialog.value = false
    let downloaded = 0
    let contentLength = 0
    const loading = ElLoading.service({
        lock: true,
        text: '开始更新...',
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

        // contentLength = 100
        // while (true) {
        //     downloaded += 1
        //     console.log('downloaded', downloaded)
        //     loadingText(
        //         `${t('updateProgress')}
        //         ${((downloaded / contentLength) * 100).toFixed(2)}%`
        //     )
        //     await new Promise((resolve) => setTimeout(resolve, 1000))
        // }
    } catch (error: any) {
        console.log('error', error)
        oneMessage.error(error || '更新失败')
        loading.close()
    }
}

onMounted(async () => {
    console.log('updater mounted')
    store.ppversion = packageJson.version
    isTauri && checkUpdate()
    await listen('update-event', (event: any) => {
        console.log('收到事件:', event.payload)
        if (event.payload.type === 'update-now') {
            confirmUpdate()
        } else if (event.payload.type === 'update-check') {
            checkUpdate()
        }
    })
})

// // check update
// async checkUpdate() {
//     this.ppversion = await getVersion()
//     const update = await check()
//     if (update) {
//         this.latest = update.rawJson as any
//         console.log('update', this.latest)
//     }
// },
</script>

<style scoped></style>
