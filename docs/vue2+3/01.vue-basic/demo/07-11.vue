<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <input type="text" placeholder="按下 ctrl 提示输入" @keyup.ctrl="showInfo" />
  </div>
</template>

<script>
export default {
  name: 'Demo7-11',
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
