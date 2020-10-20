# BaseTable 基础表格

简化 `el-form` 重复代码, 最少仅需要一行代码即可

封装思路: [基于 ElementUI 封装的基础 table 和 form | Henry](https://tsz.now.sh/2020/05/16/based-on-element-ui-encapsulation-table-form/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/BaseTable.vue)

## 基础表格

基础的表格展示用法.

:::demo 参见 [ElementUI-Table](https://element.eleme.cn/2.13/#/zh-CN/component/table) 用法, 只需要将最外层 `<el-table>` 替换为 `<base-table>` 即可

```html
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```

:::

## 仅展示

:::demo `<base-table>` 增加一个 `Attributes` : `columns` , 里面参数参见 [table-column-attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)

```html
<base-table :data="data" :columns="columns"></base-table>
<script>
  export default {
    data() {
      const findVal = (data, key, value = 'value', label = 'label') => {
        let target
        data.some(item => {
          if (item[value] === key) {
            target = item[label]
            return true
          } else {
            return false
          }
        })
        return target
      }
      const addressMap = [
        {
          label: '上海市普陀区金沙江路 1519 弄',
          value: '1519'
        },
        {
          label: '上海市普陀区金沙江路 1518 弄',
          value: '1518'
        },
        {
          label: '上海市普陀区金沙江路 1517 弄',
          value: '1517'
        },
        {
          label: '上海市普陀区金沙江路 1516 弄',
          value: '1516'
        }
      ]
      return {
        data: [
          {
            name: '王小虎',
            age: 19,
            money: 19.99,
            address: '1519'
          },
          {
            name: '王小虎',
            age: 18,
            money: 18.99,
            address: '1518'
          },
          {
            name: '王小虎',
            age: 17,
            money: 17.99,
            address: '1517'
          },
          {
            name: '王小虎',
            age: 16,
            money: 16.99,
            address: '1516'
          }
        ],
        columns: [
          {
            label: '名字',
            prop: 'name'
          },
          {
            label: '年龄',
            prop: 'age'
          },
          {
            label: '资产',
            prop: 'money'
          },
          {
            label: '住址',
            prop: 'address',
            width: '300px',
            formatter(row) {
              return findVal(addressMap, row.address)
            }
          }
        ]
      }
    }
  }
</script>
```

:::

## 可编辑

:::demo `columns` 里增加 `editable: true` 即可, 同时需要传入 `component` 和 `type` 等参数, 具体参见 [EditableElements - item](/ElementUI/EditableElements.html#item)

```html
<base-table :data="data" :columns="columns" height="280px"></base-table>
<script>
  export default {
    data() {
      const findVal = (data, key, value = 'value', label = 'label') => {
        let target
        data.some(item => {
          if (item[value] === key) {
            target = item[label]
            return true
          } else {
            return false
          }
        })
        return target
      }
      const addressMap = [
        {
          label: '上海市普陀区金沙江路 1519 弄',
          value: '1519'
        },
        {
          label: '上海市普陀区金沙江路 1518 弄',
          value: '1518'
        },
        {
          label: '上海市普陀区金沙江路 1517 弄',
          value: '1517'
        },
        {
          label: '上海市普陀区金沙江路 1516 弄',
          value: '1516'
        }
      ]
      return {
        data: [
          {
            name: '王小虎',
            age: 19,
            money: 19.99,
            address: '1519'
          },
          {
            name: '王小虎',
            age: 18,
            money: 18.99,
            address: '1518'
          },
          {
            name: '王小虎',
            age: 17,
            money: 17.99,
            address: '1517'
          },
          {
            name: '王小虎',
            age: 16,
            money: 16.99,
            address: '1516'
          }
        ],
        columns: [
          {
            label: '名字',
            prop: 'name',
            editable: true,
            component: 'el-input',
            type: 'text'
          },
          {
            label: '年龄',
            prop: 'age',
            editable: true,
            component: 'number-input',
            type: 'integer'
          },
          {
            label: '资产',
            prop: 'money',
            editable: true,
            component: 'number-input'
          },
          {
            label: '住址',
            prop: 'address',
            width: '300px',
            editable: true,
            component: 'el-select',
            type: 'select',
            options: addressMap,
            formatter(row) {
              return findVal(addressMap, row.address)
            }
          }
        ]
      }
    }
  }
</script>
```

:::

## 自定义可编辑

:::demo `columns` 里增加 `editableMethod` 即可. 如本例中只有年龄大于 `17` 才能修改住址

```html
<base-table :data="data" :columns="columns"></base-table>
<script>
  export default {
    data() {
      const findVal = (data, key, value = 'value', label = 'label') => {
        let target
        data.some(item => {
          if (item[value] === key) {
            target = item[label]
            return true
          } else {
            return false
          }
        })
        return target
      }
      const addressMap = [
        {
          label: '上海市普陀区金沙江路 1519 弄',
          value: '1519'
        },
        {
          label: '上海市普陀区金沙江路 1518 弄',
          value: '1518'
        },
        {
          label: '上海市普陀区金沙江路 1517 弄',
          value: '1517'
        },
        {
          label: '上海市普陀区金沙江路 1516 弄',
          value: '1516'
        }
      ]
      return {
        data: [
          {
            name: '王小虎',
            age: 19,
            money: 19.99,
            address: '1519'
          },
          {
            name: '王小虎',
            age: 18,
            money: 18.99,
            address: '1518'
          },
          {
            name: '王小虎',
            age: 17,
            money: 17.99,
            address: '1517'
          },
          {
            name: '王小虎',
            age: 16,
            money: 16.99,
            address: '1516'
          }
        ],
        columns: [
          {
            label: '名字',
            prop: 'name',
            editable: true,
            component: 'el-input',
            type: 'text'
          },
          {
            label: '年龄',
            prop: 'age',
            editable: true,
            component: 'number-input',
            type: 'integer'
          },
          {
            label: '资产',
            prop: 'money',
            editable: true,
            component: 'number-input'
          },
          {
            label: '住址',
            prop: 'address',
            width: '300px',
            editableMethod(row) {
              return row.age > 17
            },
            component: 'el-select',
            type: 'select',
            options: addressMap,
            formatter(row) {
              return findVal(addressMap, row.address)
            }
          }
        ]
      }
    }
  }
</script>
```

:::

## 自动聚焦行列

:::demo 通过 `focus-row` 和 `focus-col` 控制聚焦行列

```html
行:
<el-input-number v-model="focusRow" :min="0" :max="3"></el-input-number>
列:
<el-input-number v-model="focusCol" :min="0" :max="3"></el-input-number>
<base-table
  :data="data"
  :columns="columns"
  :focus-row="focusRow"
  :focus-col="focusCol"
></base-table>
<script>
  export default {
    data() {
      const findVal = (data, key, value = 'value', label = 'label') => {
        let target
        data.some(item => {
          if (item[value] === key) {
            target = item[label]
            return true
          } else {
            return false
          }
        })
        return target
      }
      const addressMap = [
        {
          label: '上海市普陀区金沙江路 1519 弄',
          value: '1519'
        },
        {
          label: '上海市普陀区金沙江路 1518 弄',
          value: '1518'
        },
        {
          label: '上海市普陀区金沙江路 1517 弄',
          value: '1517'
        },
        {
          label: '上海市普陀区金沙江路 1516 弄',
          value: '1516'
        }
      ]
      return {
        focusRow: 0,
        focusCol: 0,
        data: [
          {
            name: '王小虎',
            age: 19,
            money: 19.99,
            address: '1519'
          },
          {
            name: '王小虎',
            age: 18,
            money: 18.99,
            address: '1518'
          },
          {
            name: '王小虎',
            age: 17,
            money: 17.99,
            address: '1517'
          },
          {
            name: '王小虎',
            age: 16,
            money: 16.99,
            address: '1516'
          }
        ],
        columns: [
          {
            label: '名字',
            prop: 'name',
            editable: true,
            component: 'el-input',
            type: 'text'
          },
          {
            label: '年龄',
            prop: 'age',
            editable: true,
            component: 'number-input',
            type: 'integer'
          },
          {
            label: '资产',
            prop: 'money',
            editable: true,
            component: 'number-input'
          },
          {
            label: '住址',
            prop: 'address',
            width: '300px',
            editable: true,
            component: 'el-select',
            type: 'select',
            options: addressMap,
            formatter(row) {
              return findVal(addressMap, row.address)
            }
          }
        ]
      }
    }
  }
</script>
```

:::

## 默认选中

:::demo 通过传入 `current-node-key` 和 `default-checked-keys` 设置默认选中, 必须传入 `row-key` , 默认为 `id` . 此例同时展示了通过 `slot` 来传入列, 默认在 `columns` 后面, 通过具名 `prev` 可以设置到 `columns` 前面

```html
<p class="tc">单选</p>
<base-table
  :data="data"
  :columns="columns"
  highlight-current-row
  row-key="age"
  :current-node-key="18"
>
  <el-table-column type="index" width="50" label="序号"></el-table-column>
</base-table>
<p class="tc">多选</p>
<base-table :data="data" :columns="columns" row-key="age" :default-checked-keys="[17, 19]">
  <el-table-column slot="prev" type="selection" width="55"></el-table-column>
</base-table>

<script>
  export default {
    data() {
      const findVal = (data, key, value = 'value', label = 'label') => {
        let target
        data.some(item => {
          if (item[value] === key) {
            target = item[label]
            return true
          } else {
            return false
          }
        })
        return target
      }
      const addressMap = [
        {
          label: '上海市普陀区金沙江路 1519 弄',
          value: '1519'
        },
        {
          label: '上海市普陀区金沙江路 1518 弄',
          value: '1518'
        },
        {
          label: '上海市普陀区金沙江路 1517 弄',
          value: '1517'
        },
        {
          label: '上海市普陀区金沙江路 1516 弄',
          value: '1516'
        }
      ]
      return {
        data: [
          {
            name: '王小虎',
            age: 19,
            money: 19.99,
            address: '1519'
          },
          {
            name: '王小虎',
            age: 18,
            money: 18.99,
            address: '1518'
          },
          {
            name: '王小虎',
            age: 17,
            money: 17.99,
            address: '1517'
          },
          {
            name: '王小虎',
            age: 16,
            money: 16.99,
            address: '1516'
          }
        ],
        columns: [
          {
            label: '名字',
            prop: 'name'
          },
          {
            label: '年龄',
            prop: 'age'
          },
          {
            label: '资产',
            prop: 'money'
          },
          {
            label: '住址',
            prop: 'address',
            width: '300px',
            formatter(row) {
              return findVal(addressMap, row.address)
            }
          }
        ]
      }
    }
  }
</script>
```

:::

## Attributes

| 参数                    | 说明                                                                                                                                                                                                          | 类型                                                  | 可选值                          | 默认值                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------- | --------------------------------------------------------------- |
| data                    | 显示的数据                                                                                                                                                                                                    | array                                                 | —                               | —                                                               |
| columns                 | 列属性集合, 具体看下表                                                                                                                                                                                        | array                                                 | —                               | —                                                               |
| props                   | 统一配置 `columns` 的 `prop` 及 `label`                                                                                                                                                                       | object                                                | —                               | `{ prop: 'prop', label: 'label' }`                              |
| focus-row               | 自动聚焦行                                                                                                                                                                                                    | number                                                | —                               | 0                                                               |
| focus-col               | 自动聚焦列                                                                                                                                                                                                    | number                                                | —                               | 0                                                               |
| current-node-key        | 当前选中的节点, 必须设置 `row-key`                                                                                                                                                                            | string, number                                        | —                               | —                                                               |
| default-checked-keys    | 默认勾选的节点的 `key` 的数组, 必须设置 `row-key`                                                                                                                                                             | array                                                 | —                               | —                                                               |
| height                  | Table 的高度, 默认为自动高度. 如果 height 为 number 类型, 单位 px; 如果 height 为 string 类型, 则这个高度会设置为 Table 的 style.height 的值, Table 的高度会受控于外部样式.                                   | string/number                                         | —                               | —                                                               |
| max-height              | Table 的最大高度. 合法的值为数字或者单位为 px 的高度.                                                                                                                                                         | string/number                                         | —                               | —                                                               |
| stripe                  | 是否为斑马纹 table                                                                                                                                                                                            | boolean                                               | —                               | false                                                           |
| border                  | 是否带有纵向边框                                                                                                                                                                                              | boolean                                               | —                               | false                                                           |
| size                    | Table 的尺寸                                                                                                                                                                                                  | string                                                | medium / small / mini           | —                                                               |
| fit                     | 列的宽度是否自撑开                                                                                                                                                                                            | boolean                                               | —                               | true                                                            |
| show-header             | 是否显示表头                                                                                                                                                                                                  | boolean                                               | —                               | true                                                            |
| highlight-current-row   | 是否要高亮当前行                                                                                                                                                                                              | boolean                                               | —                               | false                                                           |
| current-row-key         | 当前行的 key, 只写属性                                                                                                                                                                                        | String, Number                                        | —                               | —                                                               |
| row-class-name          | 行的 className 的回调方法, 也可以使用字符串为所有行设置一个固定的 className.                                                                                                                                  | Function({row, rowIndex})/String                      | —                               | —                                                               |
| row-style               | 行的 style 的回调方法, 也可以使用一个固定的 Object 为所有行设置一样的 Style.                                                                                                                                  | Function({row, rowIndex})/Object                      | —                               | —                                                               |
| cell-class-name         | 单元格的 className 的回调方法, 也可以使用字符串为所有单元格设置一个固定的 className.                                                                                                                          | Function({row, column, rowIndex, columnIndex})/String | —                               | —                                                               |
| cell-style              | 单元格的 style 的回调方法, 也可以使用一个固定的 Object 为所有单元格设置一样的 Style.                                                                                                                          | Function({row, column, rowIndex, columnIndex})/Object | —                               | —                                                               |
| header-row-class-name   | 表头行的 className 的回调方法, 也可以使用字符串为所有表头行设置一个固定的 className.                                                                                                                          | Function({row, rowIndex})/String                      | —                               | —                                                               |
| header-row-style        | 表头行的 style 的回调方法, 也可以使用一个固定的 Object 为所有表头行设置一样的 Style.                                                                                                                          | Function({row, rowIndex})/Object                      | —                               | —                                                               |
| header-cell-class-name  | 表头单元格的 className 的回调方法, 也可以使用字符串为所有表头单元格设置一个固定的 className.                                                                                                                  | Function({row, column, rowIndex, columnIndex})/String | —                               | —                                                               |
| header-cell-style       | 表头单元格的 style 的回调方法, 也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style.                                                                                                                  | Function({row, column, rowIndex, columnIndex})/Object | —                               | —                                                               |
| row-key                 | 行数据的 Key, 用来优化 Table 的渲染; 在使用 reserve-selection 功能与显示树形数据时, 该属性是必填的. 类型为 String 时, 支持多层访问: `user.info.id` , 但不支持 `user.info[0].id` , 此种情况请使用 `Function` . | Function(row)/String                                  | —                               | id                                                              |
| empty-text              | 空数据时显示的文本内容, 也可以通过 `slot="empty"` 设置                                                                                                                                                        | String                                                | —                               | 暂无数据                                                        |
| default-expand-all      | 是否默认展开所有行, 当 Table 包含展开行存在或者为树形表格时有效                                                                                                                                               | Boolean                                               | —                               | false                                                           |
| expand-row-keys         | 可以通过该属性设置 Table 目前的展开行, 需要设置 row-key 属性才能使用, 该属性为展开行的 keys 数组.                                                                                                             | Array                                                 | —                               |                                                                 |
| default-sort            | 默认的排序列的 prop 和顺序. 它的 `prop` 属性指定默认的排序的列, `order` 指定默认排序的顺序                                                                                                                    | Object                                                | `order` : ascending, descending | 如果只指定了 `prop` , 没有指定 `order` , 则默认顺序是 ascending |
| tooltip-effect          | tooltip `effect` 属性                                                                                                                                                                                         | String                                                | dark/light                      |                                                                 | dark |
| show-summary            | 是否在表尾显示合计行                                                                                                                                                                                          | Boolean                                               | —                               | false                                                           |
| sum-text                | 合计行第一列的文本                                                                                                                                                                                            | String                                                | —                               | 合计                                                            |
| summary-method          | 自定义的合计计算方法                                                                                                                                                                                          | Function({ columns, data })                           | —                               | —                                                               |
| span-method             | 合并行或列的计算方法                                                                                                                                                                                          | Function({ row, column, rowIndex, columnIndex })      | —                               | —                                                               |
| select-on-indeterminate | 在多选表格中, 当仅有部分行被选中时, 点击表头的多选框时的行为. 若为 true, 则选中所有行; 若为 false, 则取消选择所有行                                                                                           | Boolean                                               | —                               | true                                                            |
| indent                  | 展示树形数据时, 树节点的缩进                                                                                                                                                                                  | Number                                                | —                               | 16                                                              |
| lazy                    | 是否懒加载子节点数据                                                                                                                                                                                          | Boolean                                               | —                               | —                                                               |
| load                    | 加载子节点数据的函数, lazy 为 true 时生效, 函数第二个参数包含了节点的层级信息                                                                                                                                 | Function(row, treeNode, resolve)                      | —                               | —                                                               |
| tree-props              | 渲染嵌套数据的配置选项                                                                                                                                                                                        | Object                                                | —                               | { hasChildren: 'hasChildren', children: 'children' }            |

### columns 每项

| 参数                                                             | 说明                                                                                                                                                                                  | 类型                                                  | 可选值                                                                                               | 默认值                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| [EditableElements - item](/ElementUI/EditableElements.html#item) | 与 EditableElements 一样                                                                                                                                                              | —                                                     | —                                                                                                    | —                                 |
| editable                                                         | 是否可编辑                                                                                                                                                                            | boolean                                               | —                                                                                                    | false                             |
| editable-method                                                  | 自定义是否可编辑                                                                                                                                                                      | Function(row, column, cellValue, index), 返回 boolean | —                                                                                                    | —                                 |
| type                                                             | 不可编辑时对应列的类型. 如果设置了 `selection` 则显示多选框; 如果设置了 `index` 则显示该行的索引(从 1 开始计算); 如果设置了 `expand` 则显示为一个可展开的按钮                         | string                                                | selection/index/expand                                                                               | —                                 |
| column-key                                                       | column 的 key, 如果需要使用 filter-change 事件, 则需要此属性标识是哪个 column 的筛选条件                                                                                              | string                                                | —                                                                                                    | —                                 |
| label                                                            | 显示的标题                                                                                                                                                                            | string                                                | —                                                                                                    | —                                 |
| prop                                                             | 对应列内容的字段名, 也可以使用 property 属性                                                                                                                                          | string                                                | —                                                                                                    | —                                 |
| width                                                            | 对应列的宽度                                                                                                                                                                          | string                                                | —                                                                                                    | —                                 |
| min-width                                                        | 对应列的最小宽度, 与 width 的区别是 width 是固定的, min-width 会把剩余宽度按比例分配给设置了 min-width 的列                                                                           | string                                                | —                                                                                                    | —                                 |
| fixed                                                            | 列是否固定在左侧或者右侧, true 表示固定在左侧                                                                                                                                         | string, boolean                                       | true, left, right                                                                                    | —                                 |
| render-header                                                    | 列标题 Label 区域渲染使用的 Function                                                                                                                                                  | Function(h, { column, \$index })                      | —                                                                                                    | —                                 |
| sortable                                                         | 对应列是否可以排序, 如果设置为 'custom', 则代表用户希望远程排序, 需要监听 Table 的 sort-change 事件                                                                                   | boolean, string                                       | true, false, 'custom'                                                                                | false                             |
| sort-method                                                      | 对数据进行排序的时候使用的方法, 仅当 sortable 设置为 true 的时候有效, 需返回一个数字, 和 Array.sort 表现一致                                                                          | Function(a, b)                                        | —                                                                                                    | —                                 |
| sort-by                                                          | 指定数据按照哪个属性进行排序, 仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效. 如果 sort-by 为数组, 则先按照第 1 个属性排序, 如果第 1 个相等, 再按照第 2 个排序, 以此类推 | String/Array/Function(row, index)                     | —                                                                                                    | —                                 |
| sort-orders                                                      | 数据在排序时所使用排序策略的轮转顺序, 仅当 sortable 为 true 时有效. 需传入一个数组, 随着用户点击表头, 该列依次按照数组中元素的顺序进行排序                                            | array                                                 | 数组中的元素需为以下三者之一: `ascending` 表示升序, `descending` 表示降序, `null` 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable                                                        | 对应列是否可以通过拖动改变宽度(需要在 el-table 上设置 border 属性为真)                                                                                                                | boolean                                               | —                                                                                                    | true                              |
| formatter                                                        | 用来格式化内容                                                                                                                                                                        | Function(row, column, cellValue, index)               | —                                                                                                    | —                                 |
| show-overflow-tooltip                                            | 当内容过长被隐藏时显示 tooltip                                                                                                                                                        | Boolean                                               | —                                                                                                    | false                             |
| align                                                            | 对齐方式                                                                                                                                                                              | String                                                | left/center/right                                                                                    | left                              |
| header-align                                                     | 表头对齐方式, 若不设置该项, 则使用表格的对齐方式                                                                                                                                      | String                                                | left/center/right                                                                                    | —                                 |
| class-name                                                       | 列的 className                                                                                                                                                                        | string                                                | —                                                                                                    | —                                 |
| label-class-name                                                 | 当前列标题的自定义类名                                                                                                                                                                | string                                                | —                                                                                                    | —                                 |
| selectable                                                       | 仅对 type=selection 的列有效, 类型为 Function, Function 的返回值用来决定这一行的 CheckBox 是否可以勾选                                                                                | Function(row, index)                                  | —                                                                                                    | —                                 |
| reserve-selection                                                | 仅对 type=selection 的列有效, 类型为 Boolean, 为 true 则会在数据更新之后保留之前选中的数据(需指定 `row-key` )                                                                         | Boolean                                               | —                                                                                                    | false                             |
| filters                                                          | 数据过滤的选项, 数组格式, 数组中的元素需要有 text 和 value 属性.                                                                                                                      | Array[{ text, value }]                                | —                                                                                                    | —                                 |
| filter-placement                                                 | 过滤弹出框的定位                                                                                                                                                                      | String                                                | 与 Tooltip 的 `placement` 属性相同                                                                   | —                                 |
| filter-multiple                                                  | 数据过滤的选项是否多选                                                                                                                                                                | Boolean                                               | —                                                                                                    | true                              |
| filter-method                                                    | 数据过滤使用的方法, 如果是多选的筛选项, 对每一条数据会执行多次, 任意一次返回 true 就会显示.                                                                                           | Function(value, row, column)                          | —                                                                                                    | —                                 |
| filtered-value                                                   | 选中的数据过滤项, 如果需要自定义表头过滤的渲染方式, 可能会需要此属性.                                                                                                                 | Array                                                 | —                                                                                                    | —                                 |

## Events

| 事件名             | 说明                                                                                                                                        | 参数                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| row-change         | 可编辑数据发生变化时触发                                                                                                                    | row, value, prop                  |
| select             | 当用户手动勾选数据行的 Checkbox 时触发的事件                                                                                                | selection, row                    |
| select-all         | 当用户手动勾选全选 Checkbox 时触发的事件                                                                                                    | selection                         |
| selection-change   | 当选择项发生变化时会触发该事件                                                                                                              | selection                         |
| cell-mouse-enter   | 当单元格 hover 进入时会触发该事件                                                                                                           | row, column, cell, event          |
| cell-mouse-leave   | 当单元格 hover 退出时会触发该事件                                                                                                           | row, column, cell, event          |
| cell-click         | 当某个单元格被点击时会触发该事件                                                                                                            | row, column, cell, event          |
| cell-dblclick      | 当某个单元格被双击击时会触发该事件                                                                                                          | row, column, cell, event          |
| row-click          | 当某一行被点击时会触发该事件                                                                                                                | row, column, event                |
| row-contextmenu    | 当某一行被鼠标右键点击时会触发该事件                                                                                                        | row, column, event                |
| row-dblclick       | 当某一行被双击时会触发该事件                                                                                                                | row, column, event                |
| header-click       | 当某一列的表头被点击时会触发该事件                                                                                                          | column, event                     |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件                                                                                                    | column, event                     |
| sort-change        | 当表格的排序条件发生变化的时候会触发该事件                                                                                                  | { column, prop, order }           |
| filter-change      | 当表格的筛选条件发生变化的时候会触发该事件, 参数的值是一个对象, 对象的 key 是 column 的 columnKey, 对应的 value 为用户选择的筛选条件的数组. | filters                           |
| current-change     | 当表格的当前行发生变化的时候会触发该事件, 如果要高亮当前行, 请打开表格的 highlight-current-row 属性                                         | currentRow, oldCurrentRow         |
| header-dragend     | 当拖动表头改变了列的宽度的时候会触发该事件                                                                                                  | newWidth, oldWidth, column, event |
| expand-change      | 当用户对某一行展开或者关闭的时候会触发该事件(展开行时, 回调的第二个参数为 expandedRows; 树形表格时第二参数为 expanded)                      | row, (expandedRows \| expanded)   |

## Methods

| 方法名             | 说明                                                                                                                  | 参数                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| clearSelection     | 用于多选表格, 清空用户的选择                                                                                          | —                           |
| toggleRowSelection | 用于多选表格, 切换某一行的选中状态, 如果使用了第二个参数, 则是设置这一行选中与否(selected 为 true 则选中)             | row, selected               |
| toggleAllSelection | 用于多选表格, 切换所有行的选中状态                                                                                    | -                           |
| toggleRowExpansion | 用于可展开表格与树形表格, 切换某一行的展开状态, 如果使用了第二个参数, 则是设置这一行展开与否(expanded 为 true 则展开) | row, expanded               |
| setCurrentRow      | 用于单选表格, 设定某一行为选中行, 如果调用时不加参数, 则会取消目前高亮行的选中状态.                                   | row                         |
| clearSort          | 用于清空排序条件, 数据会恢复成未排序的状态                                                                            | —                           |
| clearFilter        | 不传入参数时用于清空所有过滤条件, 数据会恢复成未过滤的状态, 也可传入由 columnKey 组成的数组以清除指定列的过滤条件     | columnKey                   |
| doLayout           | 对 Table 进行重新布局. 当 Table 或其祖先元素由隐藏切换为显示时, 可能需要调用此方法                                    | —                           |
| sort               | 手动对 Table 进行排序. 参数 `prop` 属性指定排序列, `order` 指定排序顺序.                                              | prop: string, order: string |
