<template>
  <div class="bar-arrow-chart h100">
    <span v-if="arrow" :class="['nav-arrow', 'nav-prev', { disabled: prev }]" @click="prevData()">
      <i class="el-icon-arrow-left"></i>
    </span>
    <span v-if="arrow" :class="['nav-arrow', 'nav-next', { disabled: next }]" @click="nextData()">
      <i class="el-icon-arrow-right"></i>
    </span>
    <bar-chart :options="data" @item-click="itemClick"></bar-chart>
  </div>
</template>

<script>
export default {
  name: 'BarArrowChart',
  mixins: [],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      arrow: false,
      prev: false,
      next: false,
      space: 4,
      num: 0,
      data: {}
    }
  },
  computed: {},
  watch: {
    options: {
      handler: function() {
        this.arrow = false
        this.prev = false
        this.next = false
        this.num = 0
        this.space = this.options.space || this.space
        if (this.options.xAxis) {
          this.nextData()
        } else {
          this.data = {}
        }
      },
      deep: true
    }
  },
  methods: {
    prevData() {
      if (!this.prev) {
        this.num--
        this.handleData()
      }
    },
    nextData() {
      if (!this.next) {
        this.num++
        this.handleData()
      }
    },
    handleData() {
      let len = this.options.xAxis.length
      this.data = {}
      this.$nextTick(() => {
        this.data = { ...this.options }
        this.data.xAxis = this.options.xAxis.slice(
          this.space * (this.num - 1),
          this.space * this.num
        )
        if (this.multiarr(this.options.yAxis)) {
          this.data.yAxis = this.options.yAxis.map(item =>
            item.slice(this.space * (this.num - 1), this.space * this.num)
          )
        } else {
          this.data.yAxis = this.options.yAxis.slice(
            this.space * (this.num - 1),
            this.space * this.num
          )
        }
        if (this.options.reverse) {
          this.data.xAxis.reverse()
          this.data.yAxis.reverse()
        }
      })
      this.arrow = len > this.space
      this.prev = !(this.num - 1)
      this.next = !(len > this.space * this.num)
    },
    multiarr(arr) {
      for (let i = 0, len = arr.length; i < len; i++) if (arr[i] instanceof Array) return true
      return false
    },
    itemClick(ev, xAxis) {
      this.$emit('item-click', ev, xAxis)
    }
  },
  created() {},
  mounted() {
    this.space = this.options.space || this.space
    if (this.options.xAxis) {
      this.nextData()
    } else {
      this.data = {}
    }
  }
}
</script>

<style lang="less">
.bar-arrow-chart {
  position: relative;
  .nav-arrow {
    position: absolute;
    top: 50%;
    color: #333;
    margin-top: -20px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
    }
  }
  .disabled {
    color: #ccc;
  }
  .nav-prev {
    left: 0;
  }
  .nav-next {
    right: 0;
  }
}
</style>
