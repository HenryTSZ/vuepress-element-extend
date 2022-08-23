<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <h3>使用事件的冒泡模式（默认）</h3>
    <div class="demo1" @click="showInfo(1)">
      <button @click="showInfo(2)">点我提示信息</button>
    </div>
    <h3>使用事件的捕获模式</h3>
    <div class="demo1" @click.capture="showInfo(1)">
      <button @click="showInfo(2)">点我提示信息</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo7-5',
  data() {
    return {
      name: '尚硅谷'
    }
  },
  methods: {
    showInfo(msg) {
      alert(msg)
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
