<template>
    <el-dialog v-model="visible" title="预览" width="500" center>
        <div>
            <img :src="base64Data" alt="icon" class="preImg" />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    base64Data: {
        type: String,
        default: '',
    },
})

const visible = defineModel<boolean>('visible', { required: true })
</script>

<style scoped lang="scss">
.preImg {
    width: 100%;
    height: 100%;
}
</style>
