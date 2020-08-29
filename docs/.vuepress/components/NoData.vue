<template>
  <div class="no-data-wrp">{{ message || '暂无数据' }}</div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    message: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="less">
.no-data-wrp {
  width: 100%;
  line-height: 32px;
  margin-top: 68px;
  font-size: 14px;
  color: #5e7382;
  text-align: center;
}
</style>
