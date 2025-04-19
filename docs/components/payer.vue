<template>
    <table class="payerTable">
        <thead>
            <tr>
                <th style="width: 18%">赞助时间</th>
                <th style="width: 20%">赞助者</th>
                <th style="width: 14%">赞助金额</th>
                <th style="width: 15%">赞助方式</th>
                <th style="width: 40%">留言内容</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="friend in friends" :key="friend.name">
                <td>{{ friend.time }}</td>
                <td>{{ friend.name }}</td>
                <td>{{ friend.amount }}</td>
                <td>{{ friend.way }}</td>
                <td>{{ friend.remark }}</td>
            </tr>
        </tbody>
    </table>
    <div class="updateTime">最后更新时间：2025-04-19 12:00:00</div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
const friends = [
    {
        name: 'Dang',
        time: '2025-04-11',
        amount: '$30',
        way: 'Bitcoin',
        remark: '有web3钱包吗，给你赞助点',
    },
    {
        name: '*黏',
        time: '2025-04-05',
        amount: '￥88.88',
        way: '微信',
        remark: '感谢开源',
    },
    {
        name: '影阙คิดถึง',
        time: '2025-03-30',
        amount: '￥99',
        way: '微信',
        remark: '已赞赏，很实用',
    },
    {
        name: '匿名~',
        time: '2025-02-22',
        amount: '￥66',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2025-02-22',
        amount: '￥66.66',
        way: '微信',
        remark: '感谢，基于你的项目，省事许多',
    },
    {
        name: '栗怀广',
        time: '2025-02-20',
        amount: '￥100',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-12-09',
        amount: '￥10.00',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-12-02',
        amount: '￥40.00',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-11-29',
        amount: '￥99.00',
        way: '微信',
        remark: '为爱发电，开源不易',
    },
]
</script>

<style scoped>
.payerTable {
    width: 100%;
    border-collapse: collapse;
    /* border: 1px solid #000; */
}
</style>
