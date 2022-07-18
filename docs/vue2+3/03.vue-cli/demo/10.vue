<template>
  <div class="app-10">
    <h1>{{ msg }}，学生姓名是:{{ studentName }}</h1>

    <!-- 通过父组件给子组件传递函数类型的 props 实现：子给父传递数据 -->
    <School5 :getSchoolName="getSchoolName" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用 @或 v-on） -->
    <Student5 @atguigu="getStudentName" @demo="m1" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用 ref） -->
    <Student5 ref="student" @click.native="show" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '你好啊！',
      studentName: ''
    }
  },
  methods: {
    getSchoolName(name) {
      console.log('App 收到了学校名：', name)
    },
    getStudentName(name, ...params) {
      console.log('App 收到了学生名：', name, params)
      this.studentName = name
    },
    m1() {
      console.log('demo 事件被触发了！')
    },
    show() {
      alert(123)
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.student.$on('atguigu', this.getStudentName) //绑定自定义事件
      // this.$refs.student.$once('atguigu',this.getStudentName) //绑定自定义事件（一次性）
    }, 500)
  }
}
</script>

<style>
.app-10 {
  background-color: gray;
  padding: 5px;
}
</style>
