<template>
    <div class="tauriConfig">
        <!-- json config -->
        <el-scrollbar v-if="isJson" class="jsonInput">
            <Codemirror
                v-model="uiCode"
                :options="cmOptions"
                :extensions="localTheme === 'dark' ? extensions : []"
                :style="{ height: '100%' }"
                class="codebox"
                @change="codeChange"
            ></Codemirror>
        </el-scrollbar>
        <!-- ui config -->
        <el-collapse v-else v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template #title>
                    Windows
                    <el-icon
                        class="infoLink"
                        @click.stop="openUrl(urlMap.windowsConfig)"
                    >
                        <InfoFilled />
                    </el-icon>
                </template>
                <div class="windowsConfig">
                    <el-form
                        :model="store.currentProject.more"
                        label-width="auto"
                        class="configForm"
                    >
                        <div class="lineBool">
                            <el-form-item label="minWidth" prop="minWidth">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        store.currentProject.more.windows
                                            .minWidth
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="minHeight" prop="minHeight">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        store.currentProject.more.windows
                                            .minHeight
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="maxWidth" prop="maxWidth">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        store.currentProject.more.windows
                                            .maxWidth
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="maxHeight" prop="maxHeight">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        store.currentProject.more.windows
                                            .maxHeight
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item
                                label="dragDropEnabled"
                                prop="dragDropEnabled"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .dragDropEnabled
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="center" prop="center">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows.center
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="closable" prop="closable">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .closable
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="resizable" prop="resizable">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .resizable
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="fullscreen" prop="fullscreen">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .fullscreen
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="focus" prop="focus">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows.focus
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="transparent"
                                prop="transparent"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .transparent
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="maximized" prop="maximized">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .maximized
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="visible" prop="visible">
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .visible
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="decorations"
                                prop="decorations"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .decorations
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="alwaysOnTop"
                                prop="alwaysOnTop"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .alwaysOnTop
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="contentProtected"
                                prop="contentProtected"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .contentProtected
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="skipTaskbar"
                                prop="skipTaskbar"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .skipTaskbar
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="maximizable"
                                prop="maximizable"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .maximizable
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="minimizable"
                                prop="minimizable"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .minimizable
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="acceptFirstMouse"
                                prop="acceptFirstMouse"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .acceptFirstMouse
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="hiddenTitle"
                                prop="hiddenTitle"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.more.windows
                                            .hiddenTitle
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item
                                label="TauriApi"
                                prop="tauriApi"
                                class="formItem"
                            >
                                <el-checkbox
                                    v-model="
                                        store.currentProject.desktop.tauriApi
                                    "
                                    label=""
                                />
                            </el-form-item>
                            <el-form-item label="theme:">
                                <el-select
                                    v-model="
                                        store.currentProject.more.windows.theme
                                    "
                                    placeholder="theme"
                                    class="themeSel"
                                >
                                    <el-option label="Light" value="Light" />
                                    <el-option label="Dark" value="Dark" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="titleBarStyle:">
                                <el-select
                                    v-model="
                                        store.currentProject.more.windows
                                            .titleBarStyle
                                    "
                                    placeholder="titleBarStyle"
                                    class="themeSel"
                                >
                                    <el-option
                                        label="Visible"
                                        value="Visible"
                                    />
                                    <el-option
                                        label="Transparent"
                                        value="Transparent"
                                    />
                                    <el-option
                                        label="Overlay"
                                        value="Overlay"
                                    />
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-form-item
                            label="proxyUrl"
                            prop="proxyUrl"
                            class="formItem"
                        >
                            <el-input
                                v-model="
                                    store.currentProject.more.windows.proxyUrl
                                "
                                autocomplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                placeholder="proxyUrl"
                            />
                        </el-form-item>
                        <el-form-item
                            label="userAgent"
                            prop="userAgent"
                            class="formItem"
                        >
                            <el-input
                                v-model="
                                    store.currentProject.more.windows.userAgent
                                "
                                autocomplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                placeholder="userAgent"
                            />
                        </el-form-item>
                        <el-form-item
                            label="tabbingIdentifier"
                            prop="tabbingIdentifier"
                            class="formItem"
                        >
                            <el-input
                                v-model="
                                    store.currentProject.more.windows
                                        .tabbingIdentifier
                                "
                                autocomplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                placeholder="tabbingIdentifier"
                            />
                        </el-form-item>
                        <el-form-item
                            label="additionalBrowserArgs"
                            prop="additionalBrowserArgs"
                            class="formItem"
                        >
                            <el-input
                                v-model="
                                    store.currentProject.more.windows
                                        .additionalBrowserArgs
                                "
                                autocomplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                placeholder="additionalBrowserArgs"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>
            <el-collapse-item title="cli" name="2" disabled>
                <div>
                    Operation feedback: enable the users to clearly perceive
                    their operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or
                    rearranging elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item title="bundle" name="3" disabled>
                <div>
                    Simplify the process: keep operating process simple and
                    intuitive;
                </div>
                <div>
                    Definite and clear: enunciate your intentions clearly so
                    that the users can quickly understand and make decisions;
                </div>
                <div>
                    Easy to identify: the interface should be straightforward,
                    which helps the users to identify and frees them from
                    memorizing and recalling.
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { openUrl, urlMap } from '@/utils/common'
import { ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { usePPStore } from '@/store'
import { useI18n } from 'vue-i18n'

const store = usePPStore()
const { t } = useI18n()
const activeName = ref('1')
const localTheme = localStorage.getItem('theme') || 'dark'

const props = defineProps({
    isJson: {
        type: Boolean,
        required: true,
    },
})

// init ui code
const uiCode = ref(JSON.stringify(store.currentProject.more, null, 2))

// extensions
const extensions: any = [json(), oneDark]

const cmOptions = ref({
    tabSize: 4,
    mode: 'text/json',
    lineNumbers: true,
    line: true,
})

const codeChange = (code: string) => {
    try {
        const codeObj = JSON.parse(code)
        console.log('codeChange codeObj', codeObj)
        store.updateTauriConfig(codeObj)
    } catch (error) {
        console.error('codeChange error!', error)
    }
}

const updateCode = () => {
    console.log('updateCode!')
    uiCode.value = JSON.stringify(store.currentProject.more, null, 2)
}

const checkJson = () => {
    try {
        let codeObj = {}
        if (props.isJson) {
            codeObj = JSON.parse(uiCode.value)
        } else {
            codeObj = store.currentProject.more
        }
        console.log('checkJson codeObj', codeObj)
        store.updateTauriConfig(codeObj)
        return true
    } catch (error) {
        console.error('checkJson error!', error)
        return false
    }
}

defineExpose({
    updateCode,
    checkJson,
})
</script>

<style scoped lang="scss">
.tauriConfig {
    width: 100%;
    height: 100%;

    .jsonInput {
        width: 100%;
        height: 400px;
        overflow-x: hidden;

        .codebox {
            overflow-x: hidden;
        }
    }

    .infoLink {
        margin-left: 6px;
    }

    .windowsConfig {
        width: 100%;

        .configForm {
            width: 100%;

            :deep(.el-form-item--label-right) {
                margin-bottom: 6px !important;
            }

            .inLine {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                :deep(.el-form-item__label-wrap) {
                    margin-left: 0px !important;
                }

                :deep(.el-form-item__label) {
                    padding: 0px 2px 0px 0px !important;
                }
            }

            .flexLeft {
                justify-content: flex-start;

                :deep(.el-form-item--label-right) {
                    margin-right: 10px;
                }
            }

            .formItem {
                :deep(.el-form-item__label-wrap) {
                    margin-left: 0px !important;
                }
            }

            .lineBool {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;

                :deep(.el-form-item__label) {
                    padding: 0px 2px 0px 0px !important;
                }

                :deep(.el-form-item--label-right) {
                    margin-right: 10px !important;
                }

                :deep(.el-form-item__label-wrap) {
                    margin-left: 0px !important;
                }
            }
        }
    }
}

.themeSel {
    width: 100px;
}
</style>
