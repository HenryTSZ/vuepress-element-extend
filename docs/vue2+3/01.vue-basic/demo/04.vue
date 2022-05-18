<template>
  <h1>你好，{{ name }}</h1>
</template>

<script>
export default {
  data() {
    console.log('@@@', this) //此处的 this 是 Vue 实例对象
    return {
      name: '尚硅谷'
    }
  }
}
</script>
