<template>
  <div class="b-tree">
    <el-tree
      :ref="ref"
      v-bind="$attrs"
      :data="treeData"
      :node-key="nodeKey"
      :show-checkbox="showCheckbox"
      v-on="$listeners"
    >
      <slot slot-scope="{ node, data }" v-bind="{ node, data }"> {{ node.label }} </slot>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Tree3',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
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
      treeData: [],
      ref: 'elTree',
      checkAllId: '__rootId__'
    }
  },
  watch: {
    data: {
      handler: 'handleData',
      immediate: true
    },
    level: {
      handler: 'expandToLevel',
      immediate: true
    }
  },
  computed: {
    isCheckAll() {
      return this.showCheckAll && this.showCheckbox
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
        console.log('expandToLevel -> elTreeStore._getAllNodes()', elTreeStore._getAllNodes())
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
    handleData() {
      if (this.isCheckAll && this.data.length) {
        this.treeData = [
          {
            [this.$refs[this.ref].props.label]: '全选',
            [this.nodeKey]: this.checkAllId,
            [this.$refs[this.ref].props.children]: this.data
          }
        ]
      } else {
        this.treeData = this.data
      }
    },
    getCheckedNodes(leafOnly, includeHalfChecked) {
      if (this.isCheckAll) {
        return this.$refs[this.ref]
          .getCheckedNodes(leafOnly, includeHalfChecked)
          .filter(node => node[this.nodeKey] !== this.checkAllId)
      }
      return this.$refs[this.ref].getCheckedNodes(leafOnly, includeHalfChecked)
    },
    getHalfCheckedNodes() {
      if (this.isCheckAll) {
        return this.$refs[this.ref]
          .getHalfCheckedNodes()
          .filter(node => node[this.nodeKey] !== this.checkAllId)
      }
      return this.$refs[this.ref].getHalfCheckedNodes()
    },
    getCheckedKeys(leafOnly) {
      if (this.isCheckAll) {
        return this.$refs[this.ref].getCheckedKeys(leafOnly).filter(key => key !== this.checkAllId)
      }
      return this.$refs[this.ref].getCheckedKeys(leafOnly)
    },
    getHalfCheckedKeys() {
      if (this.isCheckAll) {
        return this.$refs[this.ref].getHalfCheckedKeys().filter(key => key !== this.checkAllId)
      }
      return this.$refs[this.ref].getHalfCheckedKeys()
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
