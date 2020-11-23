<template>
  <el-tooltip
    class="text-ellipsis"
    v-bind="$attrs"
    :disabled="disabled"
    :content="content"
    :open-delay="openDelay"
  >
    <div>
      <div
        class="text-ellipsis-content"
        :style="{ '-webkit-line-clamp': lineClamp }"
        @mouseenter.stop="handleMouseEnter"
      >
        {{ content }}
      </div>
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
      this.disabled = scrollHeight - clientHeight < clientHeight / this.lineClamp
    }
  }
}
</script>

<style lang="less" scoped>
:focus {
  outline: none;
}
.text-ellipsis {
  width: 100%;
  &-content {
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-box-orient: vertical;
  }
}
</style>
