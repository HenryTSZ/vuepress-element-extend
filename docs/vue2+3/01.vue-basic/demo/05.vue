<template>
  <div>
    <h1>学校名称：{{ name }}</h1>
    <h1>学校地址：{{ address }}</h1>
    <!-- <h1>测试一下 1：{{ 1 + 1 }}</h1>
    <h1>测试一下 2：{{ $options }}</h1>
    <h1>测试一下 3：{{ $emit }}</h1>
    <h1>测试一下 4：{{ _c }}</h1> -->
  </div>
</template>

<script>
export default {
  data() {
    return { name: '尚硅谷', address: '北京' }
  }
}
</script>
