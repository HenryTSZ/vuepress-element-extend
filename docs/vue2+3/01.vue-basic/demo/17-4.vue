<template>
  <div>
    <h2 v-once>初始化的 n 值是:{{ n }}</h2>
    <h2>当前的 n 值是:{{ n }}</h2>
    <button @click="n++">点我 n+1</button>
  </div>
</template>

<script>
export default {
  name: 'Demo17-4',
  data() {
    return { n: 1 }
  }
}
</script>
