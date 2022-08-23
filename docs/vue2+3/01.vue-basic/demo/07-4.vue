<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- 事件只触发一次（常用）-->
    <button @click="showInfo">点我提示信息</button>
    <button @click.once="showInfo">点我提示信息（只触发一下）</button>
  </div>
</template>

<script>
export default {
  name: 'Demo7-4',
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

<style>
.demo1 {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: skyblue;
}
</style>
