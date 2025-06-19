<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/12064746?v=4',
    name: '句乐部',
    title: '让你上瘾的 英语学习工具',
    links: [
      { icon: 'github', link: 'https://github.com/cuixueshe/earthworm' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>

# 公司名单

欢迎各位金主公司的支持！可以在官方 README 和下方的列表中添加自己的公司名称，让更多的人了解到贵公司对开源的支持，提升贵公司的知名度和影响力，并对开源社区产生积极的影响。

<VPTeamMembers size="small" :members />
