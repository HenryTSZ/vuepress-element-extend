<template>
  <div>
    <h3>a 的值是:{{ numbers.a }}</h3>
    <button @click="numbers.a++">点我让 a+1</button>
    <h3>b 的值是:{{ numbers.b }}</h3>
    <button @click="numbers.b++">点我让 b+1</button>
    <br />
    <br />
    <button @click="numbers = { a: 666, b: 888 }">彻底替换掉 numbers</button>
  </div>
</template>

<script>
export default {
  name: 'Demo10-3',
  data() {
    return {
      numbers: {
        a: 1,
        b: 1
      }
    }
  },
  watch: {
    //监视多级结构中某个属性的变化
    'numbers.a': {
      handler() {
        console.log('a 被改变了')
      }
    },
    //监视多级结构中所有属性的变化
    numbers: {
      deep: true,
      handler() {
        console.log('numbers 改变了')
      }
    }
  }
}
</script>
