<template>
    <div class="aboutBox" :class="{ isWeb: !isTauri }">
        <!-- <div class="aboutHeader">
            <div class="toolBox">
                <div class="setting">
                    <span class="iconfont setIcon" @click="goBack">
                        &#xe644;
                    </span>
                </div>
            </div>
        </div> -->
        <!-- content -->
        <div class="content">
            <div class="title">
                <img :src="pakePlusIcon" alt="pakeplus" class="logo" />
                <span class="pakeplus">PakePlus</span>
            </div>
            <div class="description">
                <p>
                    {{ t('aboutGuide') }}：1024xiaoshen@gmail.com。
                    或加入我们的群聊：
                    <el-popover
                        popper-class="popoverBox"
                        :width="180"
                        placement="top"
                    >
                        <template #reference>
                            <span class="iconfont group"> &#xe64b; </span>
                        </template>
                        <img
                            src="https://gh-proxy.com/github.com/Sjj1024/PakePlus/blob/main/docs/static/imgs/wxcode.png"
                            alt=""
                            class="groupCode"
                        />
                    </el-popover>
                </p>
            </div>
            <div class="tools">
                <p>
                    <span>PakePLus：</span>
                    <span class="link" @click="openUrl(urlMap.pakeplus)">
                        {{ urlMap.pakeplus }}
                    </span>
                </p>
                <p>
                    <span>{{ t('githubRepo') }}：</span>
                    <span class="link" @click="openUrl(urlMap.github)">
                        {{ urlMap.github }}
                    </span>
                </p>
                <p>
                    <span>{{ t('navigation') }}：</span>
                    <span class="link" @click="openUrl(urlMap.ppofficial)">
                        {{ urlMap.ppofficial }}
                    </span>
                </p>
                <p>
                    <span>{{ t('followme') }}：</span>
                    <span class="link" @click="openUrl(urlMap.csdn)">
                        CSDN
                    </span>
                    <span class="link" @click="openUrl(urlMap.juejin)">
                        掘金
                    </span>
                    <span class="link" @click="openUrl(urlMap.github)">
                        Github
                    </span>
                    <span class="link" @click="openUrl(urlMap.gitee)">
                        Gitee
                    </span>
                    <span class="link" @click="openUrl(urlMap.bilibili)">
                        Bilibili
                    </span>
                    <span class="link" @click="openUrl(urlMap.twitter)">
                        Twitter
                    </span>
                    <span class="link" @click="openUrl(urlMap.youtube)">
                        Youtube
                    </span>
                </p>
            </div>
            <div class="payMe">
                <p class="payTitle">{{ t('buyCoffee') }}</p>
                <p class="payDesc">
                    {{ t('sponsorTips') }}
                </p>
                <p class="payIconBox">
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <span class="iconfont weixin"> &#xe64b; </span>
                        </template>
                        <img :src="weixin" alt="" class="code" />
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <span class="iconfont zhifubao"> &#xe654; </span>
                        </template>
                        <img :src="zhifubao" alt="" class="code" />
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <svg class="icon payIcon" aria-hidden="true">
                                <use xlink:href="#icon-dwasdwas"></use>
                            </svg>
                        </template>
                        <img
                            src="@/assets/images/arb.png"
                            alt=""
                            class="code"
                        />
                        <div class="payInfoBox">
                            <h2 class="coinName">Arbitrum One</h2>
                            <div class="wallet-address" id="eth-addr">
                                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
                            </div>
                            <button
                                class="copy-btn"
                                @click="
                                    copyAddress(
                                        '0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4'
                                    )
                                "
                            >
                                {{ t('copyAddress') }}
                            </button>
                        </div>
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <svg class="icon payIcon" aria-hidden="true">
                                <use xlink:href="#icon-bnb"></use>
                            </svg>
                        </template>
                        <img
                            src="@/assets/images/bnb.png"
                            alt=""
                            class="code"
                        />
                        <div class="payInfoBox">
                            <h2 class="coinName">BSC (BNB / USDT)</h2>
                            <div class="wallet-address" id="eth-addr">
                                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
                            </div>
                            <button
                                class="copy-btn"
                                @click="
                                    copyAddress(
                                        '0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4'
                                    )
                                "
                            >
                                {{ t('copyAddress') }}
                            </button>
                        </div>
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <svg class="icon payIcon" aria-hidden="true">
                                <use xlink:href="#icon-bitcoin1"></use>
                            </svg>
                        </template>
                        <img
                            src="@/assets/images/btc.png"
                            alt=""
                            class="code"
                        />
                        <div class="payInfoBox">
                            <h2 class="coinName">Bitcoin</h2>
                            <div class="wallet-address" id="eth-addr">
                                3GxwxebSa9fsETahiZGwF5RekxS2fTKj4h
                            </div>
                            <button
                                class="copy-btn"
                                @click="
                                    copyAddress(
                                        '3GxwxebSa9fsETahiZGwF5RekxS2fTKj4h'
                                    )
                                "
                            >
                                {{ t('copyAddress') }}
                            </button>
                        </div>
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <svg class="icon payIcon" aria-hidden="true">
                                <use xlink:href="#icon-solana"></use>
                            </svg>
                        </template>
                        <img
                            src="@/assets/images/sol.png"
                            alt=""
                            class="code"
                        />
                        <div class="payInfoBox">
                            <h2 class="coinName">Solana</h2>
                            <div class="wallet-address" id="eth-addr">
                                DU121XejdYxihLxLr4vxcNNViqhpB5Fo5m7hsvmAhUY8
                            </div>
                            <button
                                class="copy-btn"
                                @click="
                                    copyAddress(
                                        'DU121XejdYxihLxLr4vxcNNViqhpB5Fo5m7hsvmAhUY8'
                                    )
                                "
                            >
                                {{ t('copyAddress') }}
                            </button>
                        </div>
                    </el-popover>
                    <el-popover
                        popper-class="popoverBox"
                        :width="286"
                        placement="top"
                    >
                        <template #reference>
                            <svg class="icon payIcon" aria-hidden="true">
                                <use xlink:href="#icon-ETH-Ethereum"></use>
                            </svg>
                        </template>
                        <img
                            src="@/assets/images/eth.png"
                            alt=""
                            class="code"
                        />
                        <div class="payInfoBox">
                            <h2 class="coinName">Ethereum</h2>
                            <div class="wallet-address" id="eth-addr">
                                0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4
                            </div>
                            <button
                                class="copy-btn"
                                @click="
                                    copyAddress(
                                        '0x0465944fe1317e8847f6ec1eaf7a7e97cbc1aba4'
                                    )
                                "
                            >
                                {{ t('copyAddress') }}
                            </button>
                        </div>
                    </el-popover>
                </p>
            </div>
            <div class="buildTime">
                <span>Build Time: {{ buildTime }}</span>
            </div>
        </div>
        <!-- pay -->
        <el-dialog
            v-model="dialogVisible"
            title=""
            width="300"
            :before-close="handleClose"
        >
            <div class="codeBox">
                <img :src="codeImg" alt="" class="code" />
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import pakePlusIcon from '@/assets/images/pakeplus.png'
import weixin from '@/assets/images/weixin.png'
import zhifubao from '@/assets/images/zhifubao.png'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
    urlMap,
    openUrl,
    isTauri,
    buildTime,
    copyText,
    oneMessage,
} from '@/utils/common'
import { ref } from 'vue'

const { t } = useI18n()

const router = useRouter()
const dialogVisible = ref(false)
const codeImg = ref(weixin)

const copyAddress = (address: string) => {
    copyText(address)
    oneMessage.success(t('copySuccess'))
}

const handleClose = () => {
    console.log('handleClose')
    dialogVisible.value = false
}

const goBack = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped>
.popoverBox {
    display: flex;
    justify-content: center;
    align-items: center;
}

.payInfoBox {
    display: flex;
    flex-direction: column;
    align-items: center;

    .coinName {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-color);
    }
}

.code {
    width: 260px;
    height: auto;
}

.wallet-address {
    font-family: monospace;
    font-size: 0.9rem;
    word-break: break-all;
    // margin: 0.5rem 0;
    // background: var(--hover-color);
    color: var(--text-color);
    padding: 0.5rem;
    border-radius: 6px;
}

.copy-btn {
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

.aboutBox {
    padding: 10px 20px;

    .aboutHeader {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .toolBox {
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .setting {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .userName {
                    margin-right: 6px;
                }

                .setIcon {
                    font-size: 22px;
                    color: gray;
                    cursor: pointer;

                    &:hover {
                        color: var(--text-color);
                    }
                }
            }
        }
    }

    .content {
        .title {
            display: flex;
            flex-direction: column;
            align-items: center;

            .logo {
                width: 100px;
                height: 100px;
            }

            .pakeplus {
                font-size: 26px;
                font-weight: 600;
                color: var(--text-color);
                margin: 10px 0;
            }
        }

        .link {
            cursor: pointer;
            color: #0969da;
            margin-right: 16px;
        }

        .tools {
            margin-top: 10px;

            p {
                margin-bottom: 10px;
            }
        }

        .payMe {
            margin-top: 6px;

            .payTitle {
                font-size: 20px;
                font-weight: 700;
                color: var(--text-color);
                margin: 10px 10px 10px 0;
            }

            .payIconBox {
                width: 60%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                // padding: 0 100px;
                margin: 20px 0;
            }

            .payIcon {
                font-size: 36px;
                cursor: pointer;
            }

            .zhifubao {
                font-size: 36px;
                color: #009fe8;
                cursor: pointer;
            }

            .weixin {
                font-size: 38px;
                color: #3daf34;
                cursor: pointer;
            }
        }

        .buildTime {
            margin-top: 10px;
            font-size: 16px;
            text-align: right;
            color: #999;
        }
    }
}

.group {
    cursor: pointer;
}

.groupCode {
    width: 160px;
    height: 220px;
}

.codeBox {
    display: flex;
    flex-direction: column;
    align-items: center;

    .code {
        width: 260px;
        // height: 240px;
    }
}
</style>
