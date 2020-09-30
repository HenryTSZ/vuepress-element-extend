# Tree 树形控件

在保持 `el-tree` 全部功能的基础上增加了以下功能:

1. 全选功能(不支持懒加载)
2. 展开到 `level` 级的功能
3. 单选禁用功能
4. 文本溢出省略号, 悬浮显示全部
5. 过滤保留子节点
6. 单选只能选择叶子节点

封装思路: [基于 ElementUI 封装的 Tree | Henry](https://tsz.now.sh/2020/01/02/based-on-element-ui-encapsulation-tree/), [基于 ElementUI 封装的 Tree2 | Henry](https://tsz.now.sh/2020/01/31/based-on-element-ui-encapsulation-tree-2/)

## 基础用法

基础的树形结构展示。

:::demo 参见 [ElementUI-Tree](https://element.eleme.cn/#/zh-CN/component/tree) 用法, 只需要将最外层 `<el-tree>` 替换为 `<tree>` 即可

```html
<tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></tree>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log('handleNodeClick -> data', data)
      }
    }
  }
</script>
```

:::

## 全选

适用于需要选择层级时使用。

:::demo `show-check-all`(需配合 `show-checkbox`), `Boolean`; 必须设置 `node-key`, 默认值为 `id`; 配合 `disabled` 可能有问题, 请谨慎使用

```html
<tree
  :data="data"
  :props="defaultProps"
  show-checkbox
  show-check-all
  @check="handleCheck"
  @check-change="handleCheckChange"
></tree>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            id: '1',
            children: [
              {
                label: '二级 1-1',
                id: '1-1',
                disabled: true,
                children: [
                  {
                    label: '三级 1-1-1',
                    id: '1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            id: '2',
            children: [
              {
                label: '二级 2-1',
                id: '2-1',
                children: [
                  {
                    label: '三级 2-1-1',
                    id: '2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                id: '2-2',
                children: [
                  {
                    label: '三级 2-2-1',
                    id: '2-2-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            id: '3',
            children: [
              {
                label: '二级 3-1',
                id: '3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                    id: '3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                id: '3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                    disabled: true,
                    id: '3-2-1'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleCheck(data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
        console.log(
          'handleCheck -> data, checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys',
          data,
          checkedNodes,
          checkedKeys,
          halfCheckedNodes,
          halfCheckedKeys
        )
      },
      handleCheckChange(data) {
        console.log('handleCheckChange -> data', data)
      }
    }
  }
</script>
```

:::

## 展开到 level 级

适用于需要展开层级时使用

:::demo 通过 `level` 设置展开层级, `Number`, `0`: 展开全部, `1`: 展开到一级, ...; `@max-level` 获取最大层级

```html
展开到 <el-input-number v-model="level" :min="0" :max="maxLevel"></el-input-number> 级
<tree :data="data" :props="defaultProps" :level="level" @max-level="getMaxLevel"></tree>

<script>
  export default {
    data() {
      return {
        level: 1,
        maxLevel: 1,
        data: [
          {
            label: '一级 1',
            id: '1',
            children: [
              {
                label: '二级 1-1',
                id: '1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    id: '1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            id: '2',
            children: [
              {
                label: '二级 2-1',
                id: '2-1',
                children: [
                  {
                    label: '三级 2-1-1',
                    id: '2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                id: '2-2',
                children: [
                  {
                    label: '三级 2-2-1',
                    id: '2-2-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            id: '3',
            children: [
              {
                label: '二级 3-1',
                id: '3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                    id: '3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                id: '3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                    id: '3-2-1'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      getMaxLevel(maxLevel) {
        this.maxLevel = maxLevel
      }
    }
  }
</script>
```

:::

## 单选禁用

单选时可将 `Tree` 的某些节点设置为禁用状态

:::demo 通过 `disabled` 设置禁用状态. 由于未传 `node-key`, 故点击 `disabled` 的节点会将已选中的节点取消

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">通过 data 中 disabled 设置禁用</p>
    <tree :data="data" :props="defaultProps" highlight-current @node-click="handleNodeClick"></tree>
  </el-col>
  <el-col :span="12">
    <p class="label">通过 props 中 disabled 设置禁用</p>
    <tree
      :data="data"
      :props="disabledProps"
      highlight-current
      @node-click="handleNodeClick"
    ></tree>
  </el-col>
</el-row>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                disabled: true,
                children: [
                  {
                    label: '三级 1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1',
                    disabled: true
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                disabled: true,
                children: [
                  {
                    label: '三级 3-2-1'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        disabledProps: {
          disabled(data) {
            return ['二级 2-1', '二级 3-1'].includes(data.label)
          }
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log('handleNodeClick -> data', data)
      }
    }
  }
</script>
```

:::

## 文本溢出省略号

当文本溢出后显示省略号, 鼠标悬浮后展示全部

:::demo 通过传入 `textEllipsisProps` 设置文字提示样式, 具体参数参见 [ElementUI-Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip)

```html
<tree
  :data="data"
  :props="defaultProps"
  :text-ellipsis-props="textEllipsisProps"
  @node-click="handleNodeClick"
></tree>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label:
              '孔乙己是站着喝酒而穿长衫的唯一的人。他身材很高大；青白脸色，皱纹间时常夹些伤痕；一部乱蓬蓬的花白的胡子。穿的虽然是长衫，可是又脏又破，似乎十多年没有补，也没有洗。他对人说话，总是满口之乎者也，教人半懂不懂的。因为他姓孔，别人便从描红纸上的“上大人孔乙己”这半懂不懂的话里，替他取下一个绰号，叫作孔乙己。孔乙己一到店，所有喝酒的人便都看着他笑，有的叫道，“孔乙己，你脸上又添上新伤疤了！”他不回答，对柜里说，“温两碗酒，要一碟茴香豆。”便排出九文大钱。他们又故意的高声嚷道，“你一定又偷了人家的东西了！”孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”“什么清白？我前天亲眼见你偷了何家的书，吊着打。”孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。',
            children: [
              {
                label:
                  '希望本无所谓有，也无所谓无，这就像地上的路，其实地上本没有路，走的人多了，也便成了路。',
                children: [
                  {
                    label: '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        textEllipsisProps: {
          placement: 'right',
          openDelay: 500
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log('handleNodeClick -> data', data)
      }
    }
  }
</script>
```

:::

## 过滤保留子节点

`ElementUI` 官方例子不会返回过滤节点的子节点, 具体可以参见: [el-tree 节点过滤加载对应子节点 | Henry](https://tsz.now.sh/2020/01/12/el-tree-node-filter-loads-corresponding-child-nodes/)

:::demo 不传入 `filter-node-method` 即可, 使用 `Tree` 默认过滤方法; 传入即覆盖默认过滤方法

```html
<el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>

<tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all ref="tree"> </tree>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },

    data() {
      return {
        filterText: '',
        data: [
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
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
```

:::

## 单选只能选择叶子节点

:::demo 传入 `current-is-leaf` 即可; 传入 `is-leaf-method` 可自定义叶子节点, 优先级高于 `current-is-leaf`

```html
<el-row :gutter="20" class="demo-row">
  <el-col :span="12">
    <p class="label">current-is-leaf</p>
    <tree
      :data="data"
      :props="defaultProps"
      highlight-current
      current-is-leaf
      @node-click="handleNodeClick"
    ></tree>
  </el-col>
  <el-col :span="12">
    <p class="label">is-leaf-method</p>
    <tree
      :data="data"
      :props="defaultProps"
      highlight-current
      :is-leaf-method="isLeafMethod"
      @node-click="handleNodeClick"
    ></tree>
  </el-col>
</el-row>

<script>
  export default {
    data() {
      return {
        data: [
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
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      isLeafMethod(data, node) {
        return node.isLeaf && data.pid
      },
      handleNodeClick(data) {
        console.log('handleNodeClick -> data', data)
      }
    }
  }
</script>
```

:::

## Attributes

| 参数                  | 说明                                                                                                                                       | 类型                                   | 可选值                                                       | 默认值                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| show-check-all        | 全选; 需配合 show-checkbox 使用; 必须设置 node-key, 默认为 'id'; 配合 disabled 可能有问题                                                  | boolean                                | —                                                            | false                    |
| level                 | 展开层级                                                                                                                                   | number                                 | 0: 展开全部, 1: 展开到一级, ...                              | 1                        |
| text-ellipsis-props   | 文本溢出省略号                                                                                                                             | object                                 | 参见 [TextEllipsis](/ElementUI/TextEllipsis.html#attributes) | —                        |
| filter-node-method    | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏                                            | Function(value, data, node)            | —                                                            | 默认返回过滤节点的子节点 |
| current-is-leaf       | 单选只能选择叶子节点                                                                                                                       | boolean                                | —                                                            | false                    |
| is-leaf-method        | 单选自定义只能选择的叶子节点, 优先级高于 current-is-leaf, 返回 boolean                                                                     | function(data, node)                   | —                                                            |
| data                  | 展示数据                                                                                                                                   | array                                  | —                                                            | —                        |
| empty-text            | 内容为空的时候展示的文本                                                                                                                   | String                                 | —                                                            | —                        |
| node-key              | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                                                                       | String                                 | —                                                            | —                        |
| props                 | 配置选项，具体看下表                                                                                                                       | object                                 | —                                                            | —                        |
| render-after-expand   | 是否在第一次展开某个树节点后才渲染其子节点                                                                                                 | boolean                                | —                                                            | true                     |
| load                  | 加载子树数据的方法，仅当 lazy 属性为 true 时生效                                                                                           | function(node, resolve)                | —                                                            | —                        |
| render-content        | 树节点的内容区的渲染 Function                                                                                                              | Function(h, { node, data, store }      | —                                                            | —                        |
| highlight-current     | 是否高亮当前选中节点，默认值是 false。                                                                                                     | boolean                                | —                                                            | false                    |
| default-expand-all    | 是否默认展开所有节点                                                                                                                       | boolean                                | —                                                            | false                    |
| expand-on-click-node  | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。                           | boolean                                | —                                                            | true                     |
| check-on-click-node   | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                                                           | boolean                                | —                                                            | false                    |
| auto-expand-parent    | 展开子节点的时候是否自动展开父节点                                                                                                         | boolean                                | —                                                            | true                     |
| default-expanded-keys | 默认展开的节点的 key 的数组                                                                                                                | array                                  | —                                                            | —                        |
| show-checkbox         | 节点是否可被选择                                                                                                                           | boolean                                | —                                                            | false                    |
| check-strictly        | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                                                                     | boolean                                | —                                                            | false                    |
| default-checked-keys  | 默认勾选的节点的 key 的数组                                                                                                                | array                                  | —                                                            | —                        |
| current-node-key      | 当前选中的节点                                                                                                                             | string, number                         | —                                                            | —                        |
| accordion             | 是否每次只打开一个同级树节点展开                                                                                                           | boolean                                | —                                                            | false                    |
| indent                | 相邻级节点间的水平缩进，单位为像素                                                                                                         | number                                 | —                                                            | 16                       |
| icon-class            | 自定义树节点的图标                                                                                                                         | string                                 | -                                                            | -                        |
| lazy                  | 是否懒加载子节点，需与 load 方法结合使用                                                                                                   | boolean                                | —                                                            | false                    |
| draggable             | 是否开启拖拽节点功能                                                                                                                       | boolean                                | —                                                            | false                    |
| allow-drag            | 判断节点能否被拖拽                                                                                                                         | Function(node)                         | —                                                            | —                        |
| allow-drop            | 拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | —                                                            | —                        |

## props

| 参数     | 说明                                                     | 类型                          | 可选值 | 默认值 |
| -------- | -------------------------------------------------------- | ----------------------------- | ------ | ------ |
| label    | 指定节点标签为节点对象的某个属性值                       | string, function(data, node)  | —      | —      |
| children | 指定子树为节点对象的某个属性值                           | string                        | —      | —      |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | boolean, function(data, node) | —      | —      |
| isLeaf   | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —      | —      |

## 方法

`Tree` 内部使用了 Node 类型的对象来包装用户传入的数据，用来保存目前节点的状态。
`Tree` 拥有如下方法：

| 方法名              | 说明                                                                                      | 参数                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| filter              | 对树节点进行筛选操作                                                                      | 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数                                                                           |
| updateKeyChildren   | 通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性                                | (key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组                                                                                          |
| getCheckedNodes     | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组        | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 `false` 2. 是否包含半选节点，默认值为 `false`          |
| setCheckedNodes     | 设置目前勾选的节点，使用此方法必须设置 node-key 属性                                      | (nodes) 接收勾选节点数据的数组                                                                                                                   |
| getCheckedKeys      | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false`                                            |
| setCheckedKeys      | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性                            | (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的选中状态，默认值为 `false`          |
| setChecked          | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性                  | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false |
| getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组        | -                                                                                                                                                |
| getHalfCheckedKeys  | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 | -                                                                                                                                                |
| getCurrentKey       | 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null   | —                                                                                                                                                |
| getCurrentNode      | 获取当前被选中节点的 data，若没有节点被选中则返回 null                                    | —                                                                                                                                                |
| setCurrentKey       | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性                     | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点                                                                                           |
| setCurrentNode      | 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性                    | (node) 待被选节点的 node                                                                                                                         |
| getNode             | 根据 data 或者 key 拿到 Tree 组件中的 node                                                | (data) 要获得 node 的 key 或者 data                                                                                                              |
| remove              | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性                                  | (data) 要删除的节点的 data 或者 node                                                                                                             |
| append              | 为 Tree 中的一个节点追加一个子节点                                                        | (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node                                              |
| insertBefore        | 为 Tree 的一个节点的前面增加一个节点                                                      | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node                                           |
| insertAfter         | 为 Tree 的一个节点的后面增加一个节点                                                      | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node                                           |

## Events

| 事件名称         | 说明                                                  | 回调参数                                                                                                                                                           |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| node-click       | 节点被点击时的回调                                    | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                  |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件                | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| check-change     | 节点选中状态发生变化时的回调                          | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                               |
| check            | 当复选框被点击的时候触发                              | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change   | 当前选中节点变化时触发的事件                          | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                                           |
| node-expand      | 节点被展开时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-collapse    | 节点被关闭时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-drag-start  | 节点开始拖拽时触发的事件                              | 共两个参数，依次为：被拖拽节点对应的 Node、event                                                                                                                   |
| node-drag-enter  | 拖拽进入其他节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event                                                                                            |
| node-drag-leave  | 拖拽离开某个节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event                                                                                            |
| node-drag-over   | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event                                                                                          |
| node-drag-end    | 拖拽结束时（可能未成功）触发的事件                    | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event                               |
| node-drop        | 拖拽成功完成时触发的事件                              | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event                                           |

## Scoped Slot

| name | 说明                                      |
| ---- | ----------------------------------------- |
| —    | 自定义树节点的内容，参数为 { node, data } |
