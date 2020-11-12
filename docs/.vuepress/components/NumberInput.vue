<template>
  <el-input v-model="model" v-bind="$attrs" @input="_input" v-on="listeners">
    <slot v-for="(value, key) in $slots" :name="key" :slot="key"></slot>
  </el-input>
</template>

<script>
export default {
  name: 'NumberInput',
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    type: {
      // integer: 整数, decimal: 小数
      type: String,
      default: 'decimal'
    },
    signed: {
      // plus: 正数, minus: 负数, all: 全部
      type: String,
      default: 'plus'
    },
    places: {
      //保留小数位数
      type: [Number, String],
      default: 2 //默认两位小数
    },
    Event: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
      model: this.value,
      temporary: this.value
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners, [this.Event]: this._input }
    },
    regs() {
      return {
        'integer-plus': /^\d+$/,
        'integer-minus': /^-\d*$/,
        'integer-all': /^-?\d*$/,
        'decimal-plus': new RegExp(`^\\d+(\\.\\d{0,${this.places}})?$`),
        'decimal-minus': new RegExp(`^-(\\d*|\\d+(\\.\\d{0,${this.places}})?)$`),
        'decimal-all': new RegExp(`^-?(\\d*|\\d+(\\.\\d{0,${this.places}})?)$`)
      }
    },
    regName() {
      return `${this.type}-${this.signed}`
    },
    reg() {
      return this.regs[this.regName]
    }
  },
  watch: {
    value(n) {
      this.temporary = n
    },
    temporary(n, o) {
      n = n + ''
      if (n && !this.reg.test(n)) {
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
    }
  },
  created() {
    const val = this.value + ''
    if (val && !this.reg.test(val)) {
      this.temporary = ''
    }
  }
}
</script>
