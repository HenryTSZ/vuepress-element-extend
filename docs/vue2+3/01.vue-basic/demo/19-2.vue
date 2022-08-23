<template>
  <div>
    <h2 v-text="n"></h2>
    <h2>当前的 n 值是：{{ n }}</h2>
    <button @click="add">点我 n+1</button>
    <button @click="bye">点我销毁 vm</button>
  </div>
</template>

<script>
export default {
  name: 'Demo19-2',
  data() {
    return {
      n: 1
    }
  },
  methods: {
    add() {
      console.log('add')
      this.n++
    },
    bye() {
      console.log('bye')
      this.$destroy()
    }
  },
  watch: {
    n() {
      console.log('n 变了')
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>
