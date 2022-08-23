<template>
  <div>
    请在控制台查看输出
  </div>
</template>

<script>
export default {
  name: 'Demo14-2',
  created() {
    let data = {
      name: '尚硅谷',
      address: '北京'
    }

    //创建一个监视的实例对象，用于监视 data 中属性的变化
    const obs = new Observer(data)
    console.log(obs)

    //准备一个 vm 实例对象
    let vm = {}
    vm._data = data = obs

    function Observer(obj) {
      //汇总对象中所有的属性形成一个数组
      const keys = Object.keys(obj)
      //遍历
      keys.forEach(k => {
        Object.defineProperty(this, k, {
          get() {
            return obj[k]
          },
          set(val) {
            console.log(`${k}被改了，我要去解析模板，生成虚拟 DOM.....我要开始忙了`)
            obj[k] = val
          }
        })
      })
    }
  }
}
</script>
