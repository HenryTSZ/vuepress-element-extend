<template>
  <el-table
    :ref="ref"
    class="base-table"
    :data="data"
    :row-key="rowKey"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="prev"></slot>
    <template v-for="(column, index) in cols">
      <el-table-column
        v-if="column.editable || column.editableMethod"
        :key="`${column.prop}-edit`"
        v-bind="column"
      >
        <template slot-scope="{ row, $index }">
          <editable-elements
            v-if="
              !column.editableMethod || column.editableMethod(row, column, row[column.prop], $index)
            "
            :model="row"
            :item="{ ...column, focus: index === focusCol && $index === focusRow }"
            @change="change(row, $event, column)"
          ></editable-elements>
          <span v-else class="uneditable">{{
            column.formatter
              ? column.formatter(row, column, row[column.prop], $index)
              : row[column.prop]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column v-else :key="column.prop" v-bind="column"> </el-table-column>
    </template>
    <slot></slot>
  </el-table>
</template>

<script>
import EditableElements from './EditableElements'
export default {
  name: 'BaseTable',
  inheritAttrs: false,
  computed: { EditableElements },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object,
      default() {
        return null
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    defaultCheckedKeys: {
      // String 只可能是 clear, 作用为清空
      type: [Array, String],
      default() {
        return []
      }
    },
    currentNodeKey: {
      type: [String, Number],
      default: ''
    },
    focusRow: {
      type: Number,
      default: 0
    },
    focusCol: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ref: 'elTable'
    }
  },
  computed: {
    cols() {
      return this.props
        ? this.columns.map(column => ({
            ...column,
            prop: column[this.props.prop || 'prop'],
            label: column[this.props.label || 'label']
          }))
        : this.columns
    },
    isEditable() {
      return this.columns.some(item => item.editable || item.editableMethod)
    }
  },
  watch: {
    data: {
      handler() {
        this.setDefaultCheckedKeys()
        this.setCurrentNodeKey()
        this.refreshLayout()
      },
      immediate: true
    },
    defaultCheckedKeys: 'setDefaultCheckedKeys',
    currentNodeKey: 'setCurrentNodeKey'
  },
  methods: {
    change(row, e, column) {
      this.$emit('row-change', row, e, column.prop)
    },
    // 设置默认选中
    setDefaultCheckedKeys() {
      this.$nextTick(() => {
        if (!this.$refs[this.ref]) return
        if (this.defaultCheckedKeys === 'clear') {
          this.$refs[this.ref].clearSelection()
          return
        }
        if (this.defaultCheckedKeys.length) {
          const rows = this.data.filter(item => this.defaultCheckedKeys.includes(item[this.rowKey]))
          rows.forEach(row => {
            this.$refs[this.ref].toggleRowSelection(row, true)
          })
        }
      })
    },
    setCurrentNodeKey() {
      this.$nextTick(() => {
        if (!this.$refs[this.ref]) return
        if (this.currentNodeKey === 'clear') {
          this.$refs[this.ref].setCurrentRow(null)
          return
        }
        if (this.currentNodeKey) {
          const row = this.data.find(item => this.currentNodeKey === item[this.rowKey])
          if (row) {
            this.$refs[this.ref].setCurrentRow(row)
          }
        }
      })
    },
    // 重新计算高度
    refreshLayout() {
      if (!this.isEditable) return
      this.$nextTick(() => {
        if (!this.$refs[this.ref]) return
        setTimeout(() => {
          this.$refs[this.ref].doLayout()
        }, 200)
      })
    }
  },
  mounted() {
    for (let key in this.$refs[this.ref]) {
      if (!(key in this) && typeof this.$refs[this.ref][key] === 'function') {
        this[key] = this.$refs[this.ref][key].bind(this.$refs[this.ref])
      }
    }
  }
}
</script>
