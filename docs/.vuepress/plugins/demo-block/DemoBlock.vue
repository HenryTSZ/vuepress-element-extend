<template>
  <div
    class="demo-block"
    :class="[blockClass, { hover: hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="demo-content">
      <slot name="demo"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" ref="description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
      <div class="code-content" ref="codeContent">
        <slot name="source"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      :style="{ width: fixedControl ? `${codeContentWidth}px` : 'unset' }"
      ref="control"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { hovering: hovering }, 'icon']"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <span
        v-show="hovering && !copied"
        :class="['copy-action', { 'copying ': copied }]"
        @click.stop="copyCode"
        >{{ copiedText }}</span
      >
      <transition name="bounce">
        <span v-show="copied" class="copy-action copy-action-success">{{ copiedText }}</span>
      </transition>
    </div>
  </div>
</template>

<script type="text/babel">
import defaultLang from './i18n/default_lang.json'
export default {
  data() {
    return {
      hovering: false,
      copied: false,
      isExpanded: false,
      fixedControl: false,
      codeContentWidth: 0,
      scrollParent: null
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    compoLang() {
      return this.options.locales || defaultLang
    },
    langConfig() {
      return this.compoLang.find(config => config.lang === this.$lang)['demo-block']
    },
    blockClass() {
      return `demo-${this.$lang} demo-${this.$router.currentRoute.path.split('/').pop()}`
    },
    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text']
    },
    copiedText() {
      return this.copied ? this.langConfig['copy-success'] : this.langConfig['copy-text']
    },
    codeArea() {
      return this.$refs.meta
    },
    codeDescription() {
      return this.$refs.description
    },
    codeContent() {
      return this.$refs.codeContent
    },
    codeControl() {
      return this.$refs.control
    },
    codeAreaHeight() {
      if (this.codeDescription) {
        return this.codeDescription.clientHeight + this.codeContent.clientHeight + 20
      }
      return this.codeContent.clientHeight
    }
  },
  methods: {
    copyCode() {
      if (this.copied) {
        return
      }
      const pre = this.$el.querySelectorAll('pre')[0]
      pre.setAttribute('contenteditable', 'true')
      pre.focus()
      document.execCommand('selectAll', false, null)
      this.copied = document.execCommand('copy')
      pre.removeAttribute('contenteditable')
      setTimeout(() => {
        this.copied = false
      }, 1500)
    },
    scrollHandler() {
      const { top, bottom, left } = this.codeArea.getBoundingClientRect()
      const documentClientHeight = document.documentElement.clientHeight
      this.fixedControl = bottom > documentClientHeight && top + 44 <= documentClientHeight
      this.codeControl.style.left = this.fixedControl ? `${left}px` : '0'
    },
    removeScrollHandler() {
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
      if (!val) {
        this.fixedControl = false
        this.codeControl.style.left = '0'
        this.removeScrollHandler()
        return
      }
      setTimeout(() => {
        this.scrollParent = document
        this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 200)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.codeContentWidth = this.$el.offsetWidth
      if (!this.codeDescription) {
        this.codeContent.style.width = '100%'
        this.codeContent.borderRight = 'none'
      }
    })
  },
  beforeDestroy() {
    this.removeScrollHandler()
  }
}
</script>
<style scoped lang="less">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin-top: 15px;
  margin-bottom: 15px;
  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  .demo-button {
    float: right;
  }
  .demo-content {
    padding: 24px;
  }
  .meta {
    background-color: #fafafa;
    border-top: solid 1px #ebebeb;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
  }
  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -2px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 660px;
      z-index: 999;
    }
    .caret-top {
      &::before {
        content: '';
        position: absolute;
        right: 50%;
        width: 0;
        height: 0;
        border-bottom: 6px solid #ccc;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    }
    .caret-bottom {
      &::before {
        content: '';
        position: absolute;
        right: 50%;
        width: 0;
        height: 0;
        border-top: 6px solid #ccc;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    }
    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }
    & > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }
    .copy-action {
      right: 0px;
      color: #409eff;
    }
    &.copying {
      transform: translateX(-44px);
    }
    .copy-action-success {
      color: #67c23a;
    }
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    .bounce-enter-active {
      animation: bounce-in 0.5s;
    }
  }
}
.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
