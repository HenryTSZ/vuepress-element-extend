# NumberInput 数字输入框

基于 `el-input` 封装的 "只能输入数字" 的输入框

只能输入数字为什么要加引号呢? 因为输入小数的时候, `1.` 也是可以验证通过了, 输入负数的时候, 就一个负号 `-` 也是可以验证通过的, 只能说是相对来说限制为数字

封装思路: [基于 ElementUI 封装的 NumberInput | Henry](https://tsz.now.sh/2020/05/10/based-on-element-ui-encapsulation-number-input/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/NumberInput.vue)

## 基础用法

:::demo 将 `el-input` 改为 `number-input` 即可. 默认为正数, 最多两位小数

```html
<number-input v-model="input" placeholder="请输入内容"></number-input>

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

## 分类

展示全部分类

:::demo 通过 `type` , `signed` 和 `places` 来设置数字类型和小数位数

```html
<number-input
  v-for="(item, index) in inputs"
  :key="index"
  v-bind="item"
  :placeholder="`请输入${item.label}`"
></number-input>

<script>
  export default {
    data() {
      return {
        inputs: [
          {
            value: '',
            label: '正数'
          },
          {
            value: '',
            places: 3,
            label: '正数, 小数最多 3 位'
          },
          {
            value: '',
            signed: 'minus',
            places: 2,
            label: '负数'
          },
          {
            value: '',
            signed: 'all',
            places: 2,
            label: '全部'
          },
          {
            value: '',
            type: 'integer',
            label: '正整数'
          },
          {
            value: '',
            type: 'integer',
            signed: 'minus',
            label: '负整数'
          },
          {
            value: '',
            type: 'integer',
            signed: 'all',
            label: '整数'
          }
        ]
      }
    }
  }
</script>
<style>
.el-input {
  margin: 0 10px;
}
</style>
```

:::

## Attributes

| 参数            | 说明                                 | 类型            | 可选值                             | 默认值  |
| --------------- | ------------------------------------ | --------------- | ---------------------------------- | ------- |
| type            | 类型                                 | string          | integer: 整数, decimal: 小数       | decimal |
| signed          | 正负数                               | string          | plus: 正数, minus: 负数, all: 全部 | plus    |
| places          | 保留的小数位数, 默认 2 位            | string / number | —                                  | 2       |
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
