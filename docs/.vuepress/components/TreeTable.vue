<template>
  <el-table
    class="tree-table"
    :ref="ref"
    :data="data"
    v-bind="$attrs"
    v-on="{ ...$listeners, select, 'select-all': selectAll, 'selection-change': selectionChange }"
  >
    <slot name="prev"></slot>
    <template v-for="(column, index) in cols">
      <el-table-column
        v-if="column.editable || column.editableFun"
        :key="`${column.prop}-edit`"
        v-bind="column"
      >
        <template slot-scope="{ row, $index }">
          <editable-elements
            v-if="!column.editableFun || column.editableFun(row, column, row[column.prop], $index)"
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
export default {
  name: 'TreeTable',
  props: {
    keyProps: {
      type: Object,
      default() {
        return null
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    focusRow: {
      type: Number,
      default: 0
    },
    focusCol: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    refreshLevel: {
      type: [String, Number],
      default: ''
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    checkAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ref: 'elTable',
      maxLevel: 0,
      treeData: {},
      children: '',
      timeout: null
    }
  },
  computed: {
    cols() {
      return this.keyProps
        ? this.columns.map(column => ({
            ...column,
            prop: column[this.keyProps.prop || 'prop'],
            label: column[this.keyProps.label || 'label']
          }))
        : this.columns
    }
  },
  watch: {
    level: {
      handler: 'expandToLevel',
      immediate: true
    },
    refreshLevel: {
      handler: 'expandToLevel'
    },
    data: {
      handler: 'handleData',
      deep: true,
      immediate: true
    }
  },
  methods: {
    async expandToLevel() {
      if (!this.$refs[this.ref]) return
      if (!this.maxLevel) {
        await this.handleData()
      }
      let level = 0
      if (this.level <= 0) {
        level = this.maxLevel - 2
      } else {
        level = this.level - 2
      }
      for (const key in this.treeData) {
        if (this.treeData.hasOwnProperty(key)) {
          this.treeData[key].expanded = this.treeData[key].level <= level
        }
      }
      this.$nextTick(() => {
        this.$refs[this.ref].doLayout()
      })
    },
    handleData() {
      this.$nextTick(() => {
        this.treeData = this.$refs[this.ref].store.states.treeData
        const levels = Object.values(this.treeData).map(({ level }) => level)
        if (levels.length) {
          this.maxLevel = Math.max.apply(null, levels) + 2
        } else {
          this.maxLevel = 0
        }
        this.$emit('max-level', this.maxLevel)

        this.children = this.$refs[this.ref].treeProps.children
        return Promise.resolve()
      })
    },

    select(selection, row) {
      if (!this.checkStrictly) {
        const selected = selection.includes(row)
        this.$emit('select', selection, row)
        this.selectChildren(row, selected, selection)
        return
      }
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      if (this.checkAll) {
        // tableData 第一层只要有在 selection 里面就是全选
        const isSelect = this.data.some(item => selection.includes(item))
        if (isSelect) {
          selection.forEach(item => {
            this.selectChildren(item, isSelect)
          })
        } else {
          this.data.forEach(item => {
            this.selectChildren(item, isSelect)
          })
        }
      }
      this.$nextTick(() => {
        this.$emit('select-all', selection)
      })
    },
    /**
     * @description: 设置子元素是否选中
     * @param {row: Object} 父元素
     * @param {selected: Boolean} 是否选中
     * @param {selection: Array} 是否 emit selection
     */
    selectChildren(row, selected, selection) {
      if (row[this.children] && Array.isArray(row[this.children])) {
        row[this.children].forEach(item => {
          this.toggleSelection(item, selected)
          if (selection) {
            if (selected && !selection.includes(item)) {
              selection = selection.concat(item)
              this.$emit('select', selection, item)
            }
            if (!selected && selection.includes(item)) {
              selection = selection.filter(ele => ele !== item)
              this.$emit('select', selection, item)
            }
            const result = this.selectChildren(item, selected, selection)
            if (result) selection = result
          } else {
            this.selectChildren(item, selected, selection)
          }
        })
        if (selection) return selection
      }
    },
    selectionChange(selection) {
      this.debounce(this.emitSelectionChange, 100, selection)
    },
    emitSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    toggleSelection(row, select) {
      row &&
        this.$nextTick(() => {
          this.$refs[this.ref] && this.$refs[this.ref].toggleRowSelection(row, select)
        })
    },
    cancelAll() {
      this.$refs[this.ref] && this.$refs[this.ref].clearSelection()
    },
    // 防抖
    debounce(fun, wait, params) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(fun, wait, params)
    },
    change(row, e, column) {
      this.$emit('row-change', row, e, column.prop)
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

<style lang="less" scoped>
.tree-table {
  /deep/ .el-table__body-wrapper {
    .cell {
      display: flex;
      align-items: center;
    }
  }
}
</style>
