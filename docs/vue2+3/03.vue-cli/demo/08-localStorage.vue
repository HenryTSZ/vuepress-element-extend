<template>
  <div>
    <h2>localStorage</h2>
    <button @click="saveData()">点我保存一个数据</button>
    <button @click="readData()">点我读取一个数据</button>
    <button @click="deleteData()">点我删除一个数据</button>
    <button @click="deleteAllData()">点我清空一个数据</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {
    saveData() {
      localStorage.setItem('msg', 'hello!!!')
      localStorage.setItem('msg2', 666)
      let p = { name: '张三', age: 18 }
      localStorage.setItem('person', JSON.stringify(p))
    },
    readData() {
      console.log('msg:', localStorage.getItem('msg'))
      console.log('msg2:', localStorage.getItem('msg2'))

      const result = localStorage.getItem('person')
      console.log('person:', JSON.parse(result))

      console.log('msg3:', localStorage.getItem('msg3'))
    },
    deleteData() {
      localStorage.removeItem('msg2')
    },
    deleteAllData() {
      localStorage.clear()
    }
  }
}
</script>
