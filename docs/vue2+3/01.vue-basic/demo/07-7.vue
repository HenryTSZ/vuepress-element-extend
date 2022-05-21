<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <h3>wheel 默认模式：for 循环完成后，滚动条才滚动</h3>
    <ul @wheel="demo" class="demo-list">
      <li class="demo-li">1</li>
      <li class="demo-li">2</li>
      <li class="demo-li">3</li>
      <li class="demo-li">4</li>
    </ul>
    <h3>wheel passive：滚动条立即滚的，无需等待 for 循环执行完毕；</h3>
    <ul @wheel.passive="demo" class="demo-list">
      <li class="demo-li">1</li>
      <li class="demo-li">2</li>
      <li class="demo-li">3</li>
      <li class="demo-li">4</li>
    </ul>
    <h3>scroll 默认模式：滚动条立即滚的，无需等待 for 循环执行完毕；</h3>
    <ul @scroll="demo" class="demo-list">
      <li class="demo-li">1</li>
      <li class="demo-li">2</li>
      <li class="demo-li">3</li>
      <li class="demo-li">4</li>
    </ul>
    <h3>scroll passive：滚动条立即滚的，无需等待 for 循环执行完毕；</h3>
    <ul @scroll.passive="demo" class="demo-list">
      <li class="demo-li">1</li>
      <li class="demo-li">2</li>
      <li class="demo-li">3</li>
      <li class="demo-li">4</li>
    </ul>
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
    demo() {
      for (let i = 0; i < 10000; i++) {
        console.log('#')
      }
      console.log('累坏了')
    }
  }
}
</script>

<style>
.demo-list {
  width: 200px;
  height: 200px;
  background-color: peru;
  overflow: auto;
}

.demo-li {
  height: 100px;
}
</style>
