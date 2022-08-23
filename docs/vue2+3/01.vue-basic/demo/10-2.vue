<template>
  <div>
    <h2>今天天气很{{ info }}</h2>
    <button @click="changeWeather">切换天气</button>
  </div>
</template>

<script>
export default {
  name: 'Demo10-2',
  data() {
    return {
      isHot: true
    }
  },
  computed: {
    info() {
      return this.isHot ? '炎热' : '凉爽'
    }
  },
  methods: {
    changeWeather() {
      this.isHot = !this.isHot
    }
  },
  watch: {
    isHot: {
      immediate: true, //初始化时让 handler 调用一下
      //handler 什么时候调用？当 isHot 发生改变时。
      handler(newValue, oldValue) {
        console.log('isHot 被修改了', newValue, oldValue)
      }
    }
  }
}
</script>
