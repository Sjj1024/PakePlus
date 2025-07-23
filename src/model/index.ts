interface Project {
    id?: string
    name: string
    url: string
    showName: string
    appid: string
    icon: string
    version: string
    platform: string
    width: number
    height: number
    desc: string
    debug: string | boolean
    jsFile: string[]
    filterCss: string
    isHtml?: boolean
    created_at?: string
    updated_at?: string
    desktop?: {
        desc?: string
        [key: string]: any
    }
    android?: {
        pubBody?: string
        debug?: boolean
        [key: string]: any
    }
    ios?: {
        [key: string]: any
    }
}

interface PlatformInfo {
    name: string
    userAgent: string
    platform: 'desktop' | 'ios' | 'android'
    width: number
    height: number
    direction: 'horizontal' | 'vertical'
}

interface Release {
    url: string
    assets_url: string
    upload_url: string
    html_url: string
    id: number
    node_id: string
    tag_name: string
    target_commitish: string
    name: string
    draft: boolean
    prerelease: boolean
    created_at: string
    published_at: string
    assets: ReleaseAsset[]
    tarball_url: string
    zipball_url: string
    body: string
}

interface ReleaseAsset {
    id: number
    name: string
    label?: string
    content_type: string
    size: number
    download_count: number
    created_at: string
    updated_at: string
    browser_download_url: string
}

interface UserInfo {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string
    company?: string
    blog?: string
    location?: string
    email?: string
    hireable?: boolean
    bio?: string
    twitter_username?: string
    notification_email?: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}

interface APIResponse<T = any> {
    status: number
    data: T
    message?: string
}
