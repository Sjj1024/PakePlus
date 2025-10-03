<template>
    <div v-if="notesData.show" class="modalBox">
        <div class="modalContent">
            <h1 class="modalTitle">{{ title }}</h1>
            <p class="modalNotes">{{ content }}</p>
            <div class="modalButtons">
                <button id="modalOk" @click="closeNotes">{{ okText }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const title = ref('')
const content = ref('')
const okText = ref('')
const notesData = ref({
    version: '0.5.30',
    show: false,
    pub_date: '2025-06-02T09:00:33.251Z',
    zh: 'PakePlus正在优化升级，暂时无法使用云端打包，请使用本地打包的方式，好了会在微信群发通知，感谢理解！',
    en: 'PakePlus is optimizing and upgrading, please use local packaging instead，thank you for your understanding!',
    ja: 'PakePlus は Github Token 方式のパッケージングをサポートしなくなりました。ローカルパッケージングを使用してください，感謝します！',
    ko: 'PakePlus 는 Github Token 방식의 패키징을 지원하지 않습니다. 로컬 패키징을 사용하세요，感謝します！',
    zhTw: 'PakePlus 正在优化升级，暂时无法使用云端打包，请使用本地打包的方式，感谢理解！',
    openUrl: '',
    overall: false,
})

const initNotes = async () => {
    const ppnotesJson = await fetch('/ppnotes.json')
    const ppnotesJsonData = await ppnotesJson.json()
    notesData.value = ppnotesJsonData
    console.log('ppnotesJsonData', ppnotesJsonData)
    const isChinese = window.location.href.includes('zh')
    const contentValue = isChinese ? ppnotesJsonData.zh : ppnotesJsonData.en
    const titleValue = isChinese ? 'PackPlus公告' : 'PakePlus Notice'
    const okTextValue = isChinese ? '确定' : 'OK'
    if (ppnotesJsonData.show) {
        title.value = titleValue
        content.value = contentValue
        okText.value = okTextValue
    }
}

const closeNotes = () => {
    if (notesData.value.openUrl) {
        window.open(notesData.value.openUrl, '_blank')
    }
    notesData.value.show = false
}

const initLang = () => {
    const isFirst = sessionStorage.getItem('first_visit')
    const browserLang = navigator.language
    console.log('browserLang-initLang', browserLang)
    if (isFirst) {
        console.log('cookieLang is not empty')
    } else {
        if (browserLang === 'zh-CN') {
            window.location.href = '/zh'
        } else {
            window.location.href = '/'
        }
        sessionStorage.setItem('first_visit', 'true')
    }
}

onMounted(() => {
    initLang()
    initNotes()
})
</script>

<style scoped lang="scss">
.modalBox {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 150px;
}

.modalContent {
    background: white;
    padding: 20px;
    border-radius: 5px;
    color: #000;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media only screen and (max-width: 600px) {
    .modalContent {
        width: 80%;
    }
}

.modalTitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.modalButtons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.modalButtons button {
    padding: 8px 20px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #409eff;
    color: #fff;
    border: none;
    margin-top: 20px;
}

.modalButtons button:hover {
    background-color: #3688fa;
}

.modalButtons button:active {
    background-color: #3688fa;
}
</style>
