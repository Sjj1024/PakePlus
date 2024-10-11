<template>
    <div class="aboutBox">
        <div class="aboutHeader">
            <div class="toolBox">
                <div class="setting">
                    <!-- <span class="userName">{{ store.userInfo.login }}</span> -->
                    <span class="iconfont setIcon" @click="goBack">
                        &#xe644;
                    </span>
                </div>
            </div>
        </div>
        <!-- content -->
        <div class="content">
            <div class="title">
                <img :src="pakePlusIcon" alt="pakeplus" class="logo" />
                <span class="pakeplus">PakePlus</span>
            </div>
            <div class="description">
                <p>
                    虽然它叫PakePlus，但是它和Pake没有关系哦，就像JavaScript和Java一样。开源免费，Web网页打包跨平台APP，仅仅只需要一个Github
                    Token 开源免费，Web网页打包跨平台APP，仅仅只需要一个Github
                    Token 开源免费，Web网页打包跨平台APP，仅仅只需要一个Github
                    Token 开源免费，Web网页打包跨平台APP，仅仅只需要一个Github
                    Token
                </p>
            </div>
            <div class="tools">
                <p>开源地址：https://www.bilibili.com/video/BV1SvtWe5EVg/</p>
                <p>使用教程：https://www.bilibili.com/video/BV1SvtWe5EVg/</p>
                <p>关注小神：CSDN 掘金 github 抖音 哔哩哔哩 微信群 YouTube X</p>
            </div>
            <div class="payMe">
                <p>如果对你有帮助，可以请我喝杯咖啡：</p>
                <div class="payCode">
                    <!-- <img :src="zhifubao" alt="zhifubao" />
                    <img :src="weixin" alt="weixin" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import pakePlusIcon from '@/assets/images/pakeplus.png'
import zhifubao from '@/assets/images/zhifubao.png'
import weixin from '@/assets/images/weixin.png'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped>
.aboutBox {
    padding: 10px 20px;

    .aboutHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .toolBox {
            position: fixed;
            top: 20px;
            right: 20px;
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
                    font-size: 20px;
                    color: gray;
                    cursor: pointer;
                    &:hover {
                        color: black;
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
                color: #000000;
            }
        }
    }
}
</style>
