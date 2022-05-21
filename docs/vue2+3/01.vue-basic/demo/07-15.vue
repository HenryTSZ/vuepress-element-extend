<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- 已在全局配置了 Vue.config.keyCodes.huiche = 13 -->
    <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo" />
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
      alert(e.target.value)
    }
  }
}
</script>
