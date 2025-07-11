<template>
    <h1>💖 赞助我们</h1>
    <p>
        如果您也喜欢我们的PakePlus项目，欢迎赞助我们，我们会继续开发和维护。
        您的支持是我们前进的动力。 赞助时请务必填写留言或发邮箱：
        1024xiaoshen@gmail.com，以便我们收录到赞助名单中，感谢您的支持与鼓励！
    </p>
    <h1>微信/支付宝赞助</h1>
    <!-- <p>
        您可以进交流群或添加微信：lanxingme
        进行转账或发红包形式赞助，也可以直接转账到支付宝：15670339118
        赞助，并备注您的留言内容，我们会及时收录到赞助名单中。
    </p> -->
    <div class="sponsorBox">
        <img
            class="wxCode"
            src="../../static/imgs/sponsor.webp"
            alt="微信二维码"
            @error="imageError"
        />
    </div>
    <h1>Web3 钱包赞助</h1>
    <div class="wallet-grid">
        <!-- 钱包卡片 1 -->
        <div class="wallet-card">
            <h2>Arbitrum One</h2>
            <div class="wallet-address" id="eth-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('eth-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/arb.png"
                alt="Ethereum QR Code"
            />
        </div>

        <!-- 钱包卡片 2 -->
        <div class="wallet-card">
            <h2>BSC (BNB / USDT)</h2>
            <div class="wallet-address" id="polygon-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('polygon-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/bnb.png"
                alt="Polygon QR Code"
            />
        </div>

        <!-- 钱包卡片 3 -->
        <div class="wallet-card">
            <h2>Bitcoin</h2>
            <div class="wallet-address" id="bsc-addr">
                bc1pcjm3unwrg6shae99qeyex2wak0tszqyz6zw9euf2sthwgyhnp48qhmm42r
            </div>
            <button class="copy-btn" @click="copyToClipboard('bsc-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/btc.png"
                alt="BSC QR Code"
            />
        </div>

        <!-- 钱包卡片 4 -->
        <div class="wallet-card">
            <h2>Ethereum</h2>
            <div class="wallet-address" id="arbit   rum-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('arbitrum-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/eth.png"
                alt="Arbitrum QR Code"
            />
        </div>

        <!-- 钱包卡片 5 -->
        <div class="wallet-card">
            <h2>Solana</h2>
            <div class="wallet-address" id="tron-addr">
                DU121XejdYxihLxLr4vxcNNViqhpB5Fo5m7hsvmAhUY8
            </div>
            <button class="copy-btn" @click="copyToClipboard('tron-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/sol.png"
                alt="Tron QR Code"
            />
        </div>

        <!-- 钱包卡片 6 -->
        <div class="wallet-card">
            <h2>Polygon</h2>
            <div class="wallet-address" id="tron-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('tron-addr')">
                复制地址
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/poly.jpg"
                alt="Tron QR Code"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'

const copyToClipboard = (id: string) => {
    const text = document.getElementById(id)?.textContent
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('地址已复制：' + text)
        })
    }
}

const imageError = (event) => {
    event.target.src =
        'https://gh-proxy.com/github.com/Sjj1024/PakePlus/blob/main/docs/static/imgs/pay.webp'
}
</script>

<style scoped>
.sponsorBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.wxCode {
    background-image: url('https://files.pakeplus.com/pay.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

h1 {
    text-align: left;
    margin-bottom: 2rem;
}
.wallet-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}
.wallet-card {
    background: var(--vp-c-bg-alt);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
}
.wallet-card h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    border: unset;
    margin-top: 0;
}
.wallet-address {
    font-family: monospace;
    font-size: 0.9rem;
    word-break: break-all;
    margin: 0rem 1rem;
    background: var(--vp-c-bg-alt);
    padding: 0.5rem;
    border-radius: 6px;
}
img.qr {
    width: 50%;
    height: auto;
    margin: 0 auto;
    border-radius: 6px;
}
.copy-btn {
    margin: 0 0 0.5rem 0;
    padding: 0.3rem 0.8rem;
    border: none;
    background: #007aff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}
.copy-btn:hover {
    background: #005ecc;
}
</style>
