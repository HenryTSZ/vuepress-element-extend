<template>
  <div>
    <h2 :style="{ opacity }">欢迎学习Vue</h2>
    <button @click="opacity = 1">透明度设置为1</button>
    <button @click="stop">点我停止变换</button>
  </div>
</template>

<script>
export default {
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
  //Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
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
    console.log('vm即将驾鹤西游了')
  }
}
</script>
