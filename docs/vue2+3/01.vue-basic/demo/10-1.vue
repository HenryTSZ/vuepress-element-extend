<template>
  <div>
    <h2>今天天气很{{ info }}</h2>
    <!-- 绑定事件的时候：@xxx="yyy" yyy 可以写一些简单的语句 -->
    <!-- <button @click="isHot = !isHot">切换天气</button> -->
    <button @click="changeWeather">切换天气</button>
  </div>
</template>

<script>
export default {
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
  }
}
</script>
