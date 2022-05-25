<template>
  <div>
    姓：<input type="text" v-model="firstName" /> <br /><br />
    名：<input type="text" v-model="lastName" /> <br /><br />
    全名：<span>{{ fullName }}</span> <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '张',
      lastName: '三',
      fullName: '张 - 三'
    }
  },
  watch: {
    firstName(val) {
      setTimeout(() => {
        console.log(this)
        this.fullName = val + '-' + this.lastName
      }, 1000)
    },
    lastName(val) {
      this.fullName = this.firstName + '-' + val
    }
  }
}
</script>
