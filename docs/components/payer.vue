<template>
    <table class="payerTable">
        <thead>
            <tr>
                <th style="width: 18%">Date</th>
                <th style="width: 20%">Sponsor</th>
                <th style="width: 14%">Amount</th>
                <th style="width: 15%">Method</th>
                <th style="width: 40%">Message</th>
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
    <div class="updateTime">Last updated: April 19, 2025 12:00:00</div>
</template>

<script setup lang="ts">
const friends = [
    {
        name: 'Dang',
        time: '2025-04-11',
        amount: '$30',
        way: 'Bitcoin',
        remark: 'Do you have a Web3 wallet? Sending some support',
    },
    {
        name: '*Nian',
        time: '2025-04-05',
        amount: '¥88.88',
        way: 'WeChat',
        remark: 'Thanks for open-sourcing',
    },
    {
        name: 'Shadow Tower',
        time: '2025-03-30',
        amount: '¥99',
        way: 'WeChat',
        remark: 'Supported - very useful tool',
    },
    {
        name: 'Anonymous~',
        time: '2025-02-22',
        amount: '¥66',
        way: 'WeChat',
        remark: 'Buying you bubble tea',
    },
    {
        name: 'Anonymous~',
        time: '2025-02-22',
        amount: '¥66.66',
        way: 'WeChat',
        remark: 'Thanks - your project saved me lots of work',
    },
    {
        name: 'Li Huaiguang',
        time: '2025-02-20',
        amount: '¥100',
        way: 'WeChat',
        remark: 'Bubble tea on me',
    },
    {
        name: 'Anonymous~',
        time: '2024-12-09',
        amount: '¥10.00',
        way: 'WeChat',
        remark: 'Small token of appreciation',
    },
    {
        name: 'Anonymous~',
        time: '2024-12-02',
        amount: '¥40.00',
        way: 'WeChat',
        remark: 'For your coffee fund',
    },
    {
        name: 'Anonymous~',
        time: '2024-11-29',
        amount: '¥99.00',
        way: 'WeChat',
        remark: 'Open-source deserves support',
    },
]
</script>

<style scoped>
.payerTable {
    width: 100%;
    border-collapse: collapse;
}
</style>