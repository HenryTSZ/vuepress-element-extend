<template>
  <div>
    姓：<input type="text" v-model="firstName" /> <br /><br />
    名：<input type="text" v-model="lastName" /> <br /><br />
    全名：<span>{{ firstName }}-{{ lastName }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  }
}
</script>
