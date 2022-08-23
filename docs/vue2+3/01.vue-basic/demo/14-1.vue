<template>
  <div>
    <h2>人员列表</h2>
    <p>点击一个按钮测试功能后，如需测试另一个按钮的功能，请先刷新页面</p>
    <button @click="updateMei">更新马冬梅的信息 (奏效)</button>
    <button @click="updateMei2">更新马冬梅的信息 (不奏效)</button>
    <ul>
      <li v-for="p of persons" :key="p.id">{{ p.name }}-{{ p.age }}-{{ p.sex }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Demo14-1',
  data() {
    return {
      persons: [
        { id: '001', name: '马冬梅', age: 30, sex: '女' },
        { id: '002', name: '周冬雨', age: 31, sex: '女' },
        { id: '003', name: '周杰伦', age: 18, sex: '男' },
        { id: '004', name: '温兆伦', age: 19, sex: '男' }
      ]
    }
  },
  methods: {
    updateMei() {
      this.persons[0].name = '马老师' //奏效
      this.persons[0].age = 50 //奏效
      this.persons[0].sex = '男' //奏效
    },
    updateMei2() {
      this.persons[0] = { id: '001', name: '马老师', age: 50, sex: '男' } //不奏效
    }
  }
}
</script>
