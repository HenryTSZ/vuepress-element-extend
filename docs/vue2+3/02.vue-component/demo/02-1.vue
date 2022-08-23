<template>
  <div>
    <hello></hello>
    <hr />
    <h1>{{ msg }}</h1>
    <hr />
    <school></school>
    <hr />
    <student></student>
  </div>
</template>

<script>
export default {
  name: '02-1',
  data() {
    return {
      msg: '你好啊！'
    }
  }
}
</script>
