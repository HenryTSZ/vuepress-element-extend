/*
 * @Author: HenryTSZ
 * @Date: 2020-04-20 18:06:29
 * @Description: 公共方法
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-25 14:09:39
 */

/**
 * @description: 大写首字母
 * @param {String} str
 * @return {String} result
 */
export const upperFirst = str => str.substring(0, 1).toUpperCase() + str.substring(1)

export const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

/**
 * @description: 数组转树
 * @param {Array} list
 * @param {String} nodeKey
 * @param {String} parentKey
 * @return {Array} tree
 */
export const listToTree = (list, nodeKey = 'id', parentKey = 'parentId') => {
  const tree = []
  const getParentNode = node =>
    node[parentKey] && list.filter(a => a[nodeKey] && a[nodeKey] === node[parentKey])[0]
  list.forEach(item => {
    const parentNode = getParentNode(item)
    if (!parentNode) {
      if (!Array.isArray(item.children)) {
        item.children = []
      }
      tree.push(item)
    } else {
      if (!Array.isArray(parentNode.children)) {
        parentNode.children = []
      }
      parentNode.children.push(item)
    }
  })
  return tree
}

/**
 * @description: 通过 id 找 node
 * @param {Array} treeData
 * @param {String} id
 * @param {String} nodeKey
 * @param {String} childrenKey
 * @return {Object} node
 */
export const findTreeNodeById = (treeData, id, nodeKey = 'id', childrenKey = 'children') => {
  let result = null
  treeData.some(node => {
    if (node[nodeKey] === id) {
      result = node
      return true
    } else if (node[childrenKey]) {
      const childrenNode = findTreeNodeById(node[childrenKey], id, nodeKey, childrenKey)
      if (childrenNode) {
        result = childrenNode
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  })
  return result
}

/**
 * @description: 通过 ids 找 nodes
 * @param {Array} treeData
 * @param {Array} ids
 * @param {String} nodeKey
 * @param {String} childrenKey
 * @return {Array} nodes
 */
export const findTreeNodesByIds = (treeData, ids, nodeKey = 'id', childrenKey = 'children') => {
  let result = []
  treeData.forEach(node => {
    if (node[nodeKey] === ids) {
      result.push(node)
    } else if (node[childrenKey]) {
      const childrenNode = findTreeNodeById(node[childrenKey], ids, nodeKey, childrenKey)
      result = result.concat(childrenNode)
    }
  })
  return result
}

/**
 * @description: 获取树最大层级
 * @param {Array} treeData
 * @param {String} childrenKey
 * @return {Number} level
 */
export const getTreeMaxLevel = (treeData, childrenKey = 'children') => {
  if (!treeData.length) {
    return 0
  } else {
    let max = 1
    for (const item of treeData) {
      const level = 1 + getTreeMaxLevel(item[childrenKey] || [], childrenKey)
      max = Math.max(level, max)
    }
    return max
  }
}

/**
 * @description: 格式化时间
 * @param {String} date
 * @param {Boolean} time 是否有时分秒
 * @param {String} separator 分隔符
 * @return {String} date
 */
export const formatTime = (date = null, time = true, separator = '-') => {
  let year = null
  let month = null
  let day = null
  let hour = null
  let minute = null

  if (date) {
    date = date + ''
    if (date.indexOf('-') > 0) {
      date = date.replace(/-/g, '/')
      date = new Date(date).getTime()
    } else {
      date = parseFloat(date)
    }
    year = new Date(date).getFullYear()
    month = new Date(date).getMonth() + 1
    day = new Date(date).getDate()
    hour = new Date(date).getHours()
    minute = new Date(date).getMinutes()
  } else {
    year = new Date().getFullYear()
    month = new Date().getMonth() + 1
    day = new Date().getDate()
    hour = new Date().getHours()
    minute = new Date().getMinutes()
  }
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }

  if (time) {
    return `${year}${separator}${month}${separator}${day} ${hour}:${minute}`
  } else {
    return `${year}${separator}${month}${separator}${day}`
  }
}

/**
 * @description: 判断是否是对象
 * @param {*} obj
 * @return {Boolean} result
 */
export const isObject = obj => {
  return typeof obj === 'object' && obj != null
}

/**
 * @description: 深克隆
 * @param {*} source
 * @return {*} result
 */
export const deepClone = source => {
  if (!isObject(source)) return source // 非对象返回自身
  let target = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

/**
 * @description: 从数组中删除某一项数据, 会改变原数据
 * @param {Array} arr
 * @param {Function} fun 查找待删除数据的函数
 * @return {Array} removed
 */
export const arrRemove = (arr, fun) => {
  let removed = []
  const index = arr.findIndex(fun)
  if (index !== -1) {
    removed = arr.splice(index, 1)
  }
  return removed
}

/**
 * @description 从对象中找到 value
 * @param {Object} data
 * @param {String} key
 * @param {String} value
 * @param {String} label
 * @return {String} find value
 */
export const findVal = (data, key, value = 'value', label = 'label') => {
  if (!isObject(data)) return // 非对象返回
  let target
  if (Array.isArray(data)) {
    data.some(item => {
      if (!isObject(item)) return
      if (item[value] === key) {
        target = item[label]
        return true
      } else {
        return false
      }
    })
  } else {
    for (const iterator of data) {
      if (data[iterator] === key) {
        target = iterator
      }
    }
  }
  return target
}
/**
 * @description 从对象中找到 values
 * @param {Object} data
 * @param {Array} keys
 * @param {String} value
 * @param {String} label
 * @return {Array} find values
 */
export const findVals = (data, keys, value = 'value', label = 'label') => {
  if (!isObject(data)) return // 非对象返回
  let target = []
  if (Array.isArray(keys)) {
    target = keys.reduce((acc, key) => {
      const result = findVal(data, key, value, label)
      return result ? acc.concat(result) : acc
    }, [])
  }
  return target
}

/**
 * @description: 判断是否有值
 * @param {value} 待检查的值
 * @return {Boolean} result
 */
export const checkEmpty = value => {
  const trim = val => (typeof val === 'string' ? val.trim() : val)
  if (isObject(value)) {
    if (Array.isArray(value)) {
      if (!value.length) return true
      return value.some(val => {
        val = trim(val)
        return ['', undefined, null].includes(val)
      })
    } else {
      return !Object.keys(value).length
    }
  } else {
    const val = trim(value)
    return ['', undefined, null].includes(val)
  }
}

/**
 * @description: 检测 param, 为 undefined 返回 defaultVal, 否则返回 param
 * @param {*} param
 * @return {*} result
 */
export const checkParam = (param, defaultVal) => (param === undefined ? defaultVal : param)

/**
 * @description: 验证 props
 * @return {type} result
 */
export const checkProps = {
  string: { type: String, default: '' },
  strDef(def = '', required = false) {
    const type = typeof def
    if (type !== 'string' && type !== 'function') {
      console.error('props 属性默认值类型要求为 string/function, 得到的为' + type)
    }
    return { type: String, required, default: def }
  },
  boolean: { type: Boolean, default: false },
  boolDef(def = false, required = false) {
    const type = typeof def
    if (type !== 'boolean' && type !== 'function') {
      console.error('props 属性默认值类型要求为 boolean/function, 得到的为' + type)
    }
    return { type: Boolean, required, default: def }
  },
  number: { type: Number, default: 0 },
  numDef(def = 0, required = false) {
    const type = typeof def
    if (type !== 'number' && type !== 'function') {
      console.error('props 属性默认值类型要求为 number/function, 得到的为' + type)
    }
    return { type: Number, required, default: def }
  },
  anyDef(def = '', required = false) {
    return { required, default: def }
  },
  objDef(def = {}, required = false) {
    return {
      type: Object,
      required,
      default: typeof def === 'function' ? def : () => def
    }
  },
  arrDef(def = [], required = false) {
    return {
      type: Array,
      required,
      default: typeof def === 'function' ? def : () => def
    }
  }
}

/**
 * @description: 解决 toFixed 精度问题
 * @param {Number} number 待格式化的数字
 * @param {Number} digits 小数位数
 * @param {Boolean} flag 整数时是否用 0 补齐小数位数, 默认 true
 * @return {Number} 格式化后的数字
 */
export const toFixed = (number, digits, flag = true) => {
  number = +number
  digits = +digits
  if (digits > 20 || digits < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString()
  }
  if (typeof digits === 'undefined' || digits === 0) {
    return Math.round(number).toString()
  }

  let result = number.toString()
  const arr = result.split('.')

  // 整数的情况
  if (arr.length < 2) {
    return `${result}${flag ? `.${new Array(digits).fill(0).join('')}` : ''}`
  }

  const [integer, decimal] = arr
  if (decimal.length === digits) {
    return result
  }

  if (decimal.length < digits) {
    return `${result}${flag ? `.${new Array(digits - decimal.length).fill(0).join('')}` : ''}`
  }

  result = integer + '.' + decimal.substr(0, digits)
  const last = decimal.substr(digits, 1)
  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, digits)
    result = (Math.round(parseFloat(result) * x) + (integer >= 0 ? 1 : -1)) / x
    result = result.toFixed(digits)
  }

  return result
}

/**
 * @description: 将数字转化为 DK000+100
 * 最少 6 位数字, 不够前面补 0, 千位及以上和千位以下用 + 分隔
 * @param {String} number
 * @param {String} prefix
 * @return {String} result
 */
export const formatMileage = (number, prefix = '') => {
  if (checkEmpty(number)) {
    return ''
  } else {
    const reg = /(?!^)(?=(\d{3})$)/
    number = number + ''
    let [left, right] = number.split('.')
    return `${prefix}${left.padStart(6, '0').replace(reg, '+')}${right ? `.${right}` : ''}`
  }
}

/**
 * @description: 根据类型返回 placeholder
 * @param {String} type
 * @return {String} result
 */
export const handlePlaceholder = type => {
  if (['text', 'textarea', 'integer', 'decimal', 'input'].includes(type)) {
    return '请输入'
  } else if (
    ['select', 'radio', 'checkbox', 'date', 'cascader', 'switch', 'time', 'choose'].includes(type)
  ) {
    return '请选择'
  } else {
    return ''
  }
}

export default {
  upperFirst,
  firstUpperCase,
  findTreeNodeById,
  findTreeNodesByIds,
  getTreeMaxLevel,
  listToTree,
  formatTime,
  isObject,
  deepClone,
  arrRemove,
  findVal,
  findVals,
  checkEmpty,
  checkParam,
  checkProps,
  toFixed,
  formatMileage,
  handlePlaceholder
}
