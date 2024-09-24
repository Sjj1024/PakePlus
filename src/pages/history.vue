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
                    <span>PakePlus v0.1.2</span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ releaseData.body }}
                    </span>
                </div>
            </div>
            <!-- 设置按钮 -->
            <div class="setting">
                <!-- <span class="userName">更多</span> -->
                <!-- <el-icon :size="26"><Menu /></el-icon> -->
                <el-icon :size="26"><Delete /></el-icon>
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
        <div>
            <el-table :data="releaseData.assets" style="width: 100%">
                <el-table-column prop="name" label="资源名称" width="380" />
                <el-table-column prop="size" label="资源大小" width="180" />
                <el-table-column prop="updated_at" label="发布日期" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { usePakeStore } from '@/store'
import githubApi from '@/apis/github'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = usePakeStore()

// back
const backHome = () => {
    router.push('/edit')
}

const releaseData = ref({
    url: 'https://api.github.com/repos/codegirle/PakePlus/releases/176366612',
    assets_url:
        'https://api.github.com/repos/codegirle/PakePlus/releases/176366612/assets',
    upload_url:
        'https://uploads.github.com/repos/codegirle/PakePlus/releases/176366612/assets{?name,label}',
    html_url: 'https://github.com/codegirle/PakePlus/releases/tag/ewewer',
    id: 176366612,
    author: {
        login: 'github-actions[bot]',
        id: 41898282,
        node_id: 'MDM6Qm90NDE4OTgyODI=',
        avatar_url: 'https://avatars.githubusercontent.com/in/15368?v=4',
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
        repos_url: 'https://api.github.com/users/github-actions%5Bbot%5D/repos',
        events_url:
            'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
        received_events_url:
            'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
        type: 'Bot',
        site_admin: false,
    },
    node_id: 'RE_kwDOM1oqhs4KgyQU',
    tag_name: 'ewewer',
    target_commitish: 'fdfcbfd0e7022842ccbdedecd137060849d61d3b',
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
    tarball_url:
        'https://api.github.com/repos/codegirle/PakePlus/tarball/ewewer',
    zipball_url:
        'https://api.github.com/repos/codegirle/PakePlus/zipball/ewewer',
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

// 打包后的历史记录
onMounted(() => {
    getLatestRelease()
})
</script>

<style lang="scss" scoped>
.historyBox {
    padding: 10px;

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
</style>
