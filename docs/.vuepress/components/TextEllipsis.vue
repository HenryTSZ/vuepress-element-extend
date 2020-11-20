<template>
  <el-tooltip
    class="text-ellipsis"
    v-bind="$attrs"
    :disabled="disabled"
    :content="content"
    :open-delay="openDelay"
  >
    <div :style="{ '-webkit-line-clamp': lineClamp }" @mouseenter.stop="handleMouseEnter">
      {{ content }}
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'TextEllipsis',
  inheritAttrs: false,
  props: {
    content: {
      type: String,
      default: ''
    },
    lineClamp: {
      type: [Number, String],
      default: 1
    },
    openDelay: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    handleMouseEnter({ target }) {
      const { scrollHeight, clientHeight } = target
      this.disabled = scrollHeight - clientHeight + 0.01 <= clientHeight
    }
  }
}
</script>

<style lang="less" scoped>
:focus {
  outline: none;
}
.text-ellipsis {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>
