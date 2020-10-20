# RegInput

基于 `NumberInput` 的思想, 通过传入的正则自定义输入内容的输入框

封装思路: [基于 ElementUI 封装的 NumberInput | Henry](https://tsz.now.sh/2020/05/10/based-on-element-ui-encapsulation-number-input/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/RegInput.vue)

## 基础用法

:::demo 将 `el-input` 改为 `reg-input` 即可. 默认可以输入任何内容

```html
<reg-input v-model="input" placeholder="请输入内容"></reg-input>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```

:::

## 自定义

:::demo 通过传入 `reg` 自定义输入内容

```html
<reg-input
  v-for="(item, index) in inputs"
  :key="index"
  v-bind="item"
  :placeholder="`请输入${item.label}`"
></reg-input>

<script>
  export default {
    data() {
      return {
        inputs: [
          {
            value: '',
            label: '中文',
            reg: /^[\u4E00-\u9FA5]*$/
          },
          {
            value: '',
            label: '数字',
            reg: /^-?(\d*|\d+(\.\d*)?)$/
          },
          {
            value: '',
            label: 'Email',
            reg: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
          },
          {
            value: '',
            label: '手机号',
            reg: /^1([3456789]\d{0,9})?$/,
            len: 11
          },
          {
            value: '',
            label: '身份证号',
            reg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          }
        ]
      }
    }
  }
</script>
```

:::

## Attributes

| 参数            | 说明                                 | 类型            | 可选值                             | 默认值  |
| --------------- | ------------------------------------ | --------------- | ---------------------------------- | ------- |
| value / v-model | 绑定值                               | string / number | —                                  | —       |
| maxlength       | 原生属性，最大输入长度               | number          | —                                  | —       |
| minlength       | 原生属性，最小输入长度               | number          | —                                  | —       |
| placeholder     | 输入框占位文本                       | string          | —                                  | —       |
| clearable       | 是否可清空                           | boolean         | —                                  | false   |
| disabled        | 禁用                                 | boolean         | —                                  | false   |
| size            | 输入框尺寸                           | string          | medium / small / mini              | —       |
| prefix-icon     | 输入框头部图标                       | string          | —                                  | —       |
| suffix-icon     | 输入框尾部图标                       | string          | —                                  | —       |
| autocomplete    | 原生属性，自动补全                   | string          | on, off                            | off     |
| auto-complete   | 下个主版本弃用                       | string          | on, off                            | off     |
| name            | 原生属性                             | string          | —                                  | —       |
| readonly        | 原生属性，是否只读                   | boolean         | —                                  | false   |
| max             | 原生属性，设置最大值                 | —               | —                                  | —       |
| min             | 原生属性，设置最小值                 | —               | —                                  | —       |
| step            | 原生属性，设置输入字段的合法数字间隔 | —               | —                                  | —       |
| resize          | 控制是否能被用户缩放                 | string          | none, both, horizontal, vertical   | —       |
| autofocus       | 原生属性，自动获取焦点               | boolean         | true, false                        | false   |
| form            | 原生属性                             | string          | —                                  | —       |
| label           | 输入框关联的 label 文字              | string          | —                                  | —       |
| tabindex        | 输入框的 tabindex                    | string          | -                                  | -       |
| validate-event  | 输入时是否触发表单的校验             | boolean         | -                                  | true    |

## Slots

| name    | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

## Events

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)            |
| change   | 仅在输入框失去焦点或用户按下回车时触发        | (value: string \| number) |
| input    | 在 Input 值改变时触发                         | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |
