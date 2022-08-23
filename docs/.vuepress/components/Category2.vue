<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现 1</slot>
    <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现 2</slot>
  </div>
</template>

<script>
export default {
  name: 'Category2',
  props: ['title']
}
</script>

<style scoped>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
.foot {
  display: flex;
  justify-content: space-around;
}
h3 {
  text-align: center;
  background-color: orange;
}
video {
  width: 100%;
}
img {
  width: 100%;
}
</style>
