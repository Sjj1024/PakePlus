<template>
    <div class="avatar-container">
        <el-dialog
            :title="title"
            :model-value="visible"
            width="400px"
            append-to-body
            @opened="openDialog"
            :before-close="beforeClose"
        >
            <div class="imgBox">
                <vue-cropper
                    ref="cropper"
                    :img="imgUrl"
                    :info="true"
                    :autoCrop="true"
                    :autoCropWidth="400"
                    :autoCropHeight="400"
                    :fixedBox="false"
                    outputType="png"
                    :fixedNumber="[1, 1]"
                    :fixed="true"
                    :centerBox="true"
                    v-if="showCropper"
                />
            </div>
            <div class="footerBtn">
                <el-button :icon="Plus" @click="changeScale(1)"></el-button>
                <el-button :icon="Minus" @click="changeScale(-1)"></el-button>
                <el-button
                    :icon="RefreshLeft"
                    @click="rotateLeft()"
                ></el-button>
                <el-button
                    :icon="RefreshRight"
                    @click="rotateRight()"
                ></el-button>
                <el-button @click="determine"> 确定 </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Plus, Minus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { getCurrentInstance, ref } from 'vue'

const { proxy }: any = getCurrentInstance()

const props = defineProps({
    imgUrl: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '编辑图片',
    },
    confirm: {
        type: Function,
        default: () => {},
    },
})

const visible = defineModel({ type: Boolean, default: false })

const showCropper = ref(false)

const openDialog = () => {
    showCropper.value = true
}

const changeScale = (num: any) => {
    num = num || 1
    proxy.$refs.cropper.changeScale(num)
}
const rotateLeft = () => {
    proxy.$refs.cropper.rotateLeft()
}
const rotateRight = () => {
    proxy.$refs.cropper.rotateRight()
}

const beforeClose = () => {
    visible.value = false
}

const determine = () => {
    visible.value = false
    proxy.$refs.cropper.getCropData((data: any) => {
        // do something
        console.log('data', data)
        props.confirm(data)
    })
}
</script>

<style lang="scss" scoped>
.avatar-container {
    .img-box {
        border-radius: 50%;
        border: 1px solid #ccc;
        width: 10vw;
        height: 10vw;
    }
}

.imgBox {
    height: 300px;
}

.footerBtn {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.preview-box {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;
}
</style>
