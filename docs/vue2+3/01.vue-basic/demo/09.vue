<template>
  <div>
    <button @click="window.alert(1)">alert</button>
    <button @click="log">console.log</button>
  </div>
</template>

<script>
export default {
  name: 'Demo9',
  data() {
    return { window }
  },
  methods: {
    log() {
      console.log(111)
    }
  }
}
</script>
