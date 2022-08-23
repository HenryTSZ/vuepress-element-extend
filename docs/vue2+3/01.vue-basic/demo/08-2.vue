<template>
  <div>
    姓：<input type="text" v-model="firstName" /> <br /><br />
    名：<input type="text" v-model="lastName" /> <br /><br />
    全名：<span>{{ fullName() }}</span>
  </div>
</template>

<script>
export default {
  name: 'Demo8-2',
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  methods: {
    fullName() {
      console.log('@---fullName')
      return this.firstName + '-' + this.lastName
    }
  }
}
</script>
