const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

module.exports = {
  title: 'VuePress-ElementUI-extend',
  description: 'Based on the VuePress and ElementUI documentation',
  alias: {
    public: resolve('public'),
    styles: resolve('styles'),
    utils: resolve('utils')
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    prismTheme: 'solarizedlight',
    logo: '/hero.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ElementUI', link: '/ElementUI/' },
      { text: 'Blog', link: 'https://tsz.now.sh' }
    ],
    sidebar: {
      '/ElementUI/': [
        {
          title: 'ElementUI',
          collapsable: false,
          children: ['', 'BaseForm']
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
