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
    </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { usePPStore } from '@/store'

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

const codeChange = (code: string) => {
    console.log('codeChange!', code)
    store.currentProject.customJs = code
}
</script>

<style scoped lang="scss">
.codebox {
    height: v-bind(height);
}
</style>
