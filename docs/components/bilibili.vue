<template>
    <div class="video">
        <iframe
            width="560"
            height="315"
            src="//player.bilibili.com/player.html?isOutside=true&aid=114585499602898&bvid=BV1WCjzz5Eao&cid=30198203272&p=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped>
.video {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 800px;
    max-height: 450px;
    margin: 0 auto;
}
.video iframe,
.video object,
.video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
