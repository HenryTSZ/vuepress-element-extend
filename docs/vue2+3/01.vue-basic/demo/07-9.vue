<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo" />
    <input type="text" placeholder="按下删除或推格提示输入" @keydown.delete="showInfo" />
    <input type="text" placeholder="按下 esc 提示输入" @keydown.esc="showInfo" />
    <input type="text" placeholder="按下空格提示输入" @keydown.space="showInfo" />
    <input type="text" placeholder="按下 tab 提示输入" @keydown.tab="showInfo" />
    <input type="text" placeholder="按下上方向键提示输入" @keydown.up="showInfo" />
    <input type="text" placeholder="按下下方向键提示输入" @keydown.down="showInfo" />
    <input type="text" placeholder="按下左方向键提示输入" @keydown.left="showInfo" />
    <input type="text" placeholder="按下右方向键提示输入" @keydown.right="showInfo" />
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
