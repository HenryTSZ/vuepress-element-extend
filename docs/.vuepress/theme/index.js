const setFrontmatter = require('./utils/setFrontmatter')
const getSidebarData = require('./utils/getSidebarData')
const chalk = require('chalk') // 命令行打印美化
const log = console.log

// Theme API.
module.exports = (options, ctx) => {
  const { sourceDir, themeConfig } = ctx

  // 自动设置 front matter
  setFrontmatter(sourceDir, themeConfig)

  // 自动生成结构化侧边栏
  const sidebar = themeConfig.sidebar
  if (sidebar === 'structuring' || (sidebar && sidebar.mode === 'structuring')) {
    const collapsable = !!themeConfig.sidebar.collapsable
    const sidebarData = getSidebarData(sourceDir, collapsable)
    console.log('🚀 ~ file: index.js ~ line 18 ~ sidebarData', sidebarData)
    if (sidebarData) {
      themeConfig.sidebar = sidebarData
      log(chalk.blue('tip ') + chalk.green('add sidebar data. 侧边栏数据成功生成。'))
    } else {
      themeConfig.sidebar = 'auto'
      log(
        chalk.yellow(
          'warning: fail to add sidebar data, switch to "auto". 未能添加侧边栏数据，将切换为“auto”。'
        )
      )
    }
  }

  return { extend: '@vuepress/theme-default' }
}
