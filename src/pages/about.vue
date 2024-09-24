<template>
    <div @click="goBack">关于TurnApp</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped></style>
