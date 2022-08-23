<template>
  <div>
    <!-- 遍历数组 -->
    <h2>对比 index 与 唯一且不变的值 作为 key 的效果</h2>
    <p>测试路径：先在每个 input 中输入一些文字，再点击 添加一个老刘 按钮</p>
    <h2>人员列表（key=index）</h2>
    <ul>
      <li v-for="(p, index) of persons" :key="index">
        {{ p.name }}-{{ p.age }}
        <input type="text" />
      </li>
    </ul>
    <h2>人员列表（key=id）</h2>
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
  name: 'Demo13-2',
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
