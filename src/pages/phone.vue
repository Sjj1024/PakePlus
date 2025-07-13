<template>
    <div class="editBox" :class="{ isWeb: !isTauri }">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <div class="backBox" @click="backHome">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>{{ t('back') }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span> {{ t('appProject') }} </span>
                </div>
                <div class="toolTips">
                    <span> {{ t('appProjectTips') }} </span>
                    <el-icon class="document" @click="openUrl(urlMap.phonedoc)">
                        <Document />
                    </el-icon>
                </div>
            </div>
            <!-- tools -->
            <div class="setting">
                <!-- warning -->
                <el-icon
                    v-if="warning"
                    @click="showWarning"
                    :size="22"
                    class="warning"
                >
                    <Warning />
                </el-icon>
                <!-- publish -->
                <el-icon
                    v-if="store.isRelease"
                    @click="toHistory"
                    :size="22"
                    class="publish"
                >
                    <Paperclip />
                </el-icon>
                <el-icon :size="22" class="desktop" @click="morePhoneConfig">
                    <Orange />
                </el-icon>
            </div>
        </div>
        <div class="mainEdit">
            <el-form
                ref="appFormRef"
                :model="store.currentProject"
                :rules="appRules"
                label-width="auto"
                class="configForm"
                :size="formSize"
                status-icon
            >
                <div class="inLine">
                    <el-form-item
                        :label="t('appName')"
                        prop="showName"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.showName"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            clearable
                            @input="changeAppName"
                            :placeholder="`${t('example')}：PakePlus`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('webUrl')"
                        prop="url"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.url"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            clearable
                            @input="changeUrl"
                            :placeholder="`${t(
                                'example'
                            )}：https://www.github.com'`"
                        >
                            <template #append>
                                <el-tooltip
                                    class="box-item"
                                    :content="t('staticFile')"
                                    placement="bottom"
                                >
                                    <el-button
                                        :icon="UploadFilled"
                                        @click="activeDistInput"
                                        :disabled="true"
                                    />
                                </el-tooltip>
                            </template>
                        </el-input>
                        <input
                            type="file"
                            ref="distInput"
                            webkitdirectory
                            @change="handleFileChange"
                            style="display: none"
                        />
                    </el-form-item>
                </div>
                <div class="inLine">
                    <el-form-item
                        :label="t('appId')"
                        prop="appid"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.appid"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：com.pakeplus.app`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('appVersion')"
                        prop="version"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <!-- app icon -->
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('appIcon')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: unset'"
                    >
                        <div v-if="iconBase64" class="iconChange">
                            <img
                                :src="
                                    store.currentProject.iconRound
                                        ? roundIcon
                                        : iconBase64
                                "
                                alt="icon"
                                class="initIcon"
                                @click="imgPreviewVisible = true"
                            />
                            <!-- delete icon -->
                            <el-icon class="closeIcon" @click="deleteIcon">
                                <CircleCloseFilled />
                            </el-icon>
                        </div>
                        <div
                            v-else
                            class="iconPreview"
                            @click="isTauri ? uploadIcon() : webUploadIcon()"
                        >
                            <el-icon><Picture /></el-icon>
                            <input
                                type="file"
                                ref="file"
                                accept="image/*"
                                @change="handleIconChange"
                                style="display: none"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('iconRounded')"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.iconRound"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('devbug')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.devbug"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('scriptFile')"
                        prop="customJs"
                        class="formItem"
                        style="margin-right: 10px"
                    >
                        <el-icon
                            class="editIcon"
                            @click="codeDialogVisible = true"
                        >
                            <Edit />
                        </el-icon>
                    </el-form-item>
                    <el-form-item
                        :label="t('safeArea')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-select
                            v-model="safeVal"
                            placeholder="Select"
                            style="width: 100px"
                            disabled
                        >
                            <el-option
                                v-for="item in safeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- app header -->
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('appHeader')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: unset'"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.header.show"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('siderMenu')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: unset'"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.siderMenu.show"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('functionMenu')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.header.toolBar"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('loadingProgress')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.header.loading"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('appTitle')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-select
                            v-model="appHeaderVal"
                            placeholder="Select"
                            style="width: 100px"
                            disabled
                        >
                            <el-option
                                v-for="item in appHeaderOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- bottom menu -->
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('appFooter')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: unset'"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.tabBar.show"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('defaultColor')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: unset'"
                    >
                        <el-checkbox
                            v-model="store.currentProject.phone.tabBar.color"
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('activeColor')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="
                                store.currentProject.phone.tabBar.activeColor
                            "
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('backgroundColor')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="
                                store.currentProject.phone.tabBar
                                    .backgroundColor
                            "
                            label=""
                            disabled
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('fontSize')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-select
                            v-model="fontSizeVal"
                            placeholder="Select"
                            style="width: 100px"
                            disabled
                        >
                            <el-option
                                v-for="item in fontSizeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <!-- menu config -->
                <!-- <div class="inLine checkBox">
                    <el-form-item
                        :label="t('menuOne')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                    </el-form-item>
                    <el-form-item
                        :label="t('menuText')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('menuIcon')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('menuLink')"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('menuTwo')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                    </el-form-item>
                    <el-form-item
                        :label="t('menuText')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('menuIcon')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('menuLink')"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('menuThree')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                    </el-form-item>
                    <el-form-item
                        :label="t('menuText')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('menuIcon')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('menuLink')"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('menuFour')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                    </el-form-item>
                    <el-form-item
                        :label="t('menuText')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('menuIcon')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('menuLink')"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('menuFive')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                    </el-form-item>
                    <el-form-item
                        :label="t('menuText')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('menuIcon')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('menuLink')"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div> -->
            </el-form>
        </div>

        <!-- save and preview and publish -->
        <div class="footerBox">
            <el-button @click="saveProject(true)">{{ t('save') }}</el-button>
            <el-button @click="preview(false)">
                {{ t('preview') }}
            </el-button>
            <el-button @click="creatBuild">
                {{ t('publish') }}
            </el-button>
        </div>
        <!-- build -->
        <el-dialog
            v-model="centerDialogVisible"
            width="500"
            center
            align-center
        >
            <template #header>
                <div class="diaHeader">
                    <span>{{ t('build') }}</span>
                </div>
            </template>
            <el-form
                :model="pubForm"
                label-width="auto"
                style="max-width: 600px"
            >
                <!-- platform select -->
                <el-form-item :label="t('pubPlatform')">
                    <el-checkbox-group v-model="pubForm.platform">
                        <el-checkbox
                            :label="t('androidapp')"
                            value="PakePlus-Android"
                        />
                        <el-checkbox
                            :label="t('iosapp')"
                            value="PakePlus-iOS"
                        />
                        <el-checkbox
                            :label="t('pwaapp')"
                            value="pwa"
                            disabled
                        />
                    </el-checkbox-group>
                </el-form-item>
                <!-- build package selcted -->
                <!-- <el-form-item label="目标架构">
                    <el-radio-group v-model="pubForm.chip">
                        <el-radio value="macos">m</el-radio>
                        <el-radio value="debug">macos-Intel</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <!-- debug -->
                <el-form-item :label="t('pubMode')">
                    <el-radio-group
                        v-model="store.currentProject.android.debug"
                    >
                        <el-radio :value="false">
                            {{ t('closeDebug') }}
                        </el-radio>
                        <el-radio :value="true">
                            {{ t('openDebug') }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('releaseNotes')">
                    <el-input
                        v-model="store.currentProject.android.pubBody"
                        type="textarea"
                        :disabled="!isDev"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="t('inputRelNotes')"
                    />
                </el-form-item>
            </el-form>
            <span style="color: #aaa">
                {{ t('pubPhoneTips') }}
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">
                        {{ t('cancel') }}
                    </el-button>
                    <el-button type="primary" @click="publishPhone">
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- cutter img -->
        <CutterImg
            v-model="cutVisible"
            :imgUrl="tempIconBase64"
            :confirm="confirmIcon"
        ></CutterImg>
        <!-- more config -->
        <el-dialog
            v-model="configDialogVisible"
            :width="isTauri ? '90%' : '60%'"
            center
            align-center
            :before-close="closeConfigDialog"
        >
            <template #header="{ titleId, titleClass }">
                <div class="configHeader">
                    <h4 :id="titleId" :class="titleClass" class="titleLine">
                        <span class="titleText">{{ t('moreConfig') }}</span>
                        <!-- <el-icon class="switchIcon" @click="switchTauriConfig">
                            <Switch />
                        </el-icon> -->
                    </h4>
                </div>
            </template>
            <PhoneConfig ref="tauriConfigRef" :isJson="isJson" />
        </el-dialog>
        <!-- js code edit -->
        <el-dialog
            v-model="codeDialogVisible"
            :width="isTauri ? '90%' : '60%'"
            center
            align-center
            @closed="closeJsCodeEditDialog"
        >
            <template #header="{ titleId, titleClass }">
                <div class="configHeader">
                    <h4 :id="titleId" :class="titleClass" class="titleLine">
                        <span class="titleText">{{ t('scriptEdit') }}</span>
                    </h4>
                </div>
            </template>
            <CodeEdit
                ref="codeEditRef"
                lang="javascript"
                height="400px"
                :code="store.currentProject.customJs"
            />
        </el-dialog>
        <!-- img preview -->
        <ImgPreview
            v-model:visible="imgPreviewVisible"
            :base64Data="
                store.currentProject.iconRound ? roundIcon : iconBase64
            "
        >
        </ImgPreview>
        <Building
            v-model:visible="buildLoading"
            :desktopTime="buildTimeText.PakePlus"
            :desktopStatus="buildStatus['PakePlus']"
            :desktopRate="buildRates['PakePlus']"
            :androidTime="buildTimeText['PakePlus-Android']"
            :androidStatus="buildStatus['PakePlus-Android']"
            :androidRate="buildRates['PakePlus-Android']"
            :iosTime="buildTimeText['PakePlus-iOS']"
            :iosStatus="buildStatus['PakePlus-iOS']"
            :iosRate="buildRates['PakePlus-iOS']"
            :pwaTime="buildTimeText['PWA']"
            :pwaStatus="buildStatus['PWA']"
            :pwaRate="buildRates['PWA']"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { useRoute, useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'
import {
    ElMessageBox,
    type ComponentSize,
    type FormInstance,
    type FormRules,
} from 'element-plus'
import githubApi from '@/apis/github'
import { usePPStore } from '@/store'
import { readFile, writeTextFile, exists } from '@tauri-apps/plugin-fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import { basename } from '@tauri-apps/api/path'
import {
    ArrowLeft,
    Switch,
    Edit,
    Picture,
    CircleCloseFilled,
    UploadFilled,
    Warning,
    Paperclip,
    Document,
    Orange,
} from '@element-plus/icons-vue'
import CutterImg from '@/components/CutterImg.vue'
import CodeEdit from '@/components/CodeEdit.vue'
import { useI18n } from 'vue-i18n'
import {
    CSSFILTER,
    openUrl,
    isTauri,
    isDev,
    arrayBufferToBase64,
    cropImageToRound,
    base64Encode,
    loadingText,
    includeHtm,
    readFileAsBase64,
    getFilesName,
    rootPath,
    openSelect,
    readDirRecursively,
    replaceFileRoot,
    urlMap,
    fileSizeLimit,
    oneMessage,
    createIssue,
    checkLastPublish,
} from '@/utils/common'
import { platform } from '@tauri-apps/plugin-os'
import { getCurrentWindow } from '@tauri-apps/api/window'
import PhoneConfig from '@/components/PhoneConfig.vue'
import ImgPreview from '@/components/ImgPreview.vue'
import Building from '@/components/Building.vue'

const route = useRoute()
const router = useRouter()
const store = usePPStore()
const { t } = useI18n()
const tempIconBase64 = ref('')
const iconBase64 = ref('')
const roundIcon = ref('')
const cutVisible = ref(false)
const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const iconFileName = ref('')
const file = ref<any>(null)

const distInput = ref<any>(null)
const jsFileContents = ref('')
const configDialogVisible = ref(false)
const codeDialogVisible = ref(false)
const imgPreviewVisible = ref(false)
const warning = ref('')

// do not use same name with ref
const pubForm = reactive({
    platform: ['PakePlus-Android'],
    chip: 'macos',
    model: 'close',
    desc: '',
})

const buildLoading = ref(false)
// check dispatch workflow timer
let buildTime = reactive<any>({
    PakePlus: 0,
    'PakePlus-Android': 0,
    'PakePlus-iOS': 0,
    PWA: 0,
})

let buildTimeText = reactive<any>({
    PakePlus: '',
    'PakePlus-Android': '',
    'PakePlus-iOS': '',
    PWA: '',
})

let buildStatus = reactive<any>({
    PakePlus: '',
    'PakePlus-Android': '',
    'PakePlus-iOS': '',
    PWA: '',
})

let buildRates = reactive<any>({
    PakePlus: 0,
    'PakePlus-Android': 0,
    'PakePlus-iOS': 0,
    PWA: 0,
})

// 编译时间计时器
let buildTimer = reactive<any>({
    PakePlus: null,
    'PakePlus-Android': null,
    'PakePlus-iOS': null,
    PWA: null,
})

// 检查dispatch workflow timer
let checkDispatchTimer = reactive<any>({
    PakePlus: null,
    'PakePlus-Android': null,
    'PakePlus-iOS': null,
    PWA: null,
})

const appRules = reactive<FormRules>({
    showName: [
        {
            required: true,
            message: t('inputAppNamePlaceholder'),
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                if (
                    /^[^/\:*?"<>|\.\$\%\&\*\@\#\!\^\(\)\{\}\[\]\+\=\`\~\'\"]+$/.test(
                        value
                    )
                ) {
                    callback()
                } else {
                    callback(new Error(t('appNameInvalid')))
                }
            },
            trigger: 'blur',
        },
    ],
    url: [
        {
            required: true,
            message: t('inputWebPlaceholder'),
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                // check url start with http or https
                const uriRegex = /^(https?|ftp|file):\/\/[^\s/$.?#].[^\s]*$/i
                if (uriRegex.test(value) || value.includes('index.htm')) {
                    callback()
                } else {
                    callback(new Error(t('urlInvalid')))
                }
            },
            trigger: 'change',
        },
    ],
    appid: [
        {
            required: true,
            message: t('inputAppIdPlaceholder'),
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                // check appid must be alphanumeric and dot
                if (/^[a-zA-Z0-9.]+$/.test(value)) {
                    callback()
                } else {
                    callback(new Error(t('appIdInvalid')))
                }
            },
            trigger: 'blur',
        },
    ],
    icon: [
        {
            required: false,
            message: t('inputAppIconPlaceholder'),
            trigger: 'change',
        },
    ],
    version: [
        {
            required: true,
            message: t('inputAppVersionPlaceholder'),
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                const versionPattern = /^\d\.\d\.\d$/ // 1.8.8 or 1.9.2
                if (!versionPattern.test(value)) {
                    callback(new Error(t('versionSemVer')))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
    platform: [
        {
            required: false,
            message: t('inputPrePlatformPlaceholder'),
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: false,
            message: t('inputAppDesPlaceholder'),
            trigger: 'blur',
        },
    ],
})

// tip warning
const showWarning = () => {
    oneMessage.error(warning.value)
}

// is json config
const isJson = ref(false)
const tauriConfigRef = ref<any>(null)

// change app name
const changeAppName = (value: string) => {
    console.log('changeAppName', value)
    store.currentProject.more.windows.title = value
}

// change url
const changeUrl = (value: string) => {
    console.log('changeUrl', value)
    if (store.currentProject.isHtml) {
        store.currentProject.url = ''
        store.currentProject.more.windows.url = ''
        store.currentProject.isHtml = false
        store.currentProject.htmlFiles = []
        store.addUpdatePro(store.currentProject)
    } else {
        store.currentProject.more.windows.url = value
    }
}

// 安全区域
const safeVal = ref('all')
const safeOptions = [
    {
        value: 'all',
        label: t('ignoreAll'),
    },
    {
        value: 'top',
        label: t('ignoreTop'),
    },
    {
        value: 'bottom',
        label: t('ignoreBottom'),
    },
    {
        value: 'left',
        label: t('ignoreLeft'),
    },
    {
        value: 'right',
        label: t('ignoreRight'),
    },
]
// APP标头
const appHeaderVal = ref('default')
const appHeaderOptions = [
    {
        value: 'default',
        label: t('default'),
    },
    {
        value: 'custom',
        label: t('custom'),
    },
]

// 字体大小
const fontSizeVal = ref('16')
const fontSizeOptions = [
    {
        value: '16',
        label: '16px',
    },
    {
        value: '18',
        label: '18px',
    },
    {
        value: '20',
        label: '20px',
    },
]

// close tauri config dialog
const closeConfigDialog = (done: any = () => {}) => {
    const isJson = tauriConfigRef.value?.checkJson()
    if (isJson) {
        configDialogVisible.value = false
        done()
    } else {
        oneMessage.error(t('jsonError'))
    }
}

// close js code edit dialog
const closeJsCodeEditDialog = () => {
    codeDialogVisible.value = false
}

// icon confirm
const confirmIcon = async (base64Data: string) => {
    cutVisible.value = false
    iconBase64.value = base64Data
    store.currentProject.icon = base64Data
    roundIcon.value = await cropImageToRound(base64Data)
}

// web upload icon
const webUploadIcon = async () => {
    file.value.click()
}

const fileToBase64 = (file: any) => {
    const reader = new FileReader()
    reader.onload = async () => {
        tempIconBase64.value = reader.result as string
        cutVisible.value = true
    }
    reader.readAsDataURL(file)
}

// loadHtml
const loadHtml = async () => {
    console.log('loadHtml')
    store.currentProject.isHtml = true
    const selected = await openSelect(true, [])
    console.log('selected', selected)
    if (selected) {
        const indexHtml = await join(selected, 'index.html')
        const isExists = await exists(indexHtml)
        if (isExists) {
            const files = await readDirRecursively(selected)
            const configUrl = `index.html (${t('moreAssets')}+${files.length})`
            store.currentProject.url = configUrl
            store.currentProject.htmlPath = selected
            store.currentProject.more.windows.url = configUrl
        } else {
            oneMessage.error(t('indexHtmError'))
        }
    }
}

// tauri html file upload
const tauriHtmlUpload = async () => {
    loadingText(t('syncFileStart') + '...')
    if (store.currentProject.isHtml && store.currentProject.htmlPath) {
        const files = await readDirRecursively(store.currentProject.htmlPath)
        loadingText(t('syncFileStart') + '...')
        let total = files.length
        let count = 0
        // 读取文件内容，并替换rootPath
        for (const file of files) {
            count++
            const isExists = await exists(file)
            if (isExists) {
                const fileContent = await readFile(file)
                // limit file size
                const fileSize = fileContent.byteLength
                if (fileSize > fileSizeLimit) {
                    oneMessage.error(t('limitSize'))
                    buildLoading.value = false
                    warning.value = t('limitSize')
                    return 'stop'
                }
                const base64Content = arrayBufferToBase64(fileContent)
                const gitPath = await replaceFileRoot(
                    file,
                    store.currentProject.htmlPath
                )
                const loadingState = `<div>${count}/${total}</div>
                <div>${t('syncFilePro')}${gitPath.replace('src/', '')}</div>
                <div>${t('syncTileTips')}</div>`
                loadingText(loadingState)
                await upSrcFile(gitPath, base64Content)
            } else {
                console.log('file not exists', file)
            }
        }
    }
}

// active dist input
const activeDistInput = async () => {
    console.log('activeDistInput', isTauri)
    if (isTauri) {
        try {
            const res = await invoke('stop_server')
            console.log('stopServer', res)
        } catch (error) {
            console.error('Failed to stop server:', error)
        }
        loadHtml()
    } else {
        if (!store.token) {
            oneMessage.error(t('configToken'))
            return
        } else {
            distInput.value.click()
        }
    }
}

// stop server
const stopServer = async () => {
    if (isTauri) {
        try {
            const res = await invoke('stop_server')
            console.log('stopServer', res)
        } catch (error) {
            console.error('Failed to stop server:', error)
        }
        store.actionSecond()
    }
}

// handle file change
const handleFileChange = async (event: any) => {
    buildLoading.value = true
    store.currentProject.isHtml = true
    loadingText(t('syncFileStart') + '...')
    console.log('handleFileChange', event)
    const input = event.target as HTMLInputElement
    if (input.files) {
        const files = Array.from(input.files).filter(
            (file) => !file.name.startsWith('.')
        )
        console.log('files', files)
        // limit file size
        for (const file of files) {
            const fileSize = file.size
            if (fileSize > fileSizeLimit) {
                oneMessage.error(t('limitSize'))
                return
            }
        }
        const filePaths = getFilesName(files)
        console.log('filePaths', filePaths)
        // check if index.htm is included
        const isIncludeHtm = includeHtm(filePaths)
        console.log('isIncludeHtm', isIncludeHtm)
        loadingText(t('syncFileStart') + '...')
        if (isIncludeHtm) {
            console.log('ok')
            try {
                await uploadFiles(files)
                buildLoading.value = false
                loadingText(t('syncFileSuccess'))
                oneMessage.success(t('syncFileSuccess'))
            } catch (error: any) {
                console.error('uploadFiles error', error)
                warning.value = error.message
                buildLoading.value = false
                loadingText(t('syncFileError'))
                oneMessage.error(t('syncFileError'))
            }
            store.addUpdatePro(store.currentProject)
        } else {
            oneMessage.error(t('indexHtmError'))
            buildLoading.value = false
        }
    }
}

// 仓库是否已经存在该文件并获取sha, 不存在则创建
const upSrcFile = async (filePath: string, base64Content: string) => {
    const resSha = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        filePath,
        { ref: store.currentProject.name }
    )
    console.log('resSha', resSha)
    let params: any = {
        message: 'update src file from pakeplus',
        content: base64Content,
        sha: '',
        branch: store.currentProject.name,
    }
    if (resSha.status === 200) {
        params.sha = resSha.data.sha
    } else {
        delete params.sha
    }
    // 更新文件
    const updateRes: any = await githubApi.updateFileContent(
        store.userInfo.login,
        'PakePlus',
        filePath,
        params
    )
    console.log(`${filePath} updateRes`, updateRes)
}

// uploadFiles
const uploadFiles = async (files: any) => {
    loadingText(t('syncFileStart') + '...')
    let total = files.length
    let count = 0
    const configUrl = `index.html (${t('moreAssets')}+${total})`
    store.currentProject.url = configUrl
    store.currentProject.more.windows.url = configUrl
    for (const file of files) {
        count++
        const loadingState = `<div>${count}/${total}</div>
        <div>${t('syncFilePro')}${file.name}</div>
        <div>${t('syncTileTips')}</div>`
        loadingText(loadingState)
        // 替换根路径为 "src"
        const newFilePath = rootPath(file)
        const base64Content: string = await readFileAsBase64(file)
        store.currentProject.htmlFiles.push(newFilePath)
        await upSrcFile(newFilePath, base64Content.split('base64,')[1])
    }
}

const handleIconChange = (event: any) => {
    const file = event.target.files[0]
    // limit file size
    if (file) {
        const fileSize = file.size
        if (fileSize > fileSizeLimit) {
            oneMessage.error(t('limitSize'))
            return
        }
        fileToBase64(file)
    }
}

// delete icon
const deleteIcon = () => {
    iconBase64.value = ''
    store.currentProject.icon = ''
}

// upload icon
const uploadIcon = async () => {
    console.log('uploadIcon')
    // use tauri open api, bacause input cant seleted file type
    const selectedFilePath: any = await open({
        multiple: false,
        filters: [
            {
                name: 'Images',
                extensions: ['png', 'jpg', 'jpeg', 'webp'],
            },
        ],
    })

    if (!selectedFilePath) {
        return null
    }
    const fileName = await basename(selectedFilePath)
    iconFileName.value = fileName
    // get file name
    const binaryData = await readFile(selectedFilePath)
    // get file size
    const fileSize = binaryData.byteLength
    console.log('fileSize', fileSize)
    // limit file size
    if (fileSize > 1024 * 1024 * 10) {
        oneMessage.error(t('limitSize'))
        return
    }
    const base64Data: any = arrayBufferToBase64(binaryData)
    const base64String = 'data:image/jpg;base64,' + base64Data
    tempIconBase64.value = base64String
    // if file is not png, and size is not 512x512, then cut it
    cutVisible.value = true
}

// update icon file content
const updateIcon = async (repo: string) => {
    buildStatus[repo] = t('syncConfig') + 'icon...'
    if (iconBase64.value === '') {
        return
    }
    const iconContent = store.currentProject.iconRound
        ? roundIcon.value.split('base64,')[1]
        : iconBase64.value.split('base64,')[1]
    // get app-icon.png sha
    const iconSha: any = await githubApi.getFileSha(
        store.userInfo.login,
        repo,
        'app-icon.png',
        { ref: store.currentProject.name }
    )
    // update icon file content
    console.log('iconSha----', iconSha)
    if (iconSha.status === 200 || iconSha.status === 404) {
        const updateRes: any = await githubApi.updateIconFile(
            store.userInfo.login,
            repo,
            {
                message: 'update icon from pakeplus',
                sha: iconSha?.data?.sha,
                branch: store.currentProject.name,
                content: iconContent,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
            buildStatus[repo] = t('syncConfig') + 'icon success...'
        } else {
            console.error('updateRes error', updateRes)
            buildStatus[repo] = t('syncConfig') + 'icon error...'
        }
    }
}

const backHome = () => {
    router.push('/edit')
}

// click menu item
const toHistory = () => {
    stopServer()
    router.push('/history')
}

// more phone config
const morePhoneConfig = () => {
    // oneMessage.success(t('morePhoneConfig'))
    configDialogVisible.value = true
}

// save js file content to appDataDir
const saveJsFile = async () => {
    console.log('saveJsFile', jsFileContents.value)
    // get app data dir
    const appDataPath = await appDataDir()
    const targetDir = await join(appDataPath, 'assets')
    const savePath = await join(targetDir, `${store.currentProject.name}.js`)
    // save file
    await writeTextFile(savePath, jsFileContents.value)
    console.log(`js file saved to: ${savePath}`)
}

// save form input
const saveFormInput = async () => {
    console.log('saveFormInput', store.currentProject)
    // console.log('tauriConfig', store.currentProject.more)
    store.addUpdatePro({
        ...store.currentProject,
        name: store.currentProject.name,
        more: store.currentProject.more,
    })
    !configDialogVisible.value && tauriConfigRef.value?.updateCode()
    // save js file content to appDataDir
    if (jsFileContents.value) {
        saveJsFile()
    }
}

// save project
const saveProject = async (tips: boolean = true) => {
    // await emit('handlepay', { loggedIn: true, token: 'authToken' })
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            saveFormInput()
            if (configDialogVisible.value) {
                const isJson = tauriConfigRef.value?.checkJson()
                if (isJson) {
                    oneMessage.success(t('saveSuccess'))
                } else {
                    oneMessage.error(t('jsonError'))
                }
            } else {
                tips && oneMessage.success(t('saveSuccess'))
            }
        } else {
            console.error('error submit!', fields)
            for (const key in fields) {
                if (fields[key].length > 0) {
                    oneMessage.error(fields[key][0].message)
                    return
                }
            }
        }
    })
}

// get initialization_script(customJs+cssfilter+jsfile)
const getInitializationScript = () => {
    // creat css filter content
    let initJsScript = store.currentProject.customJs
    if (store.currentProject.filterCss !== '') {
        const cssFilterContent = store.currentProject.filterCss
            .split(';')
            .map((item: string, index: number) => {
                return `const element${index} = document.querySelector('${item}');
                if (element${index}) {
                    element${index}.style.display = 'none';
                }`
            })
            .join(';')
        console.log('cssFilterContent', cssFilterContent)
        const initCssScript = CSSFILTER.replace('CSSFILTER', cssFilterContent)
        // read js file content
        initJsScript += initCssScript
    }
    // if jsFileContents is not empty, then add initJsScript
    if (jsFileContents.value) {
        initJsScript += jsFileContents.value
    }
    return initJsScript
}

const preview = async (resize: boolean) => {
    let serverPort = 3030
    if (isTauri) {
        try {
            serverPort = await invoke('start_server', {
                path: store.currentProject.htmlPath,
            })
            console.log('Server started successfully', serverPort)
        } catch (error) {
            console.error('Failed to start server:', error)
        }
        const platformName = platform()
        // get platform
        if (
            platformName === 'windows' &&
            store.currentProject.more.windows.additionalBrowserArgs
        ) {
            oneMessage.error('additionalBrowserArgs cant preview on windows')
            return
        }
        if (
            store.previewPath === '' ||
            store.previewSecond === 60 ||
            store.previewPath === store.currentProject.htmlPath
        ) {
            console.log('html preview ok')
        } else if (
            store.previewPath !== store.currentProject.htmlPath &&
            store.previewSecond !== 60
        ) {
            console.log('html preview error')
            oneMessage.error(t('htmlError'))
            return
        } else {
            console.log('unknown preview error')
            warning.value = `path: ${store.previewPath}
            second: ${store.previewSecond}
            htmlPath: ${store.currentProject.htmlPath}`
        }
        store.setPreviewPath(store.currentProject.htmlPath)
        // if platform is macos, then use tauri preview
        appFormRef.value?.validate((valid, fields) => {
            if (valid) {
                console.log('submit!', store.currentProject.more.windows)
                saveProject(false)
                // initialization_script
                const initJsScript = getInitializationScript()
                console.log('initCssScript', initJsScript)
                invoke('preview_from_config', {
                    resize,
                    config: {
                        ...store.currentProject.more.windows,
                        label: 'PreView',
                        width: 430,
                        height: 932,
                        userAgent:
                            store.currentProject.phone.webview.userAgent ||
                            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                        url: store.currentProject.isHtml
                            ? `http://127.0.0.1:${serverPort}/index.html`
                            : store.currentProject.url,
                    },
                    jsContent: initJsScript,
                    devbug: store.currentProject.devbug,
                })
            } else {
                console.error('error submit!', fields)
            }
        })
    } else {
        oneMessage.error(t('notSupportWeb'))
    }
}

const creatBuild = async () => {
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            saveProject(false)
            centerDialogVisible.value = true
        } else {
            console.error('error submit!', fields)
        }
    })
}

// update build.yml file content
const updateCustomJs = async (repo: string, jsPath: string) => {
    buildStatus[repo] = t('syncConfig') + 'custom...'
    // get CargoToml file sha
    const shaRes: any = await githubApi.getFileSha(
        store.userInfo.login,
        repo,
        jsPath,
        {
            ref: store.currentProject.name,
        }
    )
    console.log('get custom file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const initJsScript = getInitializationScript()
        const jsFileContent: any = base64Encode(initJsScript)
        const updateRes: any = await githubApi.updateFileContent(
            store.userInfo.login,
            repo,
            jsPath,
            {
                message: 'update custom js from pakeplus',
                content: jsFileContent,
                sha: shaRes?.data?.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateCustomJs', updateRes)
            buildStatus[repo] = t('syncConfig') + '...'
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updatePPconfig = async (repo: string) => {
    buildStatus[repo] = t('syncConfig') + 'ppconfig...'
    // get CargoToml file sha
    const shaRes: any = await githubApi.getFileSha(
        store.userInfo.login,
        repo,
        'scripts/ppconfig.json',
        {
            ref: store.currentProject.name,
        }
    )
    console.log('get ppconfig file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        console.log('updatePPconfig------', store.ppConfig)
        // get CargoToml file content
        const configContent: any = base64Encode(JSON.stringify(store.ppConfig))
        // update config file
        const updateRes: any = await githubApi.updateFileContent(
            store.userInfo.login,
            repo,
            'scripts/ppconfig.json',
            {
                message: 'update ppconfig from pakeplus',
                content: configContent,
                sha: shaRes?.data?.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updatePPconfig', updateRes)
            buildStatus[repo] = t('syncConfig') + '...'
        } else {
            console.error('updatePPconfig error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// new publish version
const publishPhone = async () => {
    if (store.token === '') {
        oneMessage.error(t('configToken'))
        return
    } else if (checkLastPublish()) {
        oneMessage.error(t('limitProject'))
        return
    }
    centerDialogVisible.value = false
    buildLoading.value = true
    pubForm.platform.forEach(async (repo: string) => {
        buildStatus[repo] = t('preCheck') + '...'
        try {
            // delete release
            store.isRelease && (await store.deleteRelease(repo))
            // publish web or dist
            buildStatus[repo] = t('syncConfig') + '...'
            // if (isTauri) {
            //     const res = await tauriHtmlUpload()
            //     if (res === 'stop') {
            //         return
            //     }
            // }
            // update app icon
            await updateIcon(repo)
            // update custom.js
            if (repo === 'PakePlus-Android') {
                await updateCustomJs(repo, 'app/src/main/assets/custom.js')
            } else {
                await updateCustomJs(repo, 'PakePlus/custom.js')
            }
            // update ppconfig.json
            await updatePPconfig(repo)
            // dispatch action
            await dispatchAction(repo)
        } catch (error: any) {
            warning.value = error.message
            buildTime[repo] = 0
            loadingText(t('failure'))
            buildLoading.value = false
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                'PakePlus publish action error ' + error.message,
                'failure',
                'build error',
                repo
            )
            ElMessageBox.confirm(t('publishErrorTips'), t('publishError'), {
                confirmButtonText: t('confirm'),
                type: 'warning',
                center: true,
                showCancelButton: false,
            }).finally(() => {
                openUrl(urlMap.questiondoc)
            })
        }
    })
}

// dispatch workflow action
const dispatchAction = async (repo: string) => {
    buildStatus[repo] = t('preCompile') + 'workflow...'
    // wait file sync
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const dispatchRes: any = await githubApi.dispatchWorkflow(
        store.userInfo.login,
        repo,
        {
            ref: store.currentProject.name,
        }
    )
    if (dispatchRes.status !== 204) {
        console.error('dispatch res error', dispatchRes)
        const message = dispatchRes.data
            ? dispatchRes.data.message
            : dispatchRes.status
        warning.value = t('dispatchError') + ':' + message
        oneMessage.error(warning.value)
        buildLoading.value = false
        createIssue(
            store.currentProject.name,
            store.currentProject.showName,
            store.currentProject.isHtml,
            'PakePlus dispatch error ' + message,
            'failure',
            'build error',
            'PakePlus'
        )
        throw new Error(t('dispatchError') + ': ' + message)
    } else {
        buildStatus[repo] = t('inProgress') + '...'
        buildTimer[repo] = setInterval(() => {
            buildTime[repo] += 1
            const minute = Math.floor(buildTime[repo] / 60)
            const second = buildTime[repo] % 60
            buildTimeText[repo] = `${minute}${t('minute')}${second}${t(
                'second'
            )}`
            const buildRate = Math.floor((buildTime[repo] / (60 * 10)) * 100)
            buildRates[repo] = buildRate > 99 ? 99 : buildRate
        }, 1000)
        // check build status
        setTimeout(async () => {
            checkDispatchTimer[repo] = setInterval(async () => {
                checkBuildStatus(repo)
            }, 1000 * 5)
        }, 1000 * 60 * 2)
    }
}

// rerun fails jobs
let rerunCounts: any = {
    PakePlus: 0,
    'PakePlus-Android': 0,
    'PakePlus-iOS': 0,
    PWA: 0,
}
const reRunFailsJobs = async (repo: string, id: number, html_url: string) => {
    rerunCounts[repo] += 1
    if (rerunCounts[repo] >= 3) {
        console.log('rerun cancel', rerunCounts[repo])
        buildTimer[repo] && clearInterval(buildTimer[repo])
        checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
        warning.value = 'rerun cancel and rerun count > 3'
        createIssue(
            store.currentProject.name,
            store.currentProject.showName,
            store.currentProject.isHtml,
            html_url,
            'failure',
            'build error',
            repo
        )
        openUrl(html_url)
        loadingText(t('failure'))
    } else {
        const rerunRes: any = await githubApi.rerunFailedJobs(
            store.userInfo.login,
            repo,
            id
        )
        // 201 is success 403 is running
        if (rerunRes.status === 201 || rerunRes.status === 403) {
            console.log('rerun success')
        } else {
            reRunFailsJobs(repo, id, html_url)
        }
        await new Promise((resolve) => setTimeout(resolve, 10000))
    }
}

// check build workflow status
const checkBuildStatus = async (repo: string) => {
    const checkRes: any = await githubApi.getWorkflowRuns(
        store.userInfo.login,
        repo,
        {
            branch: store.currentProject.name,
            event: 'workflow_dispatch',
        }
    )
    const build_runs = checkRes.data.workflow_runs[0]
    const { id, status, conclusion, html_url } = build_runs
    console.log('buildStatus', repo, status)
    buildStatus[repo] = t(status) || t('inProgress')
    console.log('checkBuildStatus', build_runs)
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        if (status === 'completed' && conclusion === 'success') {
            // clear timer
            buildTimer[repo] && clearInterval(buildTimer[repo])
            checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
            const now = new Date()
            localStorage.setItem('lastClickTime', now.toISOString())
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'success',
                'build success',
                repo
            )
            await new Promise((resolve) => setTimeout(resolve, 3000))
            store.setCurrentRelease()
            buildStatus[repo] = t('buildSuccess')
            buildRates[repo] = 100
            // buildLoading.value = false
            // buildTime = 0
            // router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            // clear interval
            buildTimer[repo] && clearInterval(buildTimer[repo])
            checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'cancelled',
                'build cancelled',
                repo
            )
            buildStatus[repo] = t('cancelled')
            // buildLoading.value = false
            // buildTime = 0
        } else if (status === 'failure' || conclusion === 'failure') {
            reRunFailsJobs(repo, id, html_url)
        } else if (status === 'completed' && conclusion === 'failure') {
            reRunFailsJobs(repo, id, html_url)
        } else if (status === 'in_progress') {
            console.log('build in progress...')
        } else {
            buildTimer[repo] && clearInterval(buildTimer[repo])
            checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'unknown',
                'build unknown ' + status,
                'PakePlus'
            )
            buildLoading.value = false
            buildTime = 0
        }
    } else {
        if (rerunCounts[repo] >= 2) {
            // buildTime = 0
            // buildLoading.value = false
            buildTimer[repo] && clearInterval(buildTimer[repo])
            checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
            openUrl(html_url)
            // loadingText(t('failure'))
            buildStatus[repo] = t('failure')
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'failure',
                'build error',
                repo
            )
            ElMessageBox.confirm(t('publishErrorTips'), t('publishError'), {
                confirmButtonText: t('confirm'),
                type: 'warning',
                center: true,
            }).finally(() => {
                openUrl(urlMap.questiondoc)
            })
        } else {
            reRunFailsJobs(repo, id, html_url)
        }
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    // Check if Command (Meta) + S is pressed
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        saveProject()
    }
}

onUnmounted(() => {
    stopServer()
    window.removeEventListener('keydown', handleKeydown)
    // clear interval
    Object.keys(buildTimer).forEach((repo) => {
        buildTimer[repo] && clearInterval(buildTimer[repo])
        checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
    })
    // clear checkDispatchTimer
    Object.keys(checkDispatchTimer).forEach((repo) => {
        checkDispatchTimer[repo] && clearInterval(checkDispatchTimer[repo])
    })
})

onMounted(async () => {
    window.addEventListener('keydown', handleKeydown)
    // 重制编译时间
    buildTime.PakePlus = 0
    buildTime['PakePlus-Android'] = 0
    buildTime['PakePlus-iOS'] = 0
    buildTime['PWA'] = 0
    if (store.currentProject.icon) {
        confirmIcon(store.currentProject.icon)
    }
    if (isTauri) {
        // initJsFileContents()
        const window = getCurrentWindow()
        window.setTitle(`${store.currentProject.name}`)
    }
    console.log('route.query', route.query)
    const delrelease = route.query.delrelease
    if (delrelease) {
        store.setRelease(store.currentProject.name, { id: 0 })
    } else {
        store.setCurrentRelease()
    }
    if (store.currentProject.isHtml) {
        store.currentProject.url = ''
        oneMessage.warning(t('phoneHtmlNo'))
    }
})
</script>

<style lang="scss" scoped>
.editBox {
    padding: 10px 20px;

    .configHeader {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard syntax */

        .titleText {
            margin-right: 4px;
            cursor: default;
        }

        .switchIcon {
            cursor: pointer !important;
        }

        .titleLine {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;

        .headerTitle {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .backBox {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;

                &:hover {
                    font-weight: bold;
                }
            }
        }

        .toolTips {
            color: gray;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 2px;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .tipsIcon {
                margin-left: 6px;
                cursor: pointer;
            }

            .document {
                width: 20px;
                height: 20px;
                font-size: 18px;
                margin-left: 10px;
                cursor: pointer;
                &:hover {
                    color: var(--text-color);
                }
            }
        }

        .setting {
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            z-index: 1000;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .warning {
                color: red;
                margin-right: 20px;
                cursor: pointer;
            }

            .publish {
                color: var(--el-color-primary);
                margin-right: 20px;
                cursor: pointer;
            }

            .desktop {
                color: gray;
                cursor: pointer;

                &:hover {
                    color: var(--text-color);
                }
            }

            .dropdownLink {
                color: gray;
                cursor: pointer;

                &:hover {
                    color: var(--text-color);
                }
            }
        }

        .headerTool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            cursor: default;

            .control {
                color: #2a598a;
                cursor: pointer;
            }
        }
    }

    .mainEdit {
        padding: 10px 10px;

        .configForm {
            margin-top: 10px;

            .inLine {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .formItem {
                    flex: 1;
                    margin-right: 10px;

                    .initIcon {
                        width: 22px;
                        height: 22px;
                        cursor: pointer;
                    }

                    .distUpload {
                        cursor: pointer;

                        &:hover {
                            color: var(--text-color);
                        }
                    }

                    .editIcon {
                        cursor: pointer;
                        font-size: 20px;
                        color: gray;

                        &:hover {
                            color: var(--text-color);
                        }
                    }

                    .iconChange {
                        width: 22px;
                        height: 22px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        .closeIcon {
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            cursor: pointer;
                        }
                    }

                    .iconPreview {
                        width: 22px;
                        height: 22px;
                        color: gray;
                        border: 1px dashed gray;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        &:hover {
                            color: var(--text-color);
                            border-color: var(--text-color);
                        }
                    }
                }
            }

            .checkBox {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .formItem {
                    flex: unset;
                    margin-right: 5px;
                }
            }

            .divider {
                margin: 0 10px;
                font-size: 10px;
                font-weight: 300;
            }

            .rotateIcon {
                font-size: 22px;
                margin-left: 20px;
                cursor: pointer;
                color: gray;
                user-select: none;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */

                &:hover {
                    color: var(--text-color);
                }
            }
        }
    }

    .footerBox {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 10px 0;
    }
}

.diaHeader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
}
</style>

<style scoped>
:deep(.iconInput .el-input__inner) {
    cursor: pointer !important;
}

:deep(.jsSelect .el-select__input-wrapper) {
    display: none !important;
}
</style>
