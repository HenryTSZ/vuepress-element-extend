<template>
  <div>
    <h2 :style="{ opacity }">欢迎学习 Vue</h2>
    <button @click="opacity = 1">透明度设置为 1</button>
    <button @click="stop">点我停止变换</button>
  </div>
</template>

<script>
export default {
  name: 'Demo19-3',
  data() {
    return {
      opacity: 1
    }
  },
  methods: {
    stop() {
      this.$destroy()
    }
  },
  //Vue 完成模板的解析并把初始的真实 DOM 元素放入页面后（挂载完毕）调用 mounted
  mounted() {
    console.log('mounted', this)
    this.timer = setInterval(() => {
      console.log('setInterval')
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    console.log('vm 即将驾鹤西游了')
  }
}
</script>
