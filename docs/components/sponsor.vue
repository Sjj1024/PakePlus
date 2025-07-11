<template>
    <h1>💖 Sponsor Us</h1>

    <p>
        If you enjoy our PakePlus project, we welcome your sponsorship to help
        us continue development and maintenance. Your support is our driving
        force. Please include a message or email us at: 1024xiaoshen@gmail.com
        when sponsoring so we can acknowledge your contribution. Thank you for
        your support!
    </p>

    <h1>WeChat/Alipay Sponsorship</h1>
    <div class="sponsorBox">
        <img
            class="wxCode"
            src="https://files.pakeplus.com/sponsor.webp"
            alt="WeChat QR Code"
        />
    </div>
    <h1>Web3 Wallet Support</h1>
    <div class="wallet-grid">
        <!-- Wallet Card 1 -->
        <div class="wallet-card">
            <h2>Arbitrum One</h2>
            <div class="wallet-address" id="eth-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('eth-addr')">
                Copy Address
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/arb.png"
                alt="Ethereum QR Code"
            />
        </div>

        <!-- Wallet Card 2 -->
        <div class="wallet-card">
            <h2>BSC (BNB / USDT)</h2>
            <div class="wallet-address" id="polygon-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('polygon-addr')">
                Copy Address
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/bnb.png"
                alt="Polygon QR Code"
            />
        </div>

        <!-- Wallet Card 3 -->
        <div class="wallet-card">
            <h2>Bitcoin</h2>
            <div class="wallet-address" id="bsc-addr">
                bc1pcjm3unwrg6shae99qeyex2wak0tszqyz6zw9euf2sthwgyhnp48qhmm42r
            </div>
            <button class="copy-btn" @click="copyToClipboard('bsc-addr')">
                Copy Address
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/btc.png"
                alt="BSC QR Code"
            />
        </div>

        <!-- Wallet Card 4 -->
        <div class="wallet-card">
            <h2>Ethereum</h2>
            <div class="wallet-address" id="arbitrum-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('arbitrum-addr')">
                Copy Address
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/eth.png"
                alt="Arbitrum QR Code"
            />
        </div>

        <!-- Wallet Card 5 -->
        <div class="wallet-card">
            <h2>Solana</h2>
            <div class="wallet-address" id="tron-addr">
                DU121XejdYxihLxLr4vxcNNViqhpB5Fo5m7hsvmAhUY8
            </div>
            <button class="copy-btn" @click="copyToClipboard('tron-addr')">
                Copy Address
            </button>
            <img
                class="qr"
                src="https://files.pakeplus.com/sol.png"
                alt="Tron QR Code"
            />
        </div>

        <!-- Wallet Card 6 -->
        <div class="wallet-card">
            <h2>Polygon</h2>
            <div class="wallet-address" id="tron-addr">
                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
            </div>
            <button class="copy-btn" @click="copyToClipboard('tron-addr')">
                Copy Address
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
const copyToClipboard = (id: string) => {
    const text = document.getElementById(id)?.textContent
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Address copied: ' + text)
        })
    }
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

h1 {
    text-align: center;
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
