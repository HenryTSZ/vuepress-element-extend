const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

module.exports = {
  title: 'VuePress-ElementUI-extend',
  description: 'Based on the VuePress and ElementUI documentation',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
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
    logo: '/logo.png',
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
    sidebarDepth: 2,
    repo: 'HenryTSZ/vuepress-element-extend',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '最近更新时间'
  },
  plugins: [
    demoBlock,
    '@vuepress/back-to-top',
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
