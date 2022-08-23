<template>
  <div>
    <p>普通写法</p>
    单向数据绑定：<input type="text" v-bind:value="name" /><br />
    双向数据绑定：<input type="text" v-model:value="name" /><br />

    <p>简写</p>
    单向数据绑定：<input type="text" :value="name" /><br />
    双向数据绑定：<input type="text" v-model="name" /><br />

    <p>如下代码是错误的，因为 v-model 只能应用在表单类元素（输入类元素）上</p>
    <h2 v-model:x="name">你好啊</h2>
  </div>
</template>

<script>
export default {
  name: 'Demo3',
  data() {
    return {
      name: '尚硅谷'
    }
  }
}
</script>
