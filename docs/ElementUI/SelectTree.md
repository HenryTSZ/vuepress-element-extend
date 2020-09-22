# SelectTree 树形选择器

基于 `el-select` 和 `tree` 封装的树形选择器

封装思路: [基于 ElementUI 封装的 SelectTree | Henry](https://tsz.now.sh/2019/11/29/based-on-element-ui-encapsulation-select-tree/)

## 基础用法

适用广泛的基础单选

:::demo `select` 参数传递与 `el-select` 一样, 也可通过 `select-props` 传递; `tree` 参数通过 `tree-props` 传递, 具体参数详见 [Tree-Attributes](/ElementUI/Tree.html#attributes)

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">与 el-select 传递参数一样</p>
    <select-tree
      v-model="defaultCurrentKey"
      clearable
      placeholder="单选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
  <el-col :span="12">
    <p class="label">通过 select-props 传递参数</p>
    <select-tree
      v-model="defaultCurrentKey"
      :select-props="selectProps"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
</el-row>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  export default {
    data() {
      return {
        defaultCurrentKey: 9,
        selectProps: {
          clearable: true,
          placeholder: '单选'
        },
        treeProps: {
          data
        }
      }
    },
    methods: {
      change(data) {
        console.log('TCL: change -> data', data)
      }
    }
  }
</script>
```

:::

## 单选只能选择叶子节点

## 基础多选

适用性较广的基础多选, 用 Tag 展示已选项

:::demo 为 `el-select` 设置 `multiple` 属性即可启用多选, 此时 `v-model` 的值为当前选中值所组成的数组. 默认情况下选中值会以 Tag 的形式展现, 你也可以设置 `collapse-tags` 属性将它们合并为一段文字

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">Tag</p>
    <select-tree
      v-model="defaultCheckedKeys"
      clearable
      multiple
      placeholder="多选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
  <el-col :span="12">
    <p class="label">collapse-tags</p>
    <select-tree
      v-model="defaultCheckedKeys"
      clearable
      multiple
      collapse-tags
      placeholder="多选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
</el-row>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  export default {
    data() {
      return {
        defaultCheckedKeys: [6, 9],
        treeProps: {
          data
        }
      }
    },
    methods: {
      change(data) {
        console.log('TCL: change -> data', data)
      }
    }
  }
</script>
```

:::

## 多选全选

增加一键全选

:::demo 为 `tree-props` 传入 `showCheckAll` 即可

```html
<select-tree
  v-model="defaultCheckedKeys"
  clearable
  multiple
  collapse-tags
  placeholder="全选"
  :tree-props="treeProps"
  @change="change"
></select-tree>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  export default {
    data() {
      return {
        defaultCheckedKeys: [6, 9],
        treeProps: {
          data,
          showCheckAll: true
        }
      }
    },
    methods: {
      change(data) {
        console.log('TCL: change -> data', data)
      }
    }
  }
</script>
```

:::

## 有禁用选项

:::demo 在 `tree` 中, 设定 `disabled` 值为 `true` , 即可禁用该选项, 详见 [Tree-单选禁用](/ElementUI/Tree.html#%E5%8D%95%E9%80%89%E7%A6%81%E7%94%A8)

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">单选禁用</p>
    <select-tree
      v-model="defaultCurrentKey"
      clearable
      placeholder="单选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
  <el-col :span="12">
    <p class="label">多选禁用</p>
    <select-tree
      v-model="defaultCheckedKeys"
      clearable
      multiple
      collapse-tags
      placeholder="多选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
</el-row>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  export default {
    data() {
      return {
        defaultCurrentKey: 9,
        defaultCheckedKeys: [6, 9],
        treeProps: {
          data,
          props: {
            disabled(data) {
              return ['二级 2-1', '二级 3-1'].includes(data.label)
            }
          }
        }
      }
    },
    methods: {
      change(data) {
        console.log('TCL: change -> data', data)
      }
    }
  }
</script>
```

:::

## 可搜索

可以利用搜索功能快速查找选项

:::demo 为 `el-select` 添加 `filterable` 属性即可启用搜索功能. 默认情况下, 过滤保留子节点. 如果希望使用其他的搜索逻辑, 可以通过给 `tree-props` 传入一个 `filter-node-method` 来实现, `filter-node-method` 为一个 `Function` , 它会在输入值发生变化时调用, 参数为: `value, data, node`, 详见 [Tree-过滤保留子节点](/ElementUI/Tree.html#%E8%BF%87%E6%BB%A4%E4%BF%9D%E7%95%99%E5%AD%90%E8%8A%82%E7%82%B9)

```html
<select-tree
  v-model="defaultCurrentKey"
  clearable
  filterable
  placeholder="单选"
  :tree-props="treeProps"
  @change="change"
></select-tree>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  export default {
    data() {
      return {
        defaultCurrentKey: 9,
        selectProps: {
          clearable: true,
          placeholder: '单选'
        },
        treeProps: {
          data
        }
      }
    },
    methods: {
      change(data) {
        console.log('TCL: change -> data', data)
      }
    }
  }
</script>
```

:::
