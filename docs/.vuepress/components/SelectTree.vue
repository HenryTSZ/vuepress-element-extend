<template>
  <div class="select-tree">
    <el-select
      ref="select"
      v-model="selectData"
      v-bind="{ ...$attrs, ...selectProps }"
      @visible-change="handleVisibleChange"
      @remove-tag="handleRemoveTag"
      @clear="handleClear"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
      <tree
        :key="treeKey"
        ref="tree"
        v-bind="treeBind"
        @current-change="handleCurrentChange"
        @check-change="handleCheckChange"
      ></tree>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SelectTree',
  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectProps: {
      type: Object,
      default() {
        return {}
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    // 单选时是否只能选择叶子节点
    currentIsLeaf: {
      type: Boolean,
      default: false
    },
    /**
     * @description: 自定义单选时只能选择子节点方法; 优先级高于 currentIsLeaf
     * @param {data: Object}: 当前节点数据
     * @param {node: Object}: 当前节点 Node 对象
     * @return: Boolean
     */
    isLeafFun: {
      type: Function
    }
  },
  data() {
    return {
      treeKey: Math.random(),
      selectData: '',
      selectOptions: []
    }
  },
  computed: {
    treeBind() {
      return {
        showCheckbox: this.isMultiple,
        highlightCurrent: !this.isMultiple,
        expandOnClickNode: this.expandOnClickNode,
        nodeKey: 'id',
        ...this.treeProps,
        defaultCheckedKeys: this.isMultiple ? this.value : [],
        currentNodeKey: this.isMultiple ? '' : this.value
      }
    },
    isMultiple() {
      return this.selectProps.multiple || this.multiple
    },
    expandOnClickNode() {
      return this.isMultiple ? true : this.currentIsLeaf
    }
  },
  watch: {
    value() {
      // 为了检测 v-model 的变化
      if (this.value + '' !== this.selectData + '') {
        this.treeKey = Math.random()
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        if (this.isMultiple) {
          this.handleCheckChange()
        } else {
          this.handleCurrentChange()
        }
      })
    },
    // select 下拉框出现/隐藏
    handleVisibleChange(val) {
      // 下拉框隐藏并且值改变后
      if (!val && this.value + '' !== this.selectData + '') {
        this.$emit('input', this.selectData)
        this.$emit('change', this.selectData)
      }
      this.$emit('visible-change', val)
    },
    // select 清空
    handleClear() {
      if (this.$refs.tree.showCheckbox) {
        this.selectData = []
        this.$refs.tree.setCheckedKeys([])
      } else {
        this.selectData = ''
        this.$refs.tree.setCurrentKey(null)
      }
      this.$emit('input', this.selectData)
      this.$emit('change', this.selectData)
      this.$emit('clear')
    },
    // select 移除 tag
    handleRemoveTag(val) {
      this.$refs.tree.setChecked(val, false)
      let node = this.$refs.tree.getNode(val)
      if (!this.$refs.tree.checkStrictly && node.childNodes.length > 0) {
        this.tree2List(node).map(item => {
          if (item.childNodes.length <= 0) {
            this.$refs.tree.setChecked(item, false)
          }
        })
        this.handleCheckChange()
      }
      this.$emit('input', this.selectData)
      this.$emit('change', this.selectData)
      this.$emit('remove-tag', val)
    },
    // 单选, 节点被点击时的回调, 返回被点击的节点数据
    handleCurrentChange() {
      // 如果多选, 不处理
      if (this.isMultiple) return
      // 给 selectOptions 一个默认值, 防止出现无数据, 从而无法显示 tree
      this.selectOptions = [{}]
      const currentNode = this.$refs.tree.getCurrentNode()
      // 当前传入的值在 tree 中无法找到, 需要清空 select 值
      if (!currentNode) {
        this.selectData = ''
        return
      }
      const node = this.$refs.tree.getNode(currentNode)
      // 判断叶子节点
      if (this.isLeafFun ? this.isLeafFun(currentNode, node) : !node.isLeaf && this.currentIsLeaf) {
        // 如果不是叶子节点, 设置当前选中节点仍为上一个叶子节点
        this.$refs.tree.setCurrentKey(this.selectData || null)
        return
      }
      this.selectData = ''
      const value = node.key
      const label = node.label
      this.selectOptions = [
        {
          value,
          label
        }
      ]
      this.selectData = value
      this.$refs.select.blur()
    },
    // 多选, 节点勾选状态发生变化时的回调
    handleCheckChange() {
      this.selectOptions = [{}]
      this.selectData = []
      const checkedKeys = this.$refs.tree.getCheckedKeys(
        this.treeProps.leafOnly,
        this.treeProps.includeHalfChecked
      )
      checkedKeys.forEach(key => {
        const checkedNode = this.$refs.tree.getNode(key)
        const value = checkedNode.key
        this.selectOptions.push({
          value,
          label: checkedNode.label
        })
        this.selectData.push(value)
      })
    },
    tree2List(tree) {
      let queen = []
      let out = []
      queen = queen.concat(tree)
      while (queen.length) {
        let first = queen.shift()
        if (first.childNodes) {
          queen = queen.concat(first.childNodes)
        }
        out.push(first)
      }
      return out
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.select-tree {
  display: inline-block;
  .el-select {
    width: 100%;
  }
}
.el-select-dropdown__item {
  display: none;
}
</style>
