<template>
  <div>
    <h2 v-if="a">你好啊</h2>
    <h2 :style="{ opacity }">欢迎学习 Vue</h2>
  </div>
</template>

<script>
export default {
  name: 'Demo19-1',
  data() {
    return {
      a: false,
      opacity: 1
    }
  },
  //Vue 完成模板的解析并把初始的真实 DOM 元素放入页面后（挂载完毕）调用 mounted
  mounted() {
    console.log('mounted', this)
    setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  }
}
</script>
