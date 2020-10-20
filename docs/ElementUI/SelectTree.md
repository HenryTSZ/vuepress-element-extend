# SelectTree 树形选择器

基于 `el-select` 和 `tree` 封装的树形选择器

封装思路: [基于 ElementUI 封装的 SelectTree | Henry](https://tsz.now.sh/2019/11/29/based-on-element-ui-encapsulation-select-tree/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/SelectTree.vue)

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
      change(data, node) {
        console.log('change -> data, node', data, node)
      }
    }
  }
</script>
```

:::

## 单选只能选择叶子节点

:::demo 在 `tree-props` 中 传入 `current-is-leaf` 即可; 传入 `is-leaf-method` 可自定义叶子节点, 优先级高于 `current-is-leaf`, 详见 [Tree-currentIsLeaf](/ElementUI/Tree.html#单选只能选择叶子节点)

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">currentIsLeaf</p>
    <select-tree
      v-model="defaultCurrentKey"
      clearable
      placeholder="单选"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </el-col>
  <el-col :span="12">
    <p class="label">isLeafMethod</p>
    <select-tree
      v-model="defaultCurrentKey"
      clearable
      placeholder="单选"
      :tree-props="treeProps2"
      @change="change"
    ></select-tree>
  </el-col>
</el-row>

<script>
  const data = [
    {
      id: 1,
      label: '一级 1',
      pid: 0,
      children: [
        {
          id: 4,
          label: '二级 1-1',
          pid: 1,
          children: [
            {
              id: 9,
              label: '三级 1-1-1',
              pid: 4
            },
            {
              id: 10,
              label: '三级 1-1-2',
              pid: 4
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      pid: 0,
      children: [
        {
          id: 5,
          label: '二级 2-1',
          pid: 2
        },
        {
          id: 6,
          label: '二级 2-2',
          pid: 2
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      pid: 0
    }
  ]
  export default {
    data() {
      return {
        defaultCurrentKey: 9,
        treeProps: {
          data,
          currentIsLeaf: true
        },
        treeProps2: {
          data,
          isLeafMethod: this.isLeafMethod
        }
      }
    },
    methods: {
      isLeafMethod(data, node) {
        return node.isLeaf && data.pid
      },
      change(data, node) {
        console.log('change -> data, node', data, node)
      }
    }
  }
</script>
```

:::

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
      change(data, node) {
        console.log('change -> data, node', data, node)
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
      change(data, node) {
        console.log('change -> data, node', data, node)
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
      change(data, node) {
        console.log('change -> data, node', data, node)
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
      change(data, node) {
        console.log('change -> data, node', data, node)
      }
    }
  }
</script>
```

:::

## Select Attributes

**注: 以下参数既可以直接传入, 也可以通过 `selectProps` 传入**

| 参数                  | 说明                                                                           | 类型                      | 可选值            | 默认值 |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------- | ----------------- | ------ |
| value / v-model       | 绑定值                                                                         | boolean / string / number | —                 | —      |
| multiple              | 是否多选                                                                       | boolean                   | —                 | false  |
| disabled              | 是否禁用                                                                       | boolean                   | —                 | false  |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string                    | —                 | value  |
| size                  | 输入框尺寸                                                                     | string                    | medium/small/mini | —      |
| clearable             | 是否可以清空选项                                                               | boolean                   | —                 | false  |
| collapse-tags         | 多选时是否将选中值按文字的形式展示                                             | boolean                   | —                 | false  |
| multiple-limit        | 多选时用户最多可以选择的项目数，为 0 则不限制                                  | number                    | —                 | 0      |
| name                  | select input 的 name 属性                                                      | string                    | —                 | —      |
| autocomplete          | select input 的 autocomplete 属性                                              | string                    | —                 | off    |
| auto-complete         | 下个主版本弃用                                                                 | string                    | —                 | off    |
| placeholder           | 占位符                                                                         | string                    | —                 | 请选择 |
| filterable            | 是否可搜索                                                                     | boolean                   | —                 | false  |
| popper-class          | Select 下拉框的类名                                                            | string                    | —                 | —      |
| reserve-keyword       | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                       | boolean                   | —                 | false  |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean                   | -                 | true   |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                  | boolean                   | -                 | false  |

## Tree Attributes

通过 `treeProps` 传入, 具体参见 [Tree 树形控件 | Attributes](http://localhost:8080/ElementUI/Tree.html#attributes)

## Events

| 事件名称       | 说明                                     | 回调参数                          |
| -------------- | ---------------------------------------- | --------------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值, 目前的选中对象/数组 |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false     |
| remove-tag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                     |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                                 |

## Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |
