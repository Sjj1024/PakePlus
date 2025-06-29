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
    <div class="updateTime">最后更新时间：2025-06-29 19:12:00</div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
const friends = [
    {
        name: '汤姆',
        time: '2025-06-18',
        amount: '99',
        way: '微信',
        remark: '小小意思，不成敬意',
    },
    {
        name: '🌱',
        time: '2025-06-16',
        amount: '10',
        way: '微信',
        remark: '赞助一下',
    },
    {
        name: '？',
        time: '2025-06-03',
        amount: '50',
        way: '微信',
        remark: '感谢老哥哈！',
    },
    {
        name: ': )',
        time: '2025-06-01',
        amount: '5',
        way: '微信',
        remark: '感谢帮助',
    },
    {
        name: 'Celia',
        time: '2025-05-30',
        amount: '200',
        way: '微信',
        remark: '正好找到你这个',
    },
    {
        name: '黄俊博@软件工程',
        time: '2025-05-30',
        amount: '66.66',
        way: '微信',
        remark: '感谢大佬(追加的赞助)',
    },
    {
        name: '黄俊博@软件工程',
        time: '2025-05-30',
        amount: '10',
        way: '支付宝',
        remark: '感谢大佬',
    },
    {
        name: '金楚轩',
        time: '2025-05-30',
        amount: '20',
        way: '微信',
        remark: '谢谢老师',
    },
    {
        name: '易经养生杜異田',
        time: '2025-05-29',
        amount: '10',
        way: '微信',
        remark: '感谢帮助',
    },
    {
        name: '要求匿名～',
        time: '2025-05-29',
        amount: '100',
        way: '微信',
        remark: '使用pakaplus很好用。能遇到个好工具不易',
    },
    {
        name: '阿崔cxr',
        time: '2025-05-26',
        amount: '200',
        way: '微信',
        remark: '😁pakeplus太好用啦😁过来赞助一波',
    },
    {
        name: 'ZHAO',
        time: '2025-05-18',
        amount: '20',
        way: '微信',
        remark: '请你喝杯咖啡',
    },
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
