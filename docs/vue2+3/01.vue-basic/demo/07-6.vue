<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <h3>默认模式</h3>
    <div class="demo1" @click="showInfo">
      <button @click="showInfo">点我提示信息</button>
    </div>
    <h3>只有 event.target 是当前操作的元素时才触发事件；</h3>
    <div class="demo1" @click.self="showInfo">
      <button @click="showInfo">点我提示信息</button>
    </div>
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
      console.log(e.target)
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
