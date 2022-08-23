<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <input type="text" placeholder="只有按下 ctrl + y 才提示输入" @keydown.ctrl.y="showInfo" />
  </div>
</template>

<script>
export default {
  name: 'Demo7-13',
  data() {
    return {
      name: '尚硅谷'
    }
  },
  methods: {
    showInfo(e) {
      alert(e.target.value)
    }
  }
}
</script>
