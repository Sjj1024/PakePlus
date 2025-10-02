<template>
    <table class="payerTable">
        <thead>
            <tr>
                <th style="width: 18%">{{ langMap[lang].payerTime }}</th>
                <th style="width: 20%">{{ langMap[lang].payer }}</th>
                <th style="width: 14%">{{ langMap[lang].amount }}</th>
                <th style="width: 15%">{{ langMap[lang].way }}</th>
                <th style="width: 40%">{{ langMap[lang].remark }}</th>
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
    <div class="updateTime">{{ langMap[lang].time }}2025-10-02 19:12:00</div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const vpData = useData()
const lang = vpData.lang.value

const langMap: any = {
    zh: {
        time: '最后更新时间：',
        payerTime: '赞助时间',
        payer: '赞助者',
        amount: '赞助金额',
        way: '赞助方式',
        remark: '留言内容',
    },
    en: {
        time: 'Last updated time: ',
        payerTime: 'Payer Time',
        payer: 'Payer',
        amount: 'Amount',
        way: 'Way',
        remark: 'Remark',
    },
}

const friends = [
    {
        name: '夏日清风',
        time: '2025-09-28',
        amount: '88',
        way: '微信',
        remark: '感谢开发这么好用的工具',
    },
    {
        name: '星辰',
        time: '2025-09-25',
        amount: '50',
        way: '支付宝',
        remark: '支持开源项目',
    },
    {
        name: '匿名~',
        time: '2025-09-20',
        amount: '66.66',
        way: '微信',
        remark: '请喝咖啡',
    },
    {
        name: '夏能啟',
        time: '2025-09-17',
        amount: '9.9',
        way: '微信',
        remark: '学到了很多，感谢',
    },
    {
        name: '技术小白',
        time: '2025-09-15',
        amount: '20',
        way: '微信',
        remark: '学到了很多，感谢',
    },
    {
        name: 'CodeLover',
        time: '2025-09-10',
        amount: '100',
        way: '支付宝',
        remark: '代码写得真棒',
    },
    {
        name: '年华',
        time: '2025-09-06',
        amount: '50',
        way: '微信',
        remark: '加油',
    },
    {
        name: '秋风',
        time: '2025-09-05',
        amount: '30',
        way: '微信',
        remark: '小小支持',
    },
    {
        name: '匿名~',
        time: '2025-08-28',
        amount: '199',
        way: '微信',
        remark: '为爱发电，加油',
    },
    {
        name: '开发者-Bryan',
        time: '2025-08-25',
        amount: '88.88',
        way: '支付宝',
        remark: '同行支持',
    },
    {
        name: '连山',
        time: '2025-08-21',
        amount: '68',
        way: '微信',
        remark: '请喝下午茶',
    },
    {
        name: '学生党',
        time: '2025-08-20',
        amount: '10',
        way: '微信',
        remark: '虽然不多，一点心意',
    },
    {
        name: 'Dadong',
        time: '2025-08-15',
        amount: '68',
        way: '微信',
        remark: '工具很实用',
    },
    {
        name: '2025 [置顶朋友圈]',
        time: '2025-08-14',
        amount: '14.88',
        way: '微信',
        remark: '请喝下午茶',
    },
    {
        name: 'S****',
        time: '2025-08-10',
        amount: '58',
        way: '支付宝',
        remark: 'UI做得不错',
    },
    {
        name: '匿名~',
        time: '2025-08-05',
        amount: '33.33',
        way: '微信',
        remark: '随机支持一下',
    },
    {
        name: 'Huang',
        time: '2025-07-30',
        amount: '45',
        way: '微信',
        remark: '稳定性很好',
    },
    {
        name: '晌午',
        time: '2025-07-27',
        amount: '8.88',
        way: '微信',
        remark: '感谢大佬',
    },
    {
        name: '开源爱好者-Alan',
        time: '2025-07-25',
        amount: '77.77',
        way: '支付宝',
        remark: '支持开源精神',
    },
    {
        name: '吃的多',
        time: '2025-07-20',
        amount: '55.55',
        way: '微信',
        remark: '前端代码很优雅',
    },
    {
        name: '后端开发',
        time: '2025-07-15',
        amount: '66',
        way: '支付宝',
        remark: '架构设计得很好',
    },
    {
        name: '王磊',
        time: '2025-07-10',
        amount: '99.99',
        way: '微信',
        remark: '全栈项目典范',
    },
    {
        name: '吴彦*',
        time: '2025-07-08',
        amount: '28.88',
        way: '微信',
        remark: '部署很方便',
    },
    {
        name: '老张',
        time: '2025-07-05',
        amount: '120',
        way: '支付宝',
        remark: '数据处理功能强大',
    },
    {
        name: 'AI研究L',
        time: '2025-07-03',
        amount: '88',
        way: '微信',
        remark: '智能功能很实用',
    },
    {
        name: '匿名~',
        time: '2025-07-01',
        amount: '25',
        way: '微信',
        remark: '七月第一天来支持',
    },
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
        remark: '😁PackPlus太好用啦😁过来赞助一波',
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
        amount: '88.88',
        way: '微信',
        remark: '感谢开源',
    },
    {
        name: '影阙คิดถึง',
        time: '2025-03-30',
        amount: '99',
        way: '微信',
        remark: '已赞赏，很实用',
    },
    {
        name: '匿名~',
        time: '2025-02-22',
        amount: '66',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2025-02-22',
        amount: '66.66',
        way: '微信',
        remark: '感谢，基于你的项目，省事许多',
    },
    {
        name: '栗怀广',
        time: '2025-02-20',
        amount: '100',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-12-09',
        amount: '10.00',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-12-02',
        amount: '40.00',
        way: '微信',
        remark: '请大佬喝奶茶吧',
    },
    {
        name: '匿名~',
        time: '2024-11-29',
        amount: '99.00',
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
