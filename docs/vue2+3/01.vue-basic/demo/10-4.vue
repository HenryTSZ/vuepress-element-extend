<template>
  <div>
    <h2>今天天气很{{ info }}</h2>
    <button @click="changeWeather">切换天气</button>
  </div>
</template>

<script>
export default {
  name: 'Demo10-4',
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
    //正常写法
    /* isHot:{
        // immediate:true, //初始化时让 handler 调用一下
        // deep:true,//深度监视
        handler(newValue,oldValue){
          console.log('isHot 被修改了',newValue,oldValue)
        }
      }, */
    //简写
    isHot(newValue, oldValue) {
      console.log('isHot 被修改了', newValue, oldValue, this)
    }
  }
}
</script>
