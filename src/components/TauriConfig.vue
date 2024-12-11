<template>
    <div class="tauriConfig">
        <!-- json config -->
        <div v-if="isJson" class="jsonInput">
            <Codemirror
                v-model="uiCode"
                :options="cmOptions"
                :extensions="localTheme === 'dark' ? extensions : []"
                :style="{ height: '100%' }"
                @change="codeChange"
            ></Codemirror>
        </div>
        <!-- ui config -->
        <el-collapse v-else v-model="activeName" accordion>
            <el-collapse-item title="windows" name="1">
                <div class="windowsConfig">
                    <el-form
                        :model="tauriConfig.windows"
                        label-width="auto"
                        class="configForm"
                    >
                        <div class="inLine">
                            <el-form-item label="minWidth" prop="size">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        tauriConfig.windows.minWidth
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="minHeight" prop="size">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        tauriConfig.windows.minHeight
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="maxWidth" prop="size">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        tauriConfig.windows.maxWidth
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                            <el-form-item label="maxHeight" prop="size">
                                <el-input
                                    type="number"
                                    v-model.number="
                                        tauriConfig.windows.maxHeight
                                    "
                                    style="width: 80px"
                                />
                            </el-form-item>
                        </div>
                        <div class="lineBool">
                            <el-form-item label="fileDropEnabled" prop="size">
                                <el-checkbox
                                    v-model="
                                        tauriConfig.windows.fileDropEnabled
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="center" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.center"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="closable" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.closable"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="resizable" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.resizable"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="fullscreen" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.fullscreen"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="focus" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.focus"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="transparent" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.transparent"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="maximized" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.maximized"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                        </div>
                        <div class="lineBool">
                            <el-form-item label="decorations" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.decorations"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="alwaysOnTop" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.alwaysOnTop"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="contentProtected" prop="size">
                                <el-checkbox
                                    v-model="
                                        tauriConfig.windows.contentProtected
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="skipTaskbar" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.skipTaskbar"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="maximizable" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.maximizable"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="minimizable" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.minimizable"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                        </div>
                        <div class="inLine">
                            <el-form-item label="acceptFirstMouse" prop="size">
                                <el-checkbox
                                    v-model="
                                        tauriConfig.windows.acceptFirstMouse
                                    "
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="visible" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.visible"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="hiddenTitle" prop="size">
                                <el-checkbox
                                    v-model="tauriConfig.windows.hiddenTitle"
                                    name="type"
                                >
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item label="theme:">
                                <el-select
                                    v-model="tauriConfig.windows.theme"
                                    placeholder="theme"
                                    class="themeSel"
                                >
                                    <el-option label="Light" value="Light" />
                                    <el-option label="Dark" value="Dark" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="titleBarStyle:">
                                <el-select
                                    v-model="tauriConfig.windows.titleBarStyle"
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
                            label="tabbingIdentifier"
                            prop="tabbingIdentifier"
                            class="formItem"
                        >
                            <el-input
                                v-model="tauriConfig.windows.tabbingIdentifier"
                                autocomplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                placeholder="tabbingIdentifier"
                            />
                        </el-form-item>
                    </el-form>
                    <el-form-item
                        label="additionalBrowserArgs"
                        prop="additionalBrowserArgs"
                        class="formItem"
                    >
                        <el-input
                            v-model="tauriConfig.windows.additionalBrowserArgs"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            placeholder="additionalBrowserArgs"
                        />
                    </el-form-item>
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
import { ref } from 'vue'

const activeName = ref('1')
const localTheme = localStorage.getItem('theme')

const props = defineProps({
    isJson: {
        type: Boolean,
        required: true,
    },
})

const tauriConfig = defineModel('tauriConfig', {
    required: true,
    type: Object,
})

const uiCode = ref(JSON.stringify(tauriConfig.value, null, 2))
const extensions: any = [json(), oneDark]

const cmOptions = ref({
    tabSize: 4,
    mode: 'text/json',
    lineNumbers: true,
    line: true,
})

const codeChange = (code: string) => {
    console.log('codeChange!', code)
    try {
        const codeObj = JSON.parse(code)
        console.log('codeObj', codeObj)
        Object.assign(tauriConfig.value, codeObj)
    } catch (error) {
        console.error('codeChange error!', error)
    }
}

const updateCode = () => {
    console.log('updateCode!')
    uiCode.value = JSON.stringify(tauriConfig.value, null, 2)
}

defineExpose({
    updateCode,
})
</script>

<style scoped lang="scss">
.tauriConfig {
    width: 100%;
    height: 100%;

    .jsonInput {
        width: 100%;
        height: 400px;
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

                .themeSel {
                    width: 100px;
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
</style>
