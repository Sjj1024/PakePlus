<template>
    <div class="qunBox">
        <img class="wxCode" src="../static/imgs/wxcode.png" alt="微信二维码" />
        <img class="wxCode" src="../static/imgs/mywx.png" alt="我的微信" />
    </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
</script>

<style scoped>
.qunBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .wxCode {
        width: 40%;
    }
}
</style>
