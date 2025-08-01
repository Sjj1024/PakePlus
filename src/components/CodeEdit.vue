<template>
    <el-scrollbar class="codebox">
        <Codemirror
            v-model="code"
            :options="cmOptions"
            :extensions="localTheme === 'dark' ? extensions : []"
            :style="{ height: '100%' }"
            :disabled="disabled"
            @change="codeChange"
        >
        </Codemirror>
        <el-icon class="copyBtn" @click="copyCode"><CopyDocument /></el-icon>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { usePPStore } from '@/store'
import { CopyDocument } from '@element-plus/icons-vue'
import { copyText, oneMessage } from '@/utils/common'

const props = defineProps({
    lang: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: '',
    },
    codeType: {
        type: String,
        default: 'demo',
    },
})

const store = usePPStore()
const code = defineModel<string>('code')
const localTheme = localStorage.getItem('theme') || 'dark'

// extensions
const extensions: any = [props.lang === 'json' ? json() : javascript(), oneDark]

const cmOptions = ref({
    tabSize: 4,
    mode: props.lang === 'json' ? 'text/json' : 'text/javascript',
    lineNumbers: true,
    line: true,
})

const copyCode = async () => {
    try {
        await copyText(code.value || '')
        oneMessage.success('代码已复制！')
    } catch (err) {
        oneMessage.error('复制失败')
    }
}

const codeChange = (code: string) => {
    console.log('codeChange!', code)
    store.currentProject.customJs = code
}
</script>

<style scoped lang="scss">
.codebox {
    height: v-bind(height);
    position: relative;
}

.copyBtn {
    position: absolute;
    right: 6px;
    top: 6px;
    cursor: pointer;
    color: var(--box-shadow);
    transition: all 0.3s ease;

    &:hover {
        color: var(--text-color);
        transform: scale(1.1);
    }
}
</style>
