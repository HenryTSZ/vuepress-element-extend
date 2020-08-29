<!--
 * @Author: HenryTSZ
 * @Date: 2020-08-18 16:46:52
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-19 10:03:20
-->
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
.text-ellipsis {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
