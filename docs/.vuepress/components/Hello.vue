<template>
  <div>
    <h2>你好啊！{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      name: 'Tom'
    }
  }
}
</script>
