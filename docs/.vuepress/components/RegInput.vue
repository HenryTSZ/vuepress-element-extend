<template>
  <el-input v-model="model" v-bind="$attrs" @input="_input" v-on="$listeners">
    <slot v-for="(value, key) in $slots" :name="key" :slot="key"></slot>
  </el-input>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'RegInput',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    reg: {
      type: RegExp,
      default() {
        return /./
      }
    }
  },
  data() {
    return {
      model: this.value,
      temporary: this.value
    }
  },
  watch: {
    value(n) {
      this.temporary = n
    },
    temporary(n, o) {
      n = n + ''
      if (this.test(n)) {
        n = o
        this.temporary = o
        return
      }
      this.model = n
      this.$emit('input', n)
    }
  },
  methods: {
    _input(val) {
      this.temporary = val
    },
    test(val) {
      return val && !this.reg.test(val)
    }
  },
  created() {
    const val = this.value + ''
    if (this.test(val)) {
      this.temporary = ''
    }
  }
}
</script>
