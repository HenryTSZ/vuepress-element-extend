<!--
 * @Author: HenryTSZ
 * @Date: 2020-01-31 11:15:30
 * @Description: https://vue-element-extend.now.sh/#/element-ui/TreeDemo
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-06-14 15:19:36
 -->
<template>
  <div class="b-tree">
    <el-checkbox
      v-if="showCheckAll && showCheckbox && data.length"
      class="b-tree-check-all"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-tree
      :ref="ref"
      :key="key"
      :data="data"
      v-bind="$attrs"
      :node-key="nodeKey"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :show-checkbox="showCheckbox"
      v-on="$listeners"
      @check-change="handleCheckChange"
    >
      <slot slot-scope="{ node, data }" v-bind="{ node, data }"> {{ node.label }} </slot>
    </el-tree>
  </div>
</template>

<script>
const childNodes = 'childNodes'

export default {
  name: 'Tree2',
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
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
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
      key: '',
      allNodes: [],
      maxLevel: 0,
      isFirst: true,
      isIndeterminate: false,
      checkAll: false,
      timeout: null
    }
  },
  watch: {
    data: {
      handler: 'handleData',
      immediate: true,
      deep: true
    },
    level: {
      handler: 'expandToLevel',
      immediate: true
    },
    defaultCheckedKeys: {
      handler: 'handleCheckChange',
      immediate: true
    }
  },
  methods: {
    /**
     * @method 展开至指定层级
     * @param {Number} level 要展开至几级？0, 1, 2, 3...
     **/
    async expandToLevel(level) {
      if (this.isFirst && (this.defaultExpandAll || this.defaultExpandedKeys.length)) {
        this.isFirst = false
        return
      }
      this.isFirst = false
      if (!this.maxLevel) {
        await this.handleData()
      }
      const allNodes = this.allNodes.sort((a, b) => b.level - a.level)
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
    },
    handleData() {
      this.$nextTick(() => {
        this.allNodes = this.getAllNodes(this.$refs[this.ref].root[childNodes])
        this.allNodes.length &&
          (this.maxLevel = Math.max.apply(
            null,
            this.allNodes.map(({ level }) => level)
          ))
        this.$emit('max-level', this.maxLevel)
        this.handleCheckChange()
        return Promise.resolve()
      })
    },
    getAllNodes() {
      let allNodes = []
      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes
        childNodes.forEach(child => {
          allNodes.push(child)
          traverse(child)
        })
      }
      traverse(this.$refs[this.ref])
      return allNodes
    },
    // 处理全选
    handleCheckAllChange() {
      this.isIndeterminate = false
      let checkedKeys = []
      if (this.checkAll) {
        const checkedNodes = this.allNodes.filter(({ visible }) => visible)
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
    handleCheckChange() {
      if (!this.showCheckAll || !this.showCheckbox || !this.data.length) {
        return
      }
      // 防抖
      this.debounce(this.handleCheckAllStatus, 100)
    },
    // 防抖
    debounce(func, wait) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(func, wait)
    },
    handleCheckAllStatus() {
      const allNodes = this.allNodes.filter(({ level, visible }) => level === 1 && visible)
      // 关于 filter 的说明:
      // 全选的状态其实只和根节点的状态有关, 而且也处理了 set 方法中 leafOnly 为 true 的情况
      // visible 结合过滤使用
      this.checkAll = allNodes.every(({ checked }) => checked)
      this.isIndeterminate =
        allNodes.some(({ indeterminate }) => indeterminate) ||
        (allNodes.some(({ checked }) => checked) && !this.checkAll)
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
