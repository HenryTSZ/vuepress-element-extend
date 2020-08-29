<template>
  <div class="b-tree">
    <el-checkbox
      v-if="showCheckAll && showCheckbox"
      class="b-tree-check-all"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-tree
      :ref="ref"
      v-bind="$attrs"
      :node-key="nodeKey"
      :show-checkbox="showCheckbox"
      v-on="$listeners"
      @check="handleCheck"
    >
      <slot slot-scope="{ node, data }" v-bind="{ node, data }"> {{ node.label }} </slot>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Tree1',
  props: {
    nodeKey: {
      type: String,
      default: 'id'
    },
    showCheckAll: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ref: 'elTree',
      isIndeterminate: false,
      checkAll: false
    }
  },
  watch: {
    level: {
      handler: 'expandToLevel',
      immediate: true
    }
  },
  methods: {
    /**
     * @method 展开至指定层级
     * @param {Number} level 要展开至几级？0, 1, 2, 3...
     **/
    expandToLevel(level) {
      this.$nextTick(() => {
        const elTreeStore = this.$refs[this.ref].store
        const allNodes = elTreeStore._getAllNodes().sort((a, b) => b.level - a.level)
        if (level === 0) {
          // 展开全部
          allNodes.forEach(node => {
            node.isLeaf && node.expand(null, true)
          })
        } else {
          allNodes.forEach(node => {
            if (node.level >= level) {
              node.expanded = false
            } else {
              node.expanded = true
            }
          })
        }
      })
    },
    // 处理全选
    handleCheckAllChange() {
      this.isIndeterminate = false
      let checkedKeys = []
      if (this.checkAll) {
        const elTreeStore = this.$refs[this.ref].store
        const checkedNodes = elTreeStore._getAllNodes().filter(({ visible }) => visible)
        checkedKeys = checkedNodes.map(({ key }) => key)
        this.$emit(
          'check',
          { [this.$refs[this.ref].props.label || 'label']: '全选' },
          {
            checkedNodes,
            checkedKeys,
            halfCheckedNodes: [],
            halfCheckedKeys: []
          }
        )
      } else {
        this.$emit(
          'check',
          { [this.$refs[this.ref].props.label || 'label']: '全选' },
          {
            checkedNodes: [],
            checkedKeys: [],
            halfCheckedNodes: [],
            halfCheckedKeys: []
          }
        )
      }
      this.$refs[this.ref].setCheckedKeys(checkedKeys)
    },
    // el-tree 复选框被点击
    handleCheck(data, checked) {
      if (!this.showCheckAll || !this.showCheckbox) {
        return
      }
      const { checkedKeys } = checked
      const elTreeStore = this.$refs[this.ref].store
      const allNodes = elTreeStore._getAllNodes().filter(({ visible }) => visible)
      if (checkedKeys.length) {
        if (checkedKeys.length === allNodes.length) {
          this.checkAll = true
          this.isIndeterminate = false
        } else {
          this.checkAll = false
          this.isIndeterminate = true
        }
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    }
  },
  mounted() {
    // 绑定 el-tree 方法
    for (let key in this.$refs[this.ref]) {
      if (!(key in this) && typeof this.$refs[this.ref][key] === 'function') {
        this[key] = this.$refs[this.ref][key].bind(this.$refs[this.ref])
      }
    }
  }
}
</script>

<style lang="less">
.b-tree {
  color: #606266;
  .b-tree-check-all {
    padding-left: 8px;
    font-weight: normal;
    .el-checkbox__label {
      color: #606266;
    }
  }
}
</style>
