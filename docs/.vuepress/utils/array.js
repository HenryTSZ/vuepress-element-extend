/**
 * @Author: weilan
 * @Date: 2019-12-02
 */
'use strict'
import dayjs from 'dayjs' // 导入日期js

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */
function flattenDeep(arr = [], childs = 'Children') {
  return arr.reduce((flat, item) => {
    return flat.concat(item, item[childs] ? flattenDeep(item[childs], childs) : [])
  }, [])
}

/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 筛选出数组中最大值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMax(arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key])
  let _t = !stamp ? _o : _o.map(i => dayjs(i).valueOf())
  return Math.max(..._t)
}

/**
 * 筛选出数组中最小值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMin(arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key])
  let _t = !stamp ? _o : _o.map(i => dayjs(i).valueOf())
  return Math.min(..._t)
}

export {
  flattenDeep, // 将树转化为一维数组
  deepClone, // 深拷贝
  getMax, // 获取最大值
  getMin // 获取最小值
}
