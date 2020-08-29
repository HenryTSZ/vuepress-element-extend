<template>
  <div class="u-editor" :style="{ height }">
    <!-- 利用 iframe 可以使 reset.css 不起作用；动态 src 是为了重新加载 html 页面，避免缓存 -->
    <iframe
      :id="iframeId"
      v-if="disabled"
      :src="src"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
    <script v-else :id="ueId" type="text/plain" name="content" />
  </div>
</template>

<script>
import { checkProps } from 'utils'

const EDITOR_SCRIPT_ID = 'editorScriptTag'
const EDITOR_CONFIG_ID = 'configScriptTag'

export default {
  name: 'UEditor',
  data() {
    return {
      ueId: `editor_${Math.random()
        .toString()
        .substr(2)}`,
      iframeId: `iframe_${Math.random()
        .toString()
        .substr(2)}`,
      instance: null,
      innerModify: false,
      editorReady: false,
      isFocus: false,
      src: '',
      baseConfig: {
        UEDITOR_HOME_URL: '/ue/',
        serverUrl: '/ue/jsp/config.json',
        initialFrameWidth: '100%'
      }
    }
  },
  props: {
    path: checkProps.strDef('/ue/'),
    config: checkProps.objDef({}),
    value: checkProps.strDef(''),
    disabled: checkProps.boolDef(false),
    height: checkProps.strDef('auto')
  },
  watch: {
    value(val) {
      if (this.disabled) {
        // 将 editor 中的内容保存到 sessionStorage
        sessionStorage.setItem(this.iframeId, val)
        this.src = `/ueditor.html?id=${this.iframeId}&_t=${Date.now()}`
        this.resizeHeight()
        return
      }
      if (this.innerModify) {
        this.innerModify = false
        return this.innerModify
      }
      this.setContent(val)
    }
  },
  methods: {
    setEnabled() {
      this.instance && this.instance.setEnabled()
    },
    setHide() {
      this.instance && this.instance.setHide()
    },
    clearDoc() {
      this.instance && this.instance.execCommand('cleardoc')
    },
    getContent() {
      return this.instance && this.instance.getContent()
    },
    setContent(html) {
      this.editorReady
        ? this.instance.setContent(html)
        : setTimeout(() => this.setContent(html), 100)
    },
    initEditor() {
      if (!window.UE || this.instance) return
      let inter = setInterval(() => {
        if (window.UE.getEditor) {
          clearInterval(inter)
          this.instance = window.UE.getEditor(this.ueId, { ...this.baseConfig, ...this.config })
          // http://fex.baidu.com/ueditor/#qa-ready
          // this.instance.addListener('ready', this.doReady)
          this.instance.ready(this.doReady)
          this.instance.addListener('contentChange', this.contentChange)
          this.instance.addListener('blur', this.blur)
          this.instance.addListener('focus', this.focus)
        }
      }, 30)
    },
    blur() {
      this.contentChange()
      this.isFocus = false
    },
    focus() {
      this.isFocus = true
    },
    doReady() {
      this.$emit('ready', this.instance)
      this.editorReady = true
      // 设置编辑器内容区高度，但会出现滚动条
      // this.instance.setHeight(this.height === 'auto' ? 100 : this.height)
      this.instance.setContent(this.value)
    },
    contentChange() {
      const val = this.getContent()
      if (this.isFocus) {
        this.innerModify = true
        this.$emit('input', val)
        setTimeout(() => {
          this.innerModify = false
        })
      }
    },
    async insertScript() {
      await Promise.all([
        this.insert(EDITOR_SCRIPT_ID, 'ueditor.all.min.js'),
        this.insert(EDITOR_CONFIG_ID, 'ueditor.config.js')
      ]).then(() => {
        this.initEditor()
      })
    },
    async insert(id, fileName) {
      let s = document.getElementById(id)
      if (s) {
        return Promise.resolve()
      }
      s = document.createElement('script')
      s.src = this.path + fileName
      s.id = id
      const head = document.head || document.getElementsByTagName('head')[0]
      head.appendChild(s)
      return new Promise(resolve => s.addEventListener('load', () => resolve()))
    },
    resizeHeight() {
      if (this.height === 'auto') {
        this.$nextTick(() => {
          let iframe = document.getElementById(this.iframeId)
          iframe.setAttribute('height', '0px')
          // iframe.style.visibility = 'hidden'
          iframe.onload = function() {
            this.setAttribute(
              'height',
              this.contentWindow.document.documentElement.scrollHeight + 'px'
            )
            // this.style.visibility = 'visible'
          }
        })
      }
    }
  },
  created() {
    if (this.disabled) {
      sessionStorage.setItem(this.iframeId, this.value)
      this.src = `/ueditor.html?id=${this.iframeId}&_t=${Date.now()}`
      // 如果 iframe 父元素未设置高度，让 iframe 撑开
      this.resizeHeight()
    } else {
      if (window.UE) {
        this.initEditor()
      } else {
        this.insertScript()
      }
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem(this.iframeId)
    if (this.instance) {
      this.instance.removeListener('ready', this.doReady)
      this.instance.removeListener('contentChange', this.contentChange)
      this.instance.removeListener('blur', this.blur)
      this.instance.removeListener('focus', this.focus)
      this.instance.destroy()
      this.instance = null
    }
  }
}
</script>

<style lang="less">
.u-editor {
  background: #fff;
  .edui-editor {
    min-height: 300px;
  }

  .edui-editor-toolbarboxouter {
    line-height: 1.42857143;
  }

  // 去掉本地保存成功提示
  .edui-default .edui-editor-messageholder {
    display: none;
  }
}
</style>
