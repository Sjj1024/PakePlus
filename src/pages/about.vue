<template>
    <div class="aboutBox" :class="{ isWeb: !isTauri }">
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
                    {{ t('aboutGuide') }}:
                    {{ urlMap.email }}
                </p>
            </div>
            <div class="tools">
                <p>
                    <span>{{ t('githubRepo') }}：</span>
                    <span class="link" @click="openUrl(urlMap.github)">
                        {{ urlMap.github }}
                    </span>
                </p>
                <p>
                    <span>{{ t('navigation') }}：</span>
                    <span class="link" @click="openUrl(urlMap.github)">
                        {{ urlMap.github }}
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
                </p>
            </div>
            <div class="payMe">
                <p>
                    {{ t('buyCoffee') }}：
                    <span class="iconfont weixin" @click="showCode(weixin)">
                        &#xe64b;
                    </span>
                    <span class="iconfont zhifubao" @click="showCode(zhifubao)">
                        &#xe654;
                    </span>
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
import { urlMap, openUrl, isTauri, buildTime } from '@/utils/common'
import { ref } from 'vue'

const { t } = useI18n()

const router = useRouter()
const dialogVisible = ref(false)
const codeImg = ref(weixin)

const showCode = (img: any) => {
    dialogVisible.value = true
    codeImg.value = img
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
            }
        }

        .link {
            cursor: pointer;
            color: #0969da;
            margin-right: 16px;
        }

        .tools {
            margin-top: 10px;
        }

        .payMe {
            margin-top: 6px;

            .zhifubao {
                font-size: 36px;
                color: #009fe8;
                cursor: pointer;
            }

            .weixin {
                font-size: 38px;
                color: #3daf34;
                margin-right: 20px;
                cursor: pointer;
            }
        }

        .buildTime {
            margin-top: 10px;
            font-size: 16px;
            color: #999;
        }
    }
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
