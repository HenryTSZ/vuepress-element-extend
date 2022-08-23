<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- 阻止事件冒泡（常用）-->
    <div class="demo1" @click="showInfo">
      <button @click="showInfo">点我提示信息（未阻止事件冒泡）</button>
      <button @click.stop="showInfo">点我提示信息（阻止事件冒泡）</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo7-3',
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
