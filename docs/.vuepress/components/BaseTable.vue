<!--
 * @Author: HenryTSZ
 * @Date: 2020-04-11 15:27:42
 * @Description: https://vue-element-extend.now.sh/#/element-ui/BaseTableDemo
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-10-12 16:57:23
 -->
<template>
  <el-table ref="elTable" class="base-table" :data="data" v-bind="$attrs" v-on="$listeners">
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
  name: 'BaseTable',
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
    }
  },
  watch: {
    data: {
      handler() {
        this.setDefaultCheckedKeys()
        this.setCurrentNodeKey()
      },
      immediate: true
    },
    defaultCheckedKeys: {
      handler: 'setDefaultCheckedKeys',
      immediate: true
    },
    currentNodeKey: {
      handler: 'setCurrentNodeKey',
      immediate: true
    }
  },
  methods: {
    change(row, e, column) {
      this.$emit('row-change', row, e, column.prop)
    },
    // 设置默认选中
    setDefaultCheckedKeys() {
      this.$nextTick(() => {
        if (this.defaultCheckedKeys.length) {
          const rows = this.data.filter(item => this.defaultCheckedKeys.includes(item[this.rowKey]))
          rows.forEach(row => {
            this.$refs.elTable.toggleRowSelection(row, true)
          })
        }
      })
    },
    setCurrentNodeKey() {
      this.$nextTick(() => {
        if (this.currentNodeKey) {
          const row = this.data.find(item => this.currentNodeKey === item[this.rowKey])
          if (row) {
            this.$refs.elTable.setCurrentRow(row)
          }
        }
      })
    }
  },
  mounted() {
    for (let key in this.$refs.elTable) {
      if (!(key in this) && typeof this.$refs.elTable[key] === 'function') {
        this[key] = this.$refs.elTable[key].bind(this.$refs.elTable)
      }
    }
  }
}
</script>
