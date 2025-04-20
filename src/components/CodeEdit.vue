<template>
    <div class="codebox">
        <Codemirror
            v-model="store.currentProject.customJs"
            :options="cmOptions"
            :extensions="localTheme === 'dark' ? extensions : []"
            :style="{ height: '100%' }"
            @change="codeChange"
        >
        </Codemirror>
    </div>
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
})

const store = usePPStore()

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
}
</script>

<style scoped lang="scss">
.codebox {
    height: 400px;
}
</style>
