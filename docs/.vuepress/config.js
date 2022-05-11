const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

module.exports = {
  title: 'VuePress-auguigu',
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
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/Guide/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' }
    ],
    sidebar: {
      '/Guide/': [
        {
          title: '指南',
          collapsable: false,
          children: ['', 'started', 'options', 'Radio']
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
