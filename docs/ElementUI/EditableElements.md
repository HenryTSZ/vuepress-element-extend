# EditableElements 可编辑组件

封装 `ElementUI` 支持 `v-model` 的组件和本项目自定义组件

支持 单行文本、文本域、`Switch` 开关、选择器等 `ElementUI` `form` 大部分组件和本项目自定义组件: `SelectTree`、`NumberInput`、`RegInput` 等;

封装思路: [基于 ElementUI 封装的基础 table 和 form | Henry](https://tsz.now.sh/2020/05/16/based-on-element-ui-encapsulation-table-form/)

## 简单组件 - Input 等

:::demo 传入 `model` 及 `item` 即可; `model` 为 `v-model` 的对象, `item` 为组件属性集合

```html
<p v-for="item in items" :key="item.prop" class="info">
  <span class="label">{{item.label}}: </span>
  <editable-elements :model="model" :item="item"></editable-elements>
</p>
<script>
  export default {
    data() {
      return {
        model: {
          name: '',
          date1: '',
          date2: '',
          money: '',
          delivery: false,
          desc: '',
          info: '就是看看而已'
        },
        items: [
          { label: '活动名称', prop: 'name', type: 'text', component: 'el-input' },
          { label: '活动日期', prop: 'date1', type: 'date', component: 'el-date-picker' },
          { label: '活动时间', prop: 'date2', type: 'time', component: 'el-time-picker' },
          {
            label: '活动经费',
            prop: 'money',
            type: 'integer',
            component: 'number-input',
            slots: { append: '元' }
          },
          { label: '即时配送', prop: 'delivery', type: 'switch', component: 'el-switch' },
          { label: '活动形式', prop: 'desc', type: 'textarea', component: 'el-input' },
          { label: '活动介绍', prop: 'info', type: 'info', component: 'div' }
        ]
      }
    }
  }
</script>
<style>
  .info {
    display: flex;
    align-items: center;
  }
  .label {
    margin-right: 15px;
  }
  .el-input,
  .el-textarea {
    width: 220px;
  }
</style>
```

:::

## 可选择组件 - Select 等

:::demo 传入 `model` 及 `item` 即可; `item` 中增加 `options` 字段, 里面是选择数据: `[{label: '', value: ''}]`, 并可以通过 `props` 自定义 `label` 和 `value` 字段

```html
<p v-for="item in items" :key="item.prop" class="info">
  <span class="label">{{item.label}}: </span>
  <editable-elements :model="model" :item="item"></editable-elements>
</p>
<script>
  export default {
    data() {
      return {
        model: {
          region: '',
          resource: '',
          type: []
        },
        items: [
          {
            label: '活动区域',
            prop: 'region',
            type: 'select',
            component: 'el-select',
            options: [
              { label: '区域一', value: 'shanghai' },
              { label: '区域二', value: 'beijing' }
            ]
          },
          {
            label: '特殊资源',
            prop: 'resource',
            type: 'radio',
            component: 'el-radio-group',
            options: [
              { name: '线上品牌商赞助', id: 'online' },
              { name: '线下场地免费', id: 'offline' }
            ],
            props: {
              label: 'name',
              value: 'id'
            }
          },
          {
            label: '活动性质',
            prop: 'type',
            type: 'checkbox',
            component: 'el-checkbox-group',
            options: [
              { label: '美食/餐厅线上活动', value: 'a' },
              { label: '地推活动', value: 'b' },
              { label: '线下主题活动', value: 'c' },
              { label: '单纯品牌曝光', value: 'd' }
            ]
          }
        ]
      }
    }
  }
</script>
<style>
  .info {
    display: flex;
    align-items: center;
  }
  .label {
    margin-right: 15px;
  }
</style>
```

:::

## Attributes

| 参数  | 说明                     | 类型   | 可选值 | 默认值 |
| ----- | ------------------------ | ------ | ------ | ------ |
| model | v-model 对象             | object | —      | —      |
| item  | 组件配置选项, 具体看下表 | object | —      | —      |

### item

| 参数      | 说明                                                                                                                                               | 类型    | 可选值 | 默认值                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------------------------------------ |
| label     | 标签文本                                                                                                                                           | string  | —      | —                                    |
| prop      | 表单域 model 字段                                                                                                                                  | string  | —      | —                                    |
| type      | 组件类型, 参见各组件该属性, 如无该属性, 即为该组件名去掉 `el-`, 如 `el-select` 为 `select`;`type` 为 `info` 时, 只做展示使用, 只支持文字           | string  | —      | —                                    |
| options   | 可选择组件的选择数据                                                                                                                               | array   | —      | `[{ label: '', value: '' }]`         |
| props     | 配置 `options` 的 `label` 及 `value`                                                                                                               | object  | —      | `{ label: 'label', value: 'value' }` |
| component | 组件名称, `ElementUI` 组件名称和本项目自定义组件名称. 如: `'el-input'`, `'number-input'`; `type` 为 `info` 时, 为不可编辑的组件, 如: `div`, `p` 等 | string  | —      | —                                    |
| focus     | 自动聚焦                                                                                                                                           | boolean | —      | false                                |
| slots     | 当前组件的 `slot`, 仅支持简单的文字; 如: `{ append: '.com' }`                                                                                      | object  | —      | —                                    |
| events    | 事件. 如: `{ change: this.change }`, `this.change` 为 `methods` 中的事件                                                                           | object  | —      | —                                    |
| 其他字段  | 参见 `ElementUI` 对应组件及本项目自定义组件                                                                                                        | —       | —      | —                                    |
