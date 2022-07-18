<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我 number++</button>
    <button @click="sendStudentlName">把学生名给 App</button>
    <button @click="unbind">解绑 atguigu 事件</button>
    <button @click="death">销毁当前 Student 组件的实例 (vc)</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      sex: '男',
      number: 0
    }
  },
  methods: {
    add() {
      console.log('add 回调被调用了')
      this.number++
    },
    sendStudentlName() {
      //触发 Student 组件实例身上的 atguigu 事件
      this.$emit('atguigu', this.name, 666, 888, 900)
      // this.$emit('demo')
      // this.$emit('click')
    },
    unbind() {
      this.$off('atguigu') //解绑一个自定义事件
      // this.$off(['atguigu','demo']) //解绑多个自定义事件
      // this.$off() //解绑所有的自定义事件
    },
    death() {
      this.$destroy() //销毁了当前 Student 组件的实例，销毁后所有 Student 实例的自定义事件全都不奏效。
    }
  }
}
</script>

<style lang="less" scoped>
.student {
  background-color: pink;
  padding: 5px;
  margin-top: 30px;
}
</style>
