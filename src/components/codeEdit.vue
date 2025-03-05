<template>
    <div>
        <Codemirror
            v-model="uiCode"
            :options="cmOptions"
            :extensions="localTheme === 'dark' ? extensions : []"
            :style="{ height: '100%' }"
            @change="codeChange"
        ></Codemirror>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss"></style>
