<template>
  <div>
    <h2>显示格式化后的时间</h2>
    <p>计算属性实现</p>
    <h3>现在是：{{ fmtTime }}</h3>
    <p>methods 实现</p>
    <h3>现在是：{{ getFmtTime() }}</h3>
    <p>过滤器实现</p>
    <h3>现在是：{{ time | timeFormatter }}</h3>
    <p>过滤器实现（传参）</p>
    <h3>现在是：{{ time | timeFormatter('YYYY_MM_DD') | mySlice }}</h3>
    <h3 :x="msg | mySlice">尚硅谷</h3>
  </div>
</template>

<script>
const dayjs = require('dayjs')

export default {
  data() {
    return {
      time: 1621561377603, //时间戳
      msg: '你好，尚硅谷'
    }
  },
  computed: {
    fmtTime() {
      return dayjs(this.time).format('YYYY 年 MM 月 DD 日 HH:mm:ss')
    }
  },
  methods: {
    getFmtTime() {
      return dayjs(this.time).format('YYYY 年 MM 月 DD 日 HH:mm:ss')
    }
  },
  //局部过滤器
  filters: {
    timeFormatter(value, str = 'YYYY 年 MM 月 DD 日 HH:mm:ss') {
      // console.log('@',value)
      return dayjs(value).format(str)
    },
    mySlice(value) {
      return value.slice(0, 4)
    }
  }
}
</script>
