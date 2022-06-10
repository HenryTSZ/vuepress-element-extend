<template>
  <div>
    <h2 v-text="n"></h2>
    <h2>当前的n值是：{{ n }}</h2>
    <button @click="add">点我n+1</button>
    <button @click="bye">点我销毁vm</button>
  </div>
</template>

<script>
export default {
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
      console.log('n变了')
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
