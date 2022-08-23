<template>
  <div>
    <h2>sessionStorage</h2>
    <button @click="saveData()">点我保存一个数据</button>
    <button @click="readData()">点我读取一个数据</button>
    <button @click="deleteData()">点我删除一个数据</button>
    <button @click="deleteAllData()">点我清空一个数据</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    saveData() {
      sessionStorage.setItem('msg', 'hello!!!')
      sessionStorage.setItem('msg2', 666)
      let p = { name: '张三', age: 18 }
      sessionStorage.setItem('person', JSON.stringify(p))
    },
    readData() {
      console.log('msg:', sessionStorage.getItem('msg'))
      console.log('msg2:', sessionStorage.getItem('msg2'))

      const result = sessionStorage.getItem('person')
      console.log('person:', JSON.parse(result))

      console.log('msg3:', sessionStorage.getItem('msg3'))
    },
    deleteData() {
      sessionStorage.removeItem('msg2')
    },
    deleteAllData() {
      sessionStorage.clear()
    }
  }
}
</script>
