<template>
  <div>
    <h2>欢迎来到{{ name }}学习</h2>
    <!-- <button v-on:click="showInfo">点我提示信息</button> -->
    <button @click="showInfo1">点我提示信息 1（不传参）</button>
    <button @click="showInfo2($event, 66)">点我提示信息 2（传参）</button>
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
    showInfo1(event) {
      // console.log(event.target.innerText)
      // console.log(this) //此处的 this 是 vm
      alert('同学你好！')
    },
    showInfo2(event, number) {
      console.log(event, number)
      // console.log(event.target.innerText)
      // console.log(this) //此处的 this 是 vm
      alert('同学你好！！')
    }
  }
}
</script>
