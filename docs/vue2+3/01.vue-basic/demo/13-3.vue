<template>
  <div>
    <h2>在 ul 中循环两个 li</h2>
    <p>控制台会报错：Duplicate keys detected: '001'. This may cause an update error.</p>
    <p>但目前测试更新正常</p>
    <ul>
      <li v-for="p of persons" :key="p.id">
        {{ p.name }}-{{ p.age }}
        <input type="text" />
      </li>
      <li v-for="p of persons" :key="p.id">
        {{ p.name }}-{{ p.age }}
        <input type="text" />
      </li>
    </ul>
    <h2>分别在 ul 中 循环 li</h2>
    <p>不报错，更新也正常</p>
    <ul>
      <li v-for="p of persons" :key="p.id">
        {{ p.name }}-{{ p.age }}
        <input type="text" />
      </li>
    </ul>
    <ul>
      <li v-for="p of persons" :key="p.id">
        {{ p.name }}-{{ p.age }}
        <input type="text" />
      </li>
    </ul>
    <br />
    <button @click.once="add">添加一个老刘</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        { id: '001', name: '张三', age: 18 },
        { id: '002', name: '李四', age: 19 },
        { id: '003', name: '王五', age: 20 }
      ]
    }
  },
  methods: {
    add() {
      const p = { id: '004', name: '老刘', age: 40 }
      this.persons.unshift(p)
    }
  }
}
</script>
