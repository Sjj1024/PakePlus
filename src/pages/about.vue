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
                    Token，就可以将你的网页打包成一个独立可执行程序，目前支持Windows,
                    macOS, Linux系统，未来还会支持Android,
                    iOS等移动端。有问题可以加我微信：lanxingme，备注：PakePlus，或者给我发送邮件:
                    {{ pakeUrlMap.email }}
                </p>
            </div>
            <div class="tools">
                <p>
                    <span>{{ t('githubRepo') }}：</span>
                    <span class="link" @click="openUrl(pakeUrlMap.github)">
                        {{ pakeUrlMap.github }}
                    </span>
                </p>
                <p>
                    <span>{{ t('navigation') }}：</span>
                    <span class="link" @click="openUrl(pakeUrlMap.github)">
                        {{ pakeUrlMap.github }}
                    </span>
                </p>
                <p>
                    <span>关注小神：</span>
                    <span class="link" @click="openUrl(pakeUrlMap.csdn)">
                        CSDN
                    </span>
                    <span class="link" @click="openUrl(pakeUrlMap.juejin)">
                        掘金
                    </span>
                    <span class="link" @click="openUrl(pakeUrlMap.github)">
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
                <!-- <div>非常感谢</div> -->
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
import { pakeUrlMap, openUrl } from '@/utils/common'
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
