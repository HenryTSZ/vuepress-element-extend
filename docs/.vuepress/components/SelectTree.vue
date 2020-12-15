<template>
  <div class="select-tree">
    <el-select
      ref="select"
      v-model="selectData"
      v-bind="{ ...$attrs, multiple, filterable, ...selectProps }"
      :filter-method="() => true"
      @input.native="handleInput"
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
        @ready="init"
      ></tree>
    </el-select>
  </div>
</template>

<script>
import Tree from './Tree'
export default {
  name: 'SelectTree',
  inheritAttrs: false,
  components: { Tree },
  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
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
    }
  },
  data() {
    return {
      isFirst: true,
      treeKey: Math.random(),
      selectData: '',
      selectOptions: [],
      selectNode: null,
      multipleTempValue: []
    }
  },
  computed: {
    treeBind() {
      return {
        showCheckbox: this.isMultiple,
        highlightCurrent: !this.isMultiple,
        expandOnClickNode: this.isMultiple || this.treeProps.currentIsLeaf,
        nodeKey: 'id',
        ...this.treeProps,
        defaultCheckedKeys: this.isMultiple ? this.value : [],
        currentNodeKey: this.isMultiple ? '' : this.value
      }
    },
    isMultiple() {
      return this.selectProps.multiple || this.multiple
    }
  },
  watch: {
    value() {
      console.log(this.value, 'value')
      // 为了检测 v-model 的变化
      if (this.value + '' !== this.selectData + '') {
        console.log('value change')
        this.treeKey = Math.random()
      }
    }
  },
  methods: {
    init() {
      if (this.isMultiple) {
        this.handleCheckChange()
      } else {
        this.handleCurrentChange()
      }
    },
    emitBase() {
      console.log('emitBase')
      this.$emit('input', this.selectData)
      this.$emit('change', this.selectData, this.selectNode)
    },
    // select 下拉框出现/隐藏
    handleVisibleChange(val) {
      // 下拉框出现并且是多选, 将 this.value 保存到变量 multipleTempValue
      if (val && this.multiple) {
        this.multipleTempValue = this.value
      }
      // 如果有过滤, 下拉框出现后, 重置搜索
      if (val && this.filterable) {
        this.filter()
      }
      // 下拉框隐藏并且是多选, 判断值是否变化
      if (!val && this.multiple && this.value + '' !== this.multipleTempValue + '') {
        console.log('emit multiple change')
        this.$emit('change', this.selectData, this.selectNode)
      }
      console.log('visible', val)
      this.$emit('visible-change', val)
    },
    // select 清空
    handleClear() {
      if (this.isMultiple) {
        this.selectData = []
        this.selectNode = []
        this.$refs.tree.setCheckedKeys([])
      } else {
        this.selectData = ''
        this.selectNode = null
        this.$refs.tree.setCurrentKey(null)
      }
      this.emitBase()
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
      }
      this.handleCheckChange()
      this.emitBase()
      this.$emit('remove-tag', val)
    },
    // 单选, 节点被点击时的回调, 返回被点击的节点数据
    handleCurrentChange() {
      // 如果多选, 不处理
      if (this.isMultiple) return
      // 给 selectOptions 一个默认值, 防止出现无数据, 从而无法显示 tree
      this.selectOptions = [{}]
      console.log('current change')
      const currentNode = this.$refs.tree.getCurrentNode()
      // 当前传入的值在 tree 中无法找到, 需要清空 select 值
      if (!currentNode) {
        this.selectData = ''
        this.selectNode = null
        if (this.isFirst) {
          this.isFirst = false
        } else {
          this.emitBase()
          this.$refs.select.blur()
        }
        return
      }
      const node = this.$refs.tree.getNode(currentNode)
      this.selectData = ''
      this.selectNode = null
      const value = node.key
      const label = node.label
      this.selectOptions = [
        {
          value,
          label
        }
      ]
      this.selectData = value
      this.selectNode = node.data
      if (this.isFirst) {
        this.isFirst = false
      } else {
        this.emitBase()
        console.log('blur')
        this.$refs.select.blur()
      }
    },
    // 多选, 节点勾选状态发生变化时的回调
    handleCheckChange() {
      this.selectOptions = [{}]
      this.selectData = []
      this.selectNode = []
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
        this.selectNode.push(checkedNode.data)
      })
      if (this.isFirst) {
        this.isFirst = false
      } else {
        this.$emit('input', this.selectData)
      }
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
    },
    // 过滤
    handleInput(e) {
      this.filter(e.target.value)
    },
    filter(value) {
      this.$refs.tree.filter(value)
    }
  },
  mounted() {
    // 绑定 el-select 方法
    for (let key in this.$refs.select) {
      if (!(key in this) && typeof this.$refs.select[key] === 'function') {
        this[key] = this.$refs.select[key].bind(this.$refs.select)
      }
    }
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
