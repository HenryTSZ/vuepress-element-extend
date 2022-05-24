<template>
  <div>
    姓：<input type="text" v-model="firstName" /> <br /><br />
    名：<input type="text" v-model="lastName" /> <br /><br />
    测试：<input type="text" v-model="x" /> <br /><br />
    全名：<span>{{ fullName }}</span> <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '张',
      lastName: '三',
      x: '你好'
    }
  },
  computed: {
    fullName: {
      get() {
        console.log('get 被调用了')
        // console.log(this) //此处的 this 是 vm
        return this.firstName + '-' + this.lastName
      },
      set(value) {
        console.log('set', value)
        const arr = value.split('-')
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    }
  }
}
</script>
