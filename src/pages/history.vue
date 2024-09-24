<template>
    <div class="historyBox">
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <div class="backBox" @click="backHome">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>返回</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span>{{ releaseData.tag_name }} v0.1.2</span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ releaseData.body }}
                        <!-- 开源免费创建，编辑，调试打包跨平台APP，仅仅只需要一个Token -->
                    </span>
                </div>
            </div>
            <!-- 设置按钮 -->
            <div class="setting">
                <!-- <span class="userName">更多</span> -->
                <!-- <el-icon :size="26"><Menu /></el-icon> -->
                <el-icon :size="26" @click="deleteRelease"><Delete /></el-icon>
                <!-- <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-icon :size="26"><Operation /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item> 发布历史 </el-dropdown-item>
                            <el-dropdown-item> 重制配置 </el-dropdown-item>
                            <el-dropdown-item> 删除项目 </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown> -->
            </div>
        </div>
        <!-- only get latest version by tag name -->
        <el-table :data="releaseData.assets" style="width: 100%">
            <!-- <el-table-column prop="name" label="资源名称" width="380" /> -->
            <el-table-column label="资源名称" width="460">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span @click="copyDownlink(scope.row)" class="fileLink">
                            {{ scope.row.name }}
                        </span>
                        <span class="copyLink" @click="openDownlink(scope.row)">
                            下载
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="资源大小" width="120">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>
                            {{ (scope.row.size / 1024 / 1024).toFixed(2) }}
                            MB
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="发布日期" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePakeStore } from '@/store'
import githubApi from '@/apis/github'
import { ElMessage, ElMessageBox } from 'element-plus'
import { open } from '@tauri-apps/api/shell'
import { writeText } from '@tauri-apps/api/clipboard'

const router = useRouter()
const store = usePakeStore()

// back
const backHome = () => {
    router.go(-1)
}

const releaseData = ref({
    url: '',
    assets_url: '',
    upload_url: '',
    html_url: '',
    id: 1,
    node_id: '',
    tag_name: 'ewewer',
    target_commitish: '',
    name: 'PakePlus v0.0.9',
    draft: false,
    prerelease: false,
    created_at: '2024-09-23T10:46:29Z',
    published_at: '2024-09-23T10:48:30Z',
    assets: [
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194344310',
            id: 194344310,
            node_id: 'RA_kwDOM1oqhs4LlXV2',
            name: 'bilibili-0.0.9-1.x86_64.rpm',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 2403329,
            download_count: 0,
            created_at: '2024-09-23T10:51:34Z',
            updated_at: '2024-09-23T10:51:34Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili-0.0.9-1.x86_64.rpm',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194343776',
            id: 194343776,
            node_id: 'RA_kwDOM1oqhs4LlXNg',
            name: 'bilibili_0.0.9_aarch64.dmg',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 3027037,
            download_count: 0,
            created_at: '2024-09-23T10:48:30Z',
            updated_at: '2024-09-23T10:48:31Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_0.0.9_aarch64.dmg',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194344311',
            id: 194344311,
            node_id: 'RA_kwDOM1oqhs4LlXV3',
            name: 'bilibili_0.0.9_amd64.AppImage',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 71898304,
            download_count: 0,
            created_at: '2024-09-23T10:51:34Z',
            updated_at: '2024-09-23T10:51:36Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_0.0.9_amd64.AppImage',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194344309',
            id: 194344309,
            node_id: 'RA_kwDOM1oqhs4LlXV1',
            name: 'bilibili_0.0.9_amd64.deb',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 2405404,
            download_count: 0,
            created_at: '2024-09-23T10:51:33Z',
            updated_at: '2024-09-23T10:51:34Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_0.0.9_amd64.deb',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194344735',
            id: 194344735,
            node_id: 'RA_kwDOM1oqhs4LlXcf',
            name: 'bilibili_0.0.9_x64-setup.exe',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 1678289,
            download_count: 0,
            created_at: '2024-09-23T10:53:55Z',
            updated_at: '2024-09-23T10:53:56Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_0.0.9_x64-setup.exe',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194344733',
            id: 194344733,
            node_id: 'RA_kwDOM1oqhs4LlXcd',
            name: 'bilibili_0.0.9_x64_en-US.msi',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 2600960,
            download_count: 0,
            created_at: '2024-09-23T10:53:55Z',
            updated_at: '2024-09-23T10:53:55Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_0.0.9_x64_en-US.msi',
        },
        {
            url: 'https://api.github.com/repos/codegirle/PakePlus/releases/assets/194343777',
            id: 194343777,
            node_id: 'RA_kwDOM1oqhs4LlXNh',
            name: 'bilibili_aarch64.app.tar.gz',
            label: '',
            uploader: {
                login: 'github-actions[bot]',
                id: 41898282,
                node_id: 'MDM6Qm90NDE4OTgyODI=',
                avatar_url:
                    'https://avatars.githubusercontent.com/in/15368?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/github-actions%5Bbot%5D',
                html_url: 'https://github.com/apps/github-actions',
                followers_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/followers',
                following_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
                organizations_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
                repos_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/repos',
                events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
                type: 'Bot',
                site_admin: false,
            },
            content_type: 'application/zip',
            state: 'uploaded',
            size: 2569924,
            download_count: 0,
            created_at: '2024-09-23T10:48:31Z',
            updated_at: '2024-09-23T10:48:32Z',
            browser_download_url:
                'https://github.com/codegirle/PakePlus/releases/download/ewewer/bilibili_aarch64.app.tar.gz',
        },
    ],
    tarball_url: '',
    zipball_url: '',
    body: 'See the assets to download and install this version.',
})

// get latest release assets by tag name
const getLatestRelease = async () => {
    const releaseRes: any = await githubApi.getReleasesAssets(
        store.userInfo.login,
        'PakePlus',
        'ewewer'
    )
    console.log('releaseRes', releaseRes)
    if (releaseRes.status === 200) {
        releaseData.value = releaseRes.data
    } else {
        console.log('releaseRes error', releaseRes)
        ElMessage.error('获取发布历史失败')
    }
}

// delete release
const deleteRelease = async () => {
    ElMessageBox.confirm('确定要删除这个版本吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        console.log('delete project')
    })
}

// open downlink by chrome
const openDownlink = async (asset: any) => {
    await open(asset.browser_download_url)
}

// copy downlink
const copyDownlink = async (asset: any) => {
    await writeText(asset.browser_download_url)
    ElMessage.success('复制成功')
}

// 打包后的历史记录
onMounted(() => {
    getLatestRelease()
})
</script>

<style lang="scss" scoped>
.historyBox {
    padding: 20px;

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .headerTitle {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .backBox {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                // color: var(--el-text-color-regular);
                cursor: pointer;
            }
        }

        .toolTips {
            color: gray;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 2px;

            .tipsIcon {
                margin-left: 6px;
                cursor: pointer;
            }
        }

        .setting {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            // margin-right: 10px;
            .userName {
                margin-right: 6px;
            }
        }

        .headerTool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .control {
                color: #2a598a;
                cursor: pointer;
            }
        }
    }
}

.fileLink {
    color: #0969da;
    cursor: pointer;
    // font-weight: bold;

    &:hover {
        text-decoration: underline;
        text-decoration-color: #0969da;
        text-underline-offset: 1px;
    }
}

.copyLink {
    margin-left: 10px;
    cursor: pointer;
    color: #0969da;
    &:hover {
        color: #1163c1;
        font-weight: bold;
    }
}
</style>
