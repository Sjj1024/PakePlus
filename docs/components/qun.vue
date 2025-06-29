<template>
    <div class="qunBox">
        <img class="wxCode" src="../static/imgs/wxcode.png" alt="wx" />
        <img class="wxCode" src="../static/imgs/mywx.png" alt="mywx" />
        <img class="wxCode" src="../static/imgs/qqpp3.jpg" alt="qqpp3" />
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
        width: 30%;
    }
}
</style>
