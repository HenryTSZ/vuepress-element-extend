const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://github.com/calebman/vuepress-plugin-demo-container
const demoBlock = require('./plugins/demo-block')

module.exports = {
  title: 'VuePress-ElementUI-extend',
  description: 'Based on the VuePress and ElementUI documentation',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
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
      { text: 'VueEcharts', link: '/VueEcharts/' },
      { text: 'Blog', link: 'https://tszv.now.sh/pages/e29708/' }
    ],
    sidebar: {
      '/ElementUI/': [
        {
          title: 'ElementUI',
          collapsable: false,
          children: [
            '',
            'TextEllipsis',
            'Tree',
            'SelectTree',
            'NumberInput',
            'RegInput',
            'UploadFile',
            'EditableElements',
            'BaseForm',
            'BaseTable',
            'TreeTable'
          ]
        }
      ],
      '/VueEcharts/': [
        {
          title: 'VueEcharts',
          collapsable: false,
          children: [
            '',
            'LineChart',
            'BarChart',
            'PieChart',
            'ProgressBarChart',
            'ProgressPieChart',
            'BarArrowChart'
          ]
        }
      ]
    },
    algolia: {
      apiKey: '8bc4b1fa561fe417741993a1701ded53',
      indexName: 'now'
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
    'vuepress-plugin-smooth-scroll',
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新'
        }
      }
    ]
  ],
  evergreen: true,
  smoothScroll: true
}
