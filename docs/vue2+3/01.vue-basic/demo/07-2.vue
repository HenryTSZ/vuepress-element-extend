<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- 阻止默认事件（常用）-->
    <a href="http://www.atguigu.com" @click="showInfo">点我提示信息（未阻止默认事件）</a><br />
    <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息（阻止默认事件）</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '尚硅谷'
    }
  },
  methods: {
    showInfo(e) {
      alert('同学你好！')
      // console.log(e.target)
    }
  }
}
</script>
