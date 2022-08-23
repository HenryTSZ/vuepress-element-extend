<template>
  <div>
    <h1>插值语法</h1>
    <h3>你好，{{ name }}</h3>
    <hr />
    <h1>指令语法</h1>
    <a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{ school.name }}学习 1</a>
    <a :href="school.url" x="hello">点我去{{ school.name }}学习 2</a>
  </div>
</template>

<script>
export default {
  name: 'Demo2',
  data() {
    return {
      name: 'jack',
      school: {
        name: '尚硅谷',
        url: 'http://www.atguigu.com'
      }
    }
  }
}
</script>
