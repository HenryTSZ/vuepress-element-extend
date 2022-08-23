<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- 修饰符可以连续写 -->
    <div class="demo1" @click="showInfo">
      <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo7-8',
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
