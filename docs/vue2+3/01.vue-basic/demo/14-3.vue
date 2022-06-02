<template>
  <div>
    <h1>学校信息</h1>
    <button @click="addLeader">添加一个校长属性，默认值是一个帅气的男老师</button>
    <h2>学校名称：{{ school.name }}</h2>
    <h2>学校地址：{{ school.address }}</h2>
    <h2>校长是：{{ school.leader }}</h2>
    <hr />
    <h1>学生信息</h1>
    <button @click="addSex">添加一个性别属性，默认值是男</button>
    <h2>姓名：{{ student.name }}</h2>
    <h2 v-if="student.sex">性别：{{ student.sex }}</h2>
    <h2>年龄：真实{{ student.age.rAge }}，对外{{ student.age.sAge }}</h2>
    <h2>朋友们</h2>
    <ul>
      <li v-for="(f, index) in student.friends" :key="index">{{ f.name }}--{{ f.age }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school: {
        name: '尚硅谷',
        address: '北京'
      },
      student: {
        name: 'tom',
        age: {
          rAge: 40,
          sAge: 29
        },
        friends: [
          { name: 'jerry', age: 35 },
          { name: 'tony', age: 36 }
        ]
      }
    }
  },
  methods: {
    addLeader() {
      this.$set(this.school, 'leader', '一个帅气的男老师')
    },
    addSex() {
      this.$set(this.student, 'sex', '男')
    }
  }
}
</script>
