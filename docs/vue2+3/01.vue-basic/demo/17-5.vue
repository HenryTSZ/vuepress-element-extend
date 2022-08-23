<template>
  <div>
    <h2 v-pre>Vue 其实很简单</h2>
    <h2>当前的 n 值是:{{ n }}</h2>
    <button @click="n++">点我 n+1</button>
  </div>
</template>

<script>
export default {
  name: 'Demo17-5',
  data() {
    return { n: 1 }
  }
}
</script>
