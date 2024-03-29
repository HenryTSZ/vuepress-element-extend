const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')
const theme = require('./theme')

module.exports = {
  title: 'VuePress-ElementUI-Template',
  description: 'Based on the VuePress and ElementUI documentation',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  alias: {
    public: resolve('public'),
    styles: resolve('styles')
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/a41cee/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' }
    ],
    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean } | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',
    sidebarDepth: 2,
    repo: 'HenryTSZ/vuepress-element-extend/tree/template',
    repoLabel: 'GitHub',
    docsRepo: 'HenryTSZ/vuepress-element-extend/',
    docsDir: 'docs',
    docsBranch: 'template',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '最近更新时间'
  },
  plugins: [
    demoBlock,
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10
      }
    ],
    '@vuepress/nprogress',
    '@vuepress/last-updated',
    'vuepress-plugin-smooth-scroll'
  ],
  evergreen: true,
  smoothScroll: true
}
