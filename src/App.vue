<script setup lang="ts">
const userLanguage = navigator.language
console.log('System language:', userLanguage)
</script>

<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
