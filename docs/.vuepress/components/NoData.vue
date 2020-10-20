<template>
  <div class="no-data">{{ message || '暂无数据' }}</div>
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
.no-data {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #5e7382;
}
</style>
