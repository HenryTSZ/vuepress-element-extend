<template>
  <div>
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord" />
    <ul>
      <li v-for="(p, index) of filPersons" :key="index">{{ p.name }}-{{ p.age }}-{{ p.sex }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Demo13-4',
  data() {
    return {
      keyWord: '',
      persons: [
        { id: '001', name: '马冬梅', age: 19, sex: '女' },
        { id: '002', name: '周冬雨', age: 20, sex: '女' },
        { id: '003', name: '周杰伦', age: 21, sex: '男' },
        { id: '004', name: '温兆伦', age: 22, sex: '男' }
      ],
      filPerons: []
    }
  },
  watch: {
    keyWord: {
      immediate: true,
      handler(val) {
        this.filPersons = this.persons.filter(p => {
          return p.name.indexOf(val) !== -1
        })
      }
    }
  }
}
</script>
