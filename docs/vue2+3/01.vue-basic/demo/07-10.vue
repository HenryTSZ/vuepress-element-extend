<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <input type="text" placeholder="按下 CapsLock 提示输入" @keydown.caps-lock="showInfo" />
  </div>
</template>

<script>
export default {
  name: 'Demo7-10',
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
