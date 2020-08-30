const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

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
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/Guide/' },
      { text: 'Github', link: 'https://github.com/HenryTSZ/vuepress-element-extend/tree/template' }
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
    sidebarDepth: 2
  },
  plugins: [
    demoBlock,
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10
      }
    ]
  ],
  evergreen: true,
  lastUpdated: '最近更新时间',
  smoothScroll: true
}
