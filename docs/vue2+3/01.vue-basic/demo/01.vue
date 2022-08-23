<template>
  <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</template>

<script>
  export default {
    name: 'Demo1',
    data() {
      return {
        name: 'atguigu',
        address: '北京'
      }
    }
  }
</script>
