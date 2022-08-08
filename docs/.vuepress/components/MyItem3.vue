<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了 props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
        type="text"
        v-show="todo.isEdit"
        :value="todo.title"
        @blur="handleBlur(todo, $event)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
export default {
  name: 'MyItem',
  //声明接收 todo
  props: ['todo'],
  methods: {
    //勾选 or 取消勾选
    handleCheck(id) {
      //通知 App 组件将对应的 todo 对象的 done 值取反
      // this.checkTodo(id)
      // this.$bus.$emit('checkTodo', id)
      this.pubsub.publish('checkTodo', id)
    },
    //删除
    handleDelete(id) {
      if (confirm('确定删除吗？')) {
        //通知 App 组件将对应的 todo 对象删除
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo',id)
        this.pubsub.publish('deleteTodo', id)
      }
    },
    //编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        // console.log('@')
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(function() {
        this.$refs.inputTitle.focus()
      })
    },
    //失去焦点回调（真正执行修改逻辑）
    handleBlur(todo, e) {
      todo.isEdit = false
      if (!e.target.value.trim()) return alert('输入不能为空！')
      // this.$bus.$emit('updateTodo', todo.id, e.target.value)
      this.pubsub.publish('updateTodo', { id: todo.id, title: e.target.value })
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
