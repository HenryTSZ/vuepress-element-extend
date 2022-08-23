<template>
  <div>
    <div>你好，{{ name }}</div>
    <div v-text="name"></div>
    <div v-text="str"></div>
  </div>
</template>

<script>
export default {
  name: 'Demo17-1',
  data() {
    return {
      name: '尚硅谷',
      str: '<h3>你好啊！</h3>'
    }
  }
}
</script>
