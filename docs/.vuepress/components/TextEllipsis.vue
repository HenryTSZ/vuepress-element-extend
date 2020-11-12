<template>
  <el-tooltip class="text-ellipsis" v-bind="$attrs" :disabled="disabled" :content="content">
    <div @mouseenter.stop="handleMouseEnter">
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
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    handleMouseEnter(e) {
      const { scrollWidth, offsetWidth } = e.target
      this.disabled = scrollWidth <= offsetWidth
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
