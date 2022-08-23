<template>
  <div>
    <h2>{{ name }}</h2>
    <h2>当前的 n 值是：<span v-text="n"></span></h2>
    <!-- <h2>放大 10 倍后的 n 值是：<span v-big-number="n"></span> </h2> -->
    <h2>放大 10 倍后的 n 值是：<span v-big="n"></span></h2>
    <button @click="n++">点我 n+1</button>
    <hr />
    <input type="text" v-fbind:value="n" />
  </div>
</template>

<script>
export default {
  name: 'Demo18-1',
  data() {
    return {
      name: '尚硅谷',
      n: 1
    }
  },
  directives: {
    //big 函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
    /* 'big-number'(element,binding){
        // console.log('big')
        element.innerText = binding.value * 10
      }, */
    big(element, binding) {
      console.log('big', this) //注意此处的 this 是 window
      // console.log('big')
      element.innerText = binding.value * 10
    },
    fbind: {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element, binding) {
        setTimeout(() => {

          element.focus()
        }, 1000);
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value
      }
    }
  }
}
</script>
