const fs = require('fs') // 文件模块
const matter = require('gray-matter') // FrontMatter 解析器 https://github.com/jonschlinkert/gray-matter
const jsonToYaml = require('json2yaml')
const chalk = require('chalk') // 命令行打印美化
const readFileList = require('./modules/readFileList')
const { type, repairDate, dateFormat } = require('./modules/fn')
const log = console.log

/**
 * 给 .md 文件设置 frontmatter (标题、日期、永久链接等数据)
 */
function setFrontmatter(sourceDir) {
  const files = readFileList(sourceDir) // 读取所有 md 文件数据

  files.forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8') // 读取每个 md 文件内容

    // fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    const fileMatterObj = matter(dataStr)

    if (Object.keys(fileMatterObj.data).length === 0) {
      // 未定义FrontMatter数据
      const stat = fs.statSync(file.filePath)
      const dateStr = dateFormat(getBirthtime(stat)) // 文件的创建时间

      const fmData = `---
title: ${file.name}
date: ${dateStr}
permalink: ${getPermalink()}
---`

      fs.writeFileSync(file.filePath, `${fmData}\r\n${fileMatterObj.content}`) // 写入
      log(chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `))
    } else {
      // 已有FrontMatter
      const matterData = fileMatterObj.data
      let mark = false

      // 已有FrontMatter，但是没有title、date、permalink数据的
      if (!matterData.hasOwnProperty('title')) {
        // 标题
        matterData.title = file.name
        mark = true
      }

      if (!matterData.hasOwnProperty('date')) {
        // 日期
        const stat = fs.statSync(file.filePath)
        matterData.date = dateFormat(getBirthtime(stat))
        mark = true
      }

      if (!matterData.hasOwnProperty('permalink')) {
        // 永久链接
        matterData.permalink = getPermalink()
        mark = true
      }

      if (mark) {
        if (matterData.date && type(matterData.date) === 'date') {
          matterData.date = repairDate(matterData.date) // 修复时间格式
        }
        const newData =
          jsonToYaml
            .stringify(matterData)
            .replace(/\n\s{2}/g, '\n')
            .replace(/"/g, '') +
          '---\r\n' +
          fileMatterObj.content
        fs.writeFileSync(file.filePath, newData) // 写入
        log(
          chalk.blue('tip ') + chalk.green(`write frontmatter(写入frontmatter)：${file.filePath} `)
        )
      }
    }
  })
}

// 获取文件创建时间
function getBirthtime(stat) {
  // 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
  return stat.birthtime.getFullYear() != 1970 ? stat.birthtime : stat.atime
}

// 定义永久链接数据
function getPermalink() {
  return `/${(Math.random() + Math.random()).toString(16).slice(2, 8)}/`
}

module.exports = setFrontmatter
