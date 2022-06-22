<template>
  <div>
    <h2>学生姓名：{{ studentName }}</h2>
    <h2>学生年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentName: '张三',
      age: 18
    }
  }
}
</script>
