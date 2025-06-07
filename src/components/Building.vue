<template>
    <el-dialog
        v-model="visible"
        fullscreen
        :show-close="false"
        center
        class="buildDialog"
    >
        <template #header="{ close, titleId, titleClass }">
            <div class="buildHeader">
                <h4 :id="titleId" :class="titleClass" style="color: #fff">
                    {{ t('buildTips') }}
                </h4>
            </div>
        </template>
        <div class="buildingBox">
            <div v-if="desktopStatus" class="platform">
                <el-icon
                    v-if="desktopStatus === t('buildSuccess')"
                    size="20"
                    class="buildIcon success"
                >
                    <!-- success -->
                    <SuccessFilled />
                </el-icon>
                <el-icon
                    v-else-if="desktopStatus === t('failure')"
                    size="20"
                    class="buildIcon failure"
                >
                    <!-- failure -->
                    <CircleCloseFilled />
                </el-icon>
                <el-icon
                    v-else-if="desktopStatus === t('cancelled')"
                    size="20"
                    class="buildIcon cancelled"
                >
                    <!-- cancelled -->
                    <WarningFilled />
                </el-icon>
                <el-icon v-else class="is-loading building buildIcon" size="20">
                    <!-- loading -->
                    <Loading />
                </el-icon>
                <div>{{ t('desktopapp') }}</div>
                <div v-if="desktopTime">{{ desktopTime }}</div>
                <div>
                    <span>{{ desktopStatus }}</span>
                    <span v-if="desktopTime">{{ desktopRate }}%</span>
                </div>
            </div>
            <div v-if="androidStatus" class="platform">
                <el-icon
                    v-if="androidStatus === t('buildSuccess')"
                    size="20"
                    class="buildIcon success"
                >
                    <!-- success -->
                    <SuccessFilled />
                </el-icon>
                <el-icon
                    v-else-if="androidStatus === t('failure')"
                    size="20"
                    class="buildIcon failure"
                >
                    <!-- failure -->
                    <CircleCloseFilled />
                </el-icon>
                <el-icon
                    v-else-if="androidStatus === t('cancelled')"
                    size="20"
                    class="buildIcon cancelled"
                >
                    <!-- cancelled -->
                    <WarningFilled />
                </el-icon>
                <el-icon v-else class="is-loading buildIcon building" size="20">
                    <!-- loading -->
                    <Loading />
                </el-icon>
                <div>{{ t('androidapp') }}</div>
                <div v-if="androidTime">{{ androidTime }}</div>
                <div>
                    <span>{{ androidStatus }}</span>
                    <span v-if="androidTime">{{ androidRate }}%</span>
                </div>
            </div>
            <div v-if="iosStatus" class="platform">
                <el-icon
                    v-if="iosStatus === t('buildSuccess')"
                    size="20"
                    class="buildIcon success"
                >
                    <!-- success -->
                    <SuccessFilled />
                </el-icon>
                <el-icon
                    v-else-if="iosStatus === t('failure')"
                    size="20"
                    class="buildIcon failure"
                >
                    <!-- failure -->
                    <CircleCloseFilled />
                </el-icon>
                <el-icon
                    v-else-if="iosStatus === t('cancelled')"
                    size="20"
                    class="buildIcon cancelled"
                >
                    <!-- cancelled -->
                    <WarningFilled />
                </el-icon>
                <el-icon v-else class="is-loading buildIcon building" size="20">
                    <!-- loading -->
                    <Loading />
                </el-icon>
                <div>{{ t('iosapp') }}</div>
                <div v-if="iosTime">{{ iosTime }}</div>
                <div>
                    <span>{{ iosStatus }}</span>
                    <span v-if="iosTime">{{ iosRate }}%</span>
                </div>
            </div>
            <div v-if="pwaStatus" class="platform">
                <el-icon
                    v-if="pwaStatus === t('buildSuccess')"
                    size="20"
                    class="buildIcon success"
                >
                    <!-- success -->
                    <SuccessFilled />
                </el-icon>
                <el-icon
                    v-else-if="pwaStatus === t('failure')"
                    size="20"
                    class="buildIcon failure"
                >
                    <!-- failure -->
                    <CircleCloseFilled />
                </el-icon>
                <el-icon
                    v-else-if="pwaStatus === t('cancelled')"
                    size="20"
                    class="buildIcon cancelled"
                >
                    <!-- cancelled -->
                    <WarningFilled />
                </el-icon>
                <el-icon v-else class="is-loading buildIcon building" size="20">
                    <!-- loading -->
                    <Loading />
                </el-icon>
                <div>{{ t('pwaapp') }}</div>
                <div v-if="pwaTime">{{ pwaTime }}</div>
                <div>
                    <span>{{ pwaStatus }}</span>
                    <span v-if="pwaTime">{{ pwaRate }}%</span>
                </div>
            </div>
        </div>
        <template #footer>
            <!-- <div class="dialog-footer">
                <el-button>Cancel</el-button>
                <el-button type="primary"> Confirm </el-button>
            </div> -->
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {
    SuccessFilled,
    CircleCloseFilled,
    Loading,
    WarningFilled,
} from '@element-plus/icons-vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const visible = defineModel<boolean>('visible', {
    default: true,
})

const props = defineProps({
    desktopTime: {
        type: String,
        default: '',
        required: false,
    },
    desktopStatus: {
        type: String,
        default: '',
        required: false,
    },
    desktopRate: {
        type: Number,
        default: 0,
        required: false,
    },
    androidTime: {
        type: String,
        default: '',
        required: false,
    },
    androidStatus: {
        type: String,
        default: '',
        required: false,
    },
    androidRate: {
        type: Number,
        default: 0,
        required: false,
    },
    iosTime: {
        type: String,
        default: '',
        required: false,
    },
    iosStatus: {
        type: String,
        default: '',
        required: false,
    },
    iosRate: {
        type: Number,
        default: 0,
        required: false,
    },
    pwaTime: {
        type: String,
        default: '',
        required: false,
    },
    pwaStatus: {
        type: String,
        default: '',
        required: false,
    },
    pwaRate: {
        type: Number,
        default: 0,
        required: false,
    },
})

watch(props, (newVal) => {
    console.log('newVal', newVal)
    if (
        (newVal.androidStatus === t('buildSuccess') ||
            newVal.androidStatus === t('failure') ||
            newVal.androidStatus === t('cancelled') ||
            newVal.androidStatus === '') &&
        (newVal.iosStatus === t('buildSuccess') ||
            newVal.iosStatus === t('failure') ||
            newVal.iosStatus === t('cancelled') ||
            newVal.iosStatus === '')
    ) {
        console.log('androidStatus', newVal.androidStatus)
        setTimeout(() => {
            router.push('/history')
        }, 1000)
    }
})
</script>

<style lang="scss" scoped>
.buildHeader {
    color: #fff !important;
}

.buildingBox {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10em;

    .platform {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0 50px;

        .buildIcon {
            font-weight: bold;
        }

        .success {
            color: #13ce66;
        }

        .failure {
            color: rgb(249, 42, 42);
        }

        .cancelled {
            color: gray;
        }

        .building {
            color: rgb(0, 162, 255);
        }

        .loader {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #4dabf7;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    }
}
</style>
