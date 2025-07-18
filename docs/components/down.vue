<template>
    <div class="downBox">
        <div class="title">Which version should I use?</div>
        <div class="platform mac">
            <div class="leftIcon">
                <svg
                    t="1742708135449"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2554"
                    width="200"
                    height="200"
                >
                    <path
                        d="M849.124134 704.896288c-1.040702 3.157923-17.300015 59.872622-57.250912 118.190843-34.577516 50.305733-70.331835 101.018741-126.801964 101.909018-55.532781 0.976234-73.303516-33.134655-136.707568-33.134655-63.323211 0-83.23061 32.244378-135.712915 34.110889-54.254671 2.220574-96.003518-54.951543-130.712017-105.011682-70.934562-102.549607-125.552507-290.600541-52.30118-416.625816 36.040844-63.055105 100.821243-103.135962 171.364903-104.230899 53.160757-1.004887 103.739712 36.012192 136.028093 36.012192 33.171494 0 94.357018-44.791136 158.90615-38.089503 27.02654 1.151219 102.622262 11.298324 151.328567 81.891102-3.832282 2.607384-90.452081 53.724599-89.487104 157.76107C739.079832 663.275355 847.952448 704.467523 849.124134 704.896288M633.69669 230.749408c29.107945-35.506678 48.235584-84.314291 43.202964-132.785236-41.560558 1.630127-92.196819 27.600615-122.291231 62.896492-26.609031 30.794353-50.062186 80.362282-43.521213 128.270409C557.264926 291.935955 604.745311 264.949324 633.69669 230.749408"
                        fill="#272636"
                        p-id="2555"
                    ></path>
                </svg>
            </div>
            <div class="rightContent">
                <h1 class="title">MacOS</h1>
                <div class="item">
                    <a :href="proxyGithub(macArm.browser_download_url)">
                        Apple Silicon(Arm)
                    </a>
                    <a :href="macArm.browser_download_url"> Github </a>
                </div>
                <div class="item">
                    <a :href="proxyGithub(macX64.browser_download_url)">
                        Intel Chip(X64)
                    </a>
                    <a :href="macX64.browser_download_url"> Github </a>
                </div>
            </div>
        </div>
        <div class="platform windows">
            <div class="leftIcon">
                <img
                    src="../static/imgs/windowslogo.png"
                    alt="windows"
                    class="winLogo"
                />
                <!-- <svg
                    t="1742708953461"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1664"
                    width="200"
                    height="200"
                >
                    <path
                        d="M448.085333 167.082667a42.666667 42.666667 0 0 1 14.592 32.128v257.578666a42.666667 42.666667 0 0 1-42.666666 42.666667H144a42.666667 42.666667 0 0 1-42.666667-42.666667V235.989333a42.666667 42.666667 0 0 1 37.034667-42.282666l276.010667-36.778667a42.666667 42.666667 0 0 1 33.706666 10.154667zM908.202667 111.957333a42.666667 42.666667 0 0 1 14.464 32.042667v312.789333a42.666667 42.666667 0 0 1-42.666667 42.666667h-349.610667a42.666667 42.666667 0 0 1-42.666666-42.666667V188.672a42.666667 42.666667 0 0 1 37.290666-42.325333l349.568-44.672a42.666667 42.666667 0 0 1 33.621334 10.282666zM500.565333 555.093333a42.666667 42.666667 0 0 1 30.848-12.16l349.568 8.192a42.666667 42.666667 0 0 1 41.685334 42.666667v286.208a42.666667 42.666667 0 0 1-49.578667 42.112L523.52 864.853333a42.666667 42.666667 0 0 1-35.797333-42.112v-237.141333a42.666667 42.666667 0 0 1 12.885333-30.506667zM114.176 536.661333a42.666667 42.666667 0 0 1 30.848-12.117333l276.010667 6.656a42.666667 42.666667 0 0 1 41.642666 42.666667v232.533333a42.666667 42.666667 0 0 1-49.749333 42.069333l-276.053333-46.506666a42.666667 42.666667 0 0 1-35.541334-42.069334v-192.682666a42.666667 42.666667 0 0 1 12.842667-30.549334z"
                        fill="#000000"
                        fill-opacity=".85"
                        p-id="1665"
                    ></path>
                </svg> -->
            </div>
            <div class="rightContent">
                <h1 class="title">Windows</h1>
                <div class="item">
                    <a :href="proxyGithub(windowsX64.browser_download_url)">
                        X64
                    </a>
                    <a :href="windowsX64.browser_download_url"> Github </a>
                </div>
                <div class="item">
                    <a :href="proxyGithub(windowsArm64.browser_download_url)">
                        ARM64
                    </a>
                    <a :href="windowsArm64.browser_download_url"> Github </a>
                </div>
            </div>
        </div>
        <div class="platform linux">
            <div class="leftIcon">
                <img
                    src="../static/imgs/linuxlogo.png"
                    alt="linux"
                    class="linuxLogo"
                />
                <!-- <svg
                    t="1742708821867"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1634"
                    width="200"
                    height="200"
                >
                    <path
                        d="M897.499 803.465c-28.223-11.613-40.336-26.848-39.212-49.826 1.249-26.724-13.987-46.33-21.105-53.947 4.371-16.61 16.984-74.053 0-124.004-18.357-53.448-74.302-134.993-131.996-215.29-23.602-32.843-24.726-68.683-25.974-110.267-1.25-39.462-2.623-84.418-24.726-134.12C630.634 61.816 582.43 30.72 522.615 30.72c-35.59 0-72.18 10.99-100.402 30.47-57.694 39.711-50.076 126.627-44.956 183.946 0.624 7.867 1.373 15.235 1.748 21.604 3.372 56.32 0.375 85.916-3.622 94.907-2.622 5.87-15.36 22.603-28.846 40.335-13.862 18.358-29.721 39.087-42.709 58.568-15.36 23.352-27.848 58.943-39.96 93.409-8.867 25.225-17.109 49.077-25.226 63.313-15.36 27.473-11.489 52.948-8.367 64.687-5.87 4.121-14.236 11.988-21.354 26.974-8.617 18.357-25.975 28.222-62.19 35.09-16.608 3.372-28.097 10.365-34.091 20.855-8.741 15.11-3.996 34.092 0.375 47.08 6.368 19.105 2.372 31.219-4.87 53.072-1.624 5.12-3.497 10.865-5.495 17.109-2.997 9.99-1.873 18.981 3.247 26.973 13.736 20.855 53.572 28.223 94.657 33.093 24.476 2.872 51.325 12.737 77.3 22.228 25.35 9.241 51.7 18.857 75.55 21.854 3.622 0.5 7.244 0.75 10.74 0.75 36.09 0 52.45-23.977 57.57-33.843 12.986-2.622 57.693-11.114 103.773-12.238 45.955-1.249 90.536 7.743 103.15 10.615 3.995 7.617 14.36 24.85 31.094 33.842 9.116 4.995 21.853 7.867 34.966 7.867 13.861 0 40.46-3.372 61.44-25.475 20.98-22.104 73.178-50.45 111.39-71.18 8.493-4.621 16.485-8.992 23.478-12.863 21.479-11.863 33.217-28.847 32.094-46.58-1-14.735-10.74-27.598-25.6-33.717z m-347.286-633.63c20.73 0 37.713 21.603 37.713 47.952 0 10.99-2.997 21.48-8.242 29.846a48.472 48.472 0 0 0 2.123-14.236c0-22.103-13.987-39.461-31.969-39.461-17.483 0-31.719 17.732-31.719 39.461 0 1.499 0.125 2.997 0.25 4.496a24.292 24.292 0 0 0-2.748-1c-1.998-6.118-2.997-12.487-2.997-18.98-0.124-26.6 16.859-48.079 37.589-48.079z m-63.938 96.155c7.992 1.374 27.473 9.241 41.71 14.86 6.618 2.623 12.362 4.871 16.358 6.37 12.613 4.37 19.232 9.865 19.98 11.988-0.249 1.249-0.998 1.873-7.991 5.494a205.824 205.824 0 0 0-13.487 7.618l-3.746 2.248c-14.861 8.991-49.702 30.095-59.193 31.47-6.368 0.873-10.365-1.624-19.356-7.743-1.998-1.25-4.12-2.873-6.369-4.246-16.109-10.615-26.474-22.229-27.722-26.849 5.244-4.121 18.357-14.236 24.975-20.23 13.487-12.613 27.099-20.98 33.842-20.98 0.375-0.125 0.75-0.125 1 0z m-53.073-87.29c15.36 0 28.222 20.605 28.222 44.957 0 3.122-0.25 6.243-0.624 9.49-0.999 0.375-1.873 0.874-2.747 1.25-0.125-1.999-0.25-3.997-0.625-6.12-3.247-18.857-15.734-32.593-29.72-32.593-1 0-1.999 0.125-3.248 0.25-8.241 1.373-14.86 7.617-18.357 16.484C409.1 193.06 420.09 178.7 433.202 178.7z m-71.68 764.754c-1.499 0.374-3.372 0.624-5.495 0.624-23.976 0-71.555-19.98-97.03-30.72l-3.746-1.498c-14.236-5.995-37.464-9.741-60.067-13.362-17.857-2.998-42.458-6.869-46.454-10.49-3.372-3.747 0.5-15.735 3.871-26.35 2.498-7.617 4.995-15.484 6.369-23.726 1.998-13.112-0.375-23.852-2.123-32.469-1.499-7.243-2.747-13.112-1.499-18.731 1-4.121 21.354-8.617 30.096-10.49 12.238-2.622 24.976-5.37 33.217-10.49 11.24-6.743 17.234-19.231 22.603-30.345 3.872-7.992 7.868-16.234 12.613-18.982 0.25-0.125 0.624-0.25 1.499-0.25 8.866 0 27.598 18.732 38.462 35.466 2.747 4.246 7.867 12.738 13.737 22.603 17.483 29.346 41.584 69.557 54.072 83.044 11.364 12.113 29.596 35.34 25.1 55.32-3.496 15.486-20.98 28.098-25.225 30.846z m285.346-235.895c-3.996 19.231-4.495 80.796-4.495 94.658-8.242 10.49-49.827 59.566-109.518 68.433-24.352 3.496-47.08 5.245-67.435 5.245-17.482 0-28.721-1.25-33.342-1.998l-29.97-34.342c11.863-5.87 23.601-18.107 20.48-40.46-2.623-18.857-26.85-37.464-54.947-59.068-22.853-17.607-48.827-37.713-56.07-54.571-14.736-34.966-3.122-96.406 17.233-128.125 9.99-15.86 18.232-39.836 26.224-63.189 8.617-25.1 17.358-51.075 27.349-62.439 15.734-17.857 30.22-52.323 32.718-79.547C429.83 366.142 452.558 384 473.662 384c3.247 0 6.37-0.375 9.366-1.249 14.361-4.12 35.59-16.359 56.07-28.222 17.608-10.24 39.462-22.853 47.704-23.977 13.986 20.23 95.657 200.929 104.023 258.997 6.619 45.83-0.374 83.918-3.87 98.654-2.873-0.375-6.245-0.75-9.741-0.75-22.728 0.25-28.722 12.613-30.346 20.106z m228.277 134.494c-4.745 4.37-21.479 12.862-37.713 21.229-28.722 14.736-61.315 31.22-75.926 46.704-20.605 21.73-43.957 36.34-58.068 36.34-1.623 0-3.247-0.25-4.62-0.75-15.236-4.745-27.848-26.848-21.105-58.193 7.118-32.093 15.36-75.8 13.987-101.65-0.25-5.87-0.75-12.238-1.374-18.357-1-11.49-2.373-28.722-0.874-33.717 0.25-0.125 0.624-0.25 0.999-0.375 0 14.86 3.247 44.207 26.724 54.447 6.993 2.997 14.985 4.62 23.851 4.62 23.477 0 49.702-11.489 60.316-22.228 6.244-6.369 11.614-13.986 15.36-20.105 0.875 2.372 1.25 5.37 1 9.365-1.374 21.73 9.116 50.576 29.22 61.19l2.873 1.5c7.118 3.746 26.225 13.736 26.474 18.481 0.125 0 0 0.5-1.124 1.499z"
                        fill="#2C2C2C"
                        p-id="1635"
                    ></path>
                </svg> -->
            </div>
            <div class="rightContent">
                <h1 class="title">Linux</h1>
                <div class="item">
                    <a :href="proxyGithub(linuxDeb.browser_download_url)">
                        deb
                    </a>
                    <a :href="linuxDeb.browser_download_url"> Github </a>
                </div>
                <div class="item">
                    <a :href="proxyGithub(linuxRpm.browser_download_url)">
                        rpm
                    </a>
                    <a :href="linuxRpm.browser_download_url"> Github </a>
                </div>
                <div class="item">
                    <a :href="proxyGithub(linuxImage.browser_download_url)">
                        AppImage
                    </a>
                    <a :href="linuxImage.browser_download_url"> Github </a>
                </div>
            </div>
        </div>
        <div class="platform web">
            <div class="leftIcon cloud-icon">
                <svg
                    t="1742721374498"
                    class="icon"
                    viewBox="0 0 1565 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1694"
                    width="200"
                    height="200"
                >
                    <path
                        d="M1206.510527 299.331595c-27.357038 0-53.867311 3.354494-79.465683 9.119013C1078.551237 130.792698 916.428217 0 723.398257 0c-231.329814 0-418.82323 187.493416-418.82323 418.790662 0 16.023408 1.107309 31.786273 2.865975 47.353731-9.151581-0.879333-18.400865-1.40042-27.812989-1.40042C125.223586 464.743973 0 589.934991 0 744.371987s125.223586 279.628013 279.628013 279.628013c134.928821 0 782.150754 0 926.849946 0 197.947713 0 358.40977-168.34349 358.40977-366.291203C1564.920298 459.761084 1404.458241 299.331595 1206.510527 299.331595z"
                        fill="#090909"
                        p-id="1695"
                    ></path>
                </svg>
            </div>
            <div class="rightContent">
                <h1 class="title">Web Version</h1>
                <div class="item">
                    <a href="https://pakeplus.pages.dev/">
                        https://pakeplus.pages.dev/
                    </a>
                </div>
                <div class="item">
                    <a href="https://pakeplus.netlify.app/">
                        https://pakeplus.netlify.app/
                    </a>
                </div>
                <div class="item">
                    <span>Not recommended, it's a beta version</span>
                </div>
            </div>
        </div>
        <!-- last release -->
        <div class="lastRelease">
            <span>Last Release: {{ lastRelease.name }}</span>
            <span>Last Time: {{ lastRelease.published_at }}</span>
        </div>
    </div>
</template>

<script setup>
import { data } from '../static/js/releases.data.ts'

console.log('releases data', data)

const lastRelease = data[0] || {
    url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/207589840',
    assets_url:
        'https://api.github.com/repos/Sjj1024/PakePlus/releases/207589840/assets',
    upload_url:
        'https://uploads.github.com/repos/Sjj1024/PakePlus/releases/207589840/assets{?name,label}',
    html_url:
        'https://github.com/Sjj1024/PakePlus/releases/tag/PakePlus-v0.5.17',
    id: 207589840,
    node_id: 'RE_kwDOMvkdy84MX5HQ',
    tag_name: 'PakePlus-v0.5.17',
    target_commitish: '4fb9a11b57dccf84387ba9bfe83685f6c571cd41',
    name: 'PakePlus v0.5.17',
    draft: false,
    prerelease: false,
    created_at: '2025-03-22T05:21:55Z',
    published_at: '2025-03-22T05:48:09Z',
    assets: [
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239940761',
            id: 239940761,
            node_id: 'RA_kwDOMvkdy84OTTSZ',
            name: 'PakePlus-0.5.17-1.x86_64.rpm',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 11039896,
            download_count: 12,
            created_at: '2025-03-23T01:56:49Z',
            updated_at: '2025-03-23T01:56:50Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus-0.5.17-1.x86_64.rpm',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239939962',
            id: 239939962,
            node_id: 'RA_kwDOMvkdy84OTTF6',
            name: 'PakePlus_0.5.17_aarch64.dmg',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 10200795,
            download_count: 5,
            created_at: '2025-03-23T01:52:29Z',
            updated_at: '2025-03-23T01:52:30Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_aarch64.dmg',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239940766',
            id: 239940766,
            node_id: 'RA_kwDOMvkdy84OTTSe',
            name: 'PakePlus_0.5.17_amd64.AppImage',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 92353728,
            download_count: 1,
            created_at: '2025-03-23T01:56:50Z',
            updated_at: '2025-03-23T01:56:52Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_amd64.AppImage',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239940760',
            id: 239940760,
            node_id: 'RA_kwDOMvkdy84OTTSY',
            name: 'PakePlus_0.5.17_amd64.deb',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 11038642,
            download_count: 0,
            created_at: '2025-03-23T01:56:48Z',
            updated_at: '2025-03-23T01:56:48Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_amd64.deb',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239941740',
            id: 239941740,
            node_id: 'RA_kwDOMvkdy84OTThs',
            name: 'PakePlus_0.5.17_arm64-setup.exe',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 6201297,
            download_count: 3,
            created_at: '2025-03-23T02:01:43Z',
            updated_at: '2025-03-23T02:01:43Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_arm64-setup.exe',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239941733',
            id: 239941733,
            node_id: 'RA_kwDOMvkdy84OTThl',
            name: 'PakePlus_0.5.17_arm64_en-US.msi',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 8704000,
            download_count: 1,
            created_at: '2025-03-23T02:01:42Z',
            updated_at: '2025-03-23T02:01:43Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_arm64_en-US.msi',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239941382',
            id: 239941382,
            node_id: 'RA_kwDOMvkdy84OTTcG',
            name: 'PakePlus_0.5.17_x64-setup.exe',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 6806955,
            download_count: 4,
            created_at: '2025-03-23T02:00:02Z',
            updated_at: '2025-03-23T02:00:03Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_x64-setup.exe',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239939963',
            id: 239939963,
            node_id: 'RA_kwDOMvkdy84OTTF7',
            name: 'PakePlus_0.5.17_x64.dmg',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 10565520,
            download_count: 2,
            created_at: '2025-03-23T01:52:29Z',
            updated_at: '2025-03-23T01:52:30Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_x64.dmg',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239941381',
            id: 239941381,
            node_id: 'RA_kwDOMvkdy84OTTcF',
            name: 'PakePlus_0.5.17_x64_en-US.msi',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 9216000,
            download_count: 0,
            created_at: '2025-03-23T02:00:02Z',
            updated_at: '2025-03-23T02:00:02Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_0.5.17_x64_en-US.msi',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239939968',
            id: 239939968,
            node_id: 'RA_kwDOMvkdy84OTTGA',
            name: 'PakePlus_aarch64.app.tar.gz',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 9717915,
            download_count: 1,
            created_at: '2025-03-23T01:52:31Z',
            updated_at: '2025-03-23T01:52:31Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_aarch64.app.tar.gz',
        },
        {
            url: 'https://api.github.com/repos/Sjj1024/PakePlus/releases/assets/239939969',
            id: 239939969,
            node_id: 'RA_kwDOMvkdy84OTTGB',
            name: 'PakePlus_x64.app.tar.gz',
            label: '',
            content_type: 'application/zip',
            state: 'uploaded',
            size: 10089554,
            download_count: 0,
            created_at: '2025-03-23T01:52:31Z',
            updated_at: '2025-03-23T01:52:32Z',
            browser_download_url:
                'https://github.com/Sjj1024/PakePlus/releases/download/PakePlus-v0.5.17/PakePlus_x64.app.tar.gz',
        },
    ],
    tarball_url:
        'https://api.github.com/repos/Sjj1024/PakePlus/tarball/PakePlus-v0.5.17',
    zipball_url:
        'https://api.github.com/repos/Sjj1024/PakePlus/zipball/PakePlus-v0.5.17',
    body: '## 我应该下载哪个版本？\r\n\r\n### MacOS\r\n\r\n-   MacOS intel 芯片: x64.dmg\r\n-   MacOS apple M 芯片: aarch64.dmg\r\n\r\n### Linux\r\n\r\n-   Linux 64 位: amd64.deb/amd64.rpm\r\n-   Linux arm64 architecture: arm64.deb/aarch64.rpm\r\n-   Linux armv7 架构: armhf.deb/armhfp.rpm\r\n\r\n### Windows\r\n\r\n-   64 位: x64-setup.exe\r\n-   arm64 架构: arm64-setup.exe',
}

// 获取 mac 版本
const macArm = lastRelease.assets.find((asset) =>
    asset.name.includes('aarch64.dmg')
)

const macX64 = lastRelease.assets.find((asset) =>
    asset.name.includes('x64.dmg')
)

// 获取windows版本
const windowsX64 = lastRelease.assets.find((asset) =>
    asset.name.includes('x64-setup.exe')
)
const windowsArm64 = lastRelease.assets.find((asset) =>
    asset.name.includes('arm64-setup.exe')
)

// 获取linux版本
const linuxDeb = lastRelease.assets.find((asset) =>
    asset.name.includes('amd64.deb')
)
const linuxRpm = lastRelease.assets.find((asset) =>
    asset.name.includes('64.rpm')
)

const linuxImage = lastRelease.assets.find((asset) =>
    asset.name.includes('amd64.AppImage')
)

// 替换github.com为github.pakeplus.com
const proxyGithub = (url) => {
    const newURL = url.replace('github.com', 'github.pakeplus.com/gh')
    console.log('newURL', newURL)
    return newURL
}

const isMobile = () => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
    )
}
</script>

<style scoped lang="scss">
.downBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin: 20px 0;
    // width: 100vw;

    .title {
        font-size: 30px;
    }

    .mac {
        // background: linear-gradient(
        //     135deg,
        //     rgba(144, 169, 213, 0.8),
        //     rgba(230, 210, 255, 0.6)
        // );
        // filter: blur(1px);

        box-shadow: 0 0 10px rgba(200, 220, 255, 0.8),
            0 0 20px rgba(230, 210, 255, 0.6);

        &:hover {
            // box-shadow: var(--vp-c-text-1) 0px 0px 10px;
            box-shadow: 0 0 15px rgba(200, 220, 255, 0.8),
                0 0 25px rgba(230, 210, 255, 0.6);
        }
    }

    .windows {
        // background: linear-gradient(
        //     45deg,
        //     rgba(0, 120, 215, 0.6),
        //     rgba(105, 0, 255, 0.3)
        // );

        box-shadow: 0 0 10px rgba(0, 120, 215, 0.3),
            0 0 20px rgba(105, 0, 255, 0.3);

        &:hover {
            // box-shadow: var(--vp-c-text-1) 0px 0px 10px;
            box-shadow: 0 0 20px rgba(0, 120, 215, 0.3),
                0 0 30px rgba(105, 0, 255, 0.3);
        }
    }

    .linux {
        // background: linear-gradient(
        //     45deg,
        //     rgba(255, 140, 0, 0.3),
        //     rgba(0, 200, 80, 0.2)
        // );

        box-shadow: 0 0 10px rgba(255, 140, 0, 0.3),
            0 0 20px rgba(0, 200, 80, 0.3);
        &:hover {
            // box-shadow: var(--vp-c-text-1) 0px 0px 10px;
            box-shadow: 0 0 20px rgba(255, 140, 0, 0.3),
                0 0 30px rgba(0, 200, 80, 0.3);
        }
    }

    .web {
        // background: linear-gradient(
        //     135deg,
        //     rgba(100, 120, 255, 0.3),
        //     rgba(0, 200, 220, 0.3)
        // );

        box-shadow: 0 0 10px rgba(100, 120, 255, 0.3),
            0 0 20px rgba(0, 200, 220, 0.3);
        &:hover {
            // box-shadow: var(--vp-c-text-1) 0px 0px 10px;
            box-shadow: 0 0 20px rgba(100, 120, 255, 0.3),
                0 0 30px rgba(0, 200, 220, 0.3);
        }
    }

    .platform {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 20px;
        width: 70%;
        height: 160px;
        transition: all 0.3s ease;
        // border: 1px solid var(--vp-c-text-1);

        &:hover {
            transform: translateY(-1px);
        }

        .leftIcon {
            width: 10%;
            margin-right: 10px;

            .icon {
                width: 100%;
                height: 100%;
                path {
                    fill: var(--vp-c-text-1);
                }
            }

            .winLogo {
                width: 80%;
                height: 80%;
            }

            .linuxLogo {
                width: 80%;
                height: 80%;
            }
        }

        .cloud-icon {
            position: relative;
        }

        .cloud-icon svg {
            width: 100%;
            height: 100%;
        }

        .cloud-icon path {
            fill: #f0f0f0; /* 基础颜色 */
        }

        /* 使用伪元素叠加渐变 */
        .cloud-icon::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle at 30% 30%,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(240, 240, 240, 0.7) 50%,
                rgba(220, 220, 220, 0.5) 100%
            );
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1565 1024"><path d="M1206.51 299.33c-27.36 0-53.87 3.35-79.47 9.12C1078.55 130.79 916.43 0 723.4 0c-231.33 0-418.82 187.49-418.82 418.79 0 16.02 1.11 31.79 2.87 47.35-9.15-0.88-18.4-1.4-27.81-1.4C125.22 464.74 0 589.93 0 744.37s125.22 279.63 279.63 279.63c134.93 0 782.15 0 926.85 0 197.95 0 358.41-168.34 358.41-366.29 0-197.95-160.46-358.41-358.41-358.41z"/></svg>');
            mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1565 1024"><path d="M1206.51 299.33c-27.36 0-53.87 3.35-79.47 9.12C1078.55 130.79 916.43 0 723.4 0c-231.33 0-418.82 187.49-418.82 418.79 0 16.02 1.11 31.79 2.87 47.35-9.15-0.88-18.4-1.4-27.81-1.4C125.22 464.74 0 589.93 0 744.37s125.22 279.63 279.63 279.63c134.93 0 782.15 0 926.85 0 197.95 0 358.41-168.34 358.41-366.29 0-197.95-160.46-358.41-358.41-358.41z"/></svg>');
            mask-repeat: no-repeat;
            mask-size: 100% 100%;
        }

        .rightContent {
            width: 90%;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 10px;

            .title {
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--vp-c-text-1);
                margin-top: 16px;
            }

            .item {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 1rem;

                a {
                    color: var(--vp-c-brand-1);
                    transition: all 0.5s ease;

                    &:hover {
                        // color: rgb(58, 58, 254);
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .lastRelease {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding: 20px;
        font-size: 14px;
        color: var(--vp-c-text-2);
        gap: 10px;
    }
}
</style>
