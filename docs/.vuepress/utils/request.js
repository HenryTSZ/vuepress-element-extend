import Axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'

/**
 * get
 * @param  {String} url -必选   [地址]
 * @param  {Object} params -可选 [参数]
 * @param  { Boolean } isLoading -可选 [是否显示加载状态, 默认渐变显示, 初始为透明, 2s 后显示, 通过 css 控制]
 * @return {Object}        [Promise]
 */
export const $get = (url, params, isLoading = true) => {
  // 遮罩层
  let loadingInstance = null
  if (isLoading) {
    loadingInstance = Loading.service({ text: '正在加载中' })
  }
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: {
        ...params,
        _t: Date.now()
      }
    })
      .then(res => {
        if (isLoading) {
          loadingInstance.close()
        }
        if (res.status === 200) {
          const { code, message } = res.data
          if (code === 0) {
            resolve(res.data)
          } else if (code === 401) {
            toLogin(message)
          } else {
            failMessage(message)
            reject(res)
          }
        } else {
          failMessage()
          reject(res)
        }
      })
      .catch(mes => {
        if (isLoading) {
          loadingInstance.close()
        }
        failMessage(mes.response.data.message)
        reject(mes.response.data)
      })
  })
}
/**
 * post
 * @param  {String} url -必选   [地址]
 * @param  {Object || Array} params -必选 [参数]
 * @param  {String} type -可选  [设定为 form 为 formdata 提交]
 * @param  { Boolean } isLoading -可选 [是否显示加载状态, 默认渐变显示, 初始为透明, 2s 后显示, 通过 css 控制]
 * @return {Object}        [Promise]
 */
export const $post = (url, params, type, isLoading = true) => {
  let loadingInstance = null
  if (isLoading) {
    loadingInstance = Loading.service({ text: '正在加载中' })
  }
  params = type === 'form' ? qs.stringify(params) : params
  return new Promise((resolve, reject) => {
    Axios.post(url, params, {})
      .then(res => {
        if (isLoading) {
          loadingInstance.close()
        }
        if (res.status === 200) {
          const { code, message } = res.data
          if (code === 0) {
            resolve(res.data)
          } else if (code === 401) {
            toLogin(message)
          } else {
            failMessage(message)
            reject(res)
          }
        } else {
          failMessage()
          reject(res)
        }
      })
      .catch(mes => {
        if (isLoading) {
          loadingInstance.close()
        }
        failMessage()
        reject(mes.response.data)
      })
  })
}

function failMessage(message = '数据获取失败') {
  Message({
    showClose: true,
    message,
    type: 'warning'
  })
}

function toLogin() {
  window.top.location.href = '/resources/web/Base/Login/index.html'
}
