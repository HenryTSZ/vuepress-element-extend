<template>
  <el-table
    class="tree-table"
    :ref="ref"
    :data="data"
    :row-key="rowKey"
    v-bind="$attrs"
    v-on="{ ...$listeners, select, 'select-all': selectAll, 'selection-change': selectionChange }"
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
export default {
  name: 'TreeTable',
  props: {
    props: {
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
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    defaultCheckedKeys: {
      type: Array,
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
    level: {
      handler: 'expandToLevel',
      immediate: true
    },
    refreshLevel: {
      handler: 'expandToLevel'
    },
    data: {
      async handler() {
        await this.handleData()
        this.setDefaultCheckedKeys()
        this.refreshLayout()
        this.setCurrentNodeKey()
      },
      deep: true,
      immediate: true
    },
    defaultCheckedKeys: 'setDefaultCheckedKeys',
    currentNodeKey: 'setCurrentNodeKey'
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
    // 设置默认选中
    async setDefaultCheckedKeys() {
      if (!this.children) {
        await this.handleData()
      }
      if (this.defaultCheckedKeys.length) {
        let rows = []
        const findChildren = arr => {
          arr[this.children].forEach(item => {
            rows.push(item)
            if (item[this.children]) {
              findChildren(item)
            }
          })
        }
        const findRows = arr => {
          if (this.checkStrictly) {
            arr.forEach(item => {
              if (this.defaultCheckedKeys.includes(item[this.rowKey])) {
                rows.push(item)
              }
              if (item[this.children]) {
                findRows(item[this.children])
              }
            })
          } else {
            arr.forEach(item => {
              if (this.defaultCheckedKeys.includes(item[this.rowKey])) {
                rows.push(item)
                if (item[this.children]) {
                  findChildren(item)
                }
              } else if (item[this.children]) {
                findRows(item[this.children])
              }
            })
          }
        }
        findRows(this.data)
        rows.forEach(row => {
          this.$refs[this.ref].toggleRowSelection(row, true)
        })
      }
    },
    async setCurrentNodeKey() {
      if (!this.children) {
        await this.handleData()
      }
      if (this.currentNodeKey) {
        let row = null
        const findRow = arr => {
          arr.some(item => {
            if (this.currentNodeKey === item[this.rowKey]) {
              row = item
              return true
            } else if (item[this.children]) {
              return findRow(item[this.children])
            } else {
              return false
            }
          })
        }
        findRow(this.data)
        if (row) {
          this.$refs[this.ref].setCurrentRow(row)
        }
      }
    },
    // 重新计算高度
    refreshLayout() {
      if (!this.isEditable) return
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.elTable.doLayout()
        }, 200)
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
