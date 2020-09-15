import Vue from 'vue'
import Element from 'element-ui'

/**
 * 将数字转化为带逗号的
 */
Vue.filter('numberFilter', input => {
  if (typeof input !== 'string' && typeof input !== 'number') return input
  const reg = /^\d+(.\d+)?$/
  if (reg.test(input)) {
    const arr = String(input).split('.')
    return arr[0].replace(/(?!^)(?=(\d{3})+$)/g, ',') + (arr[1] ? '.' + arr[1] : '')
  }
  return input
})

// 禁用远程选择多选框backspace键盘删除标签功能
Element.Select.methods.deletePrevTag = function() {}
// 远程选择多选框选择后清空输入内容
Element.Select.watch['selected.length'] = function() {
  setTimeout(() => (this.query = ''))
}
// 此处用于修复bug 22698 option弹出层偏离位置
let optionsTimer
Element.Select.watch['options.length'] = function() {
  if (optionsTimer) clearTimeout(optionsTimer)
  optionsTimer = setTimeout(() => {
    this.broadcast('ElSelectDropdown', 'updatePopper')
  }, 500)
}
// 解决select 多选情况下 选项自动跳到行首的问题
function scrollIntoView(container, selected) {
  if (Vue.prototype.$isServer) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const top = selected.offsetTop
  const bottom = selected.offsetTop + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}
Element.Select.methods.scrollToOption = function(className = 'selected') {
  const menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap')
  if (this.multiple) return
  scrollIntoView(menu, menu.getElementsByClassName(className)[0])
}
// 禁用了Select的enter键, 使enter无法选中选项
Element.Select.methods.selectOption = function(e) {
  if (e.key === 'Enter' && !this.query) return
  if (this.options[this.hoverIndex]) {
    this.handleOptionSelect(this.options[this.hoverIndex])
  }
}
Element.Upload.components.UploadList.methods.parsePercentage = function(val) {
  if (parseInt(val, 10) == 100) {
    return 99
  } else {
    return parseInt(val, 10)
  }
}
Element.Collapse.methods.handleItemClick = function(item) {
  if (this.accordion) {
    this.setActiveNames(
      (this.activeNames[0] || this.activeNames[0] === 0) && this.activeNames[0] === item.name
        ? item.name + '#'
        : item.name
    )
  } else {
    let activeNames = this.activeNames.slice(0)
    let index = activeNames.indexOf(item.name)
    if (index > -1) {
      activeNames.splice(index, 1)
    } else {
      activeNames.push(item.name)
    }
    this.setActiveNames(activeNames)
  }
}

Element.Upload.components.Upload.methods.upload = function(rawFile) {
  this.$refs.input.value = null
  if (!this.beforeUpload) {
    return this.post(rawFile)
  }
  const before = this.beforeUpload(rawFile)
  if (before && before.then) {
    before.then(
      processedFile => {
        const fileType = Object.prototype.toString.call(processedFile)
        if (fileType === '[object File]' || fileType === '[object Blob]') {
          this.post(processedFile)
        } else {
          this.post(rawFile)
        }
      },
      () => {
        this.onRemove(null, rawFile)
      }
    )
  } else if (before !== false) {
    this.post(rawFile)
  } else {
    this.onRemove(null, rawFile)
  }
}
//修改tooltip默认延迟时间为 0.5秒
Element.Tooltip.methods.handleShowPopper = function() {
  if (!this.expectedState || this.manual) return
  clearTimeout(this.timeout)
  this.timeout = setTimeout(() => {
    this.showPopper = true
  }, this.openDelay || 500)
}
