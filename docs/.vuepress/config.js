const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

module.exports = {
  title: 'auguigu',
  description: 'Based on the VuePress a auguigu documentation',
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
  themeConfig: {
    logo: '/logo-2.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'vue2+3', link: '/8f9f1a/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' }
    ],
    sidebar: {
      '/vue2+3/': [
        {
          title: '尚硅谷 Vue2.0+Vue3.0 全套教程',
          collapsable: false,
          children: ['001.说明', '002.初识Vue']
        }
      ]
    },
    sidebarDepth: 2,
    repo: 'HenryTSZ/vuepress-element-extend/tree/auguigu',
    repoLabel: 'GitHub',
    docsRepo: 'HenryTSZ/vuepress-element-extend/',
    docsDir: 'docs',
    docsBranch: 'auguigu',
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
