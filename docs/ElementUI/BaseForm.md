# BaseForm 基础表单

简化 `el-form` 重复代码, 最少仅需要一行代码即可

支持 单行文本、文本域、`Switch` 开关、选择器等 `ElementUI form` 大部分组件和本项目自定义组件: `NumberInput`、`SelectTree` 等;

封装思路: [基于 ElementUI 封装的基础 table 和 form | Henry](https://tsz.now.sh/2020/05/16/based-on-element-ui-encapsulation-table-form/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/BaseForm.vue)

## 基础用法

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 参见 [ElementUI-Form](https://element.eleme.cn/2.13/#/zh-CN/component/form) 用法, 只需要将最外层 `<el-form>` 替换为 `<base-form>` 即可

```html
<base-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="form.date1"
        style="width: 100%;"
      ></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker
        placeholder="选择时间"
        v-model="form.date2"
        style="width: 100%;"
      ></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</base-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>
```

:::

## 进阶用法

包含 `ElementUI` 组件和自定义组件

::: demo `<base-form>` 增加一个 `Attributes`: `form-items`, 里面参数参见 [form-items](/ElementUI/BaseForm.html#form-items-%E6%AF%8F%E9%A1%B9)

```html
<base-form :model="model" :ref="ref" :form-items="formItems" label-width="auto">
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</base-form>

<script>
  const options = [
    { label: '选项一', value: 'select1' },
    { label: '选项二', value: 'select2' },
    { label: '选项三', value: 'select3', disabled: true },
    { label: '选项四', value: 'select4' }
  ]
  const selectTreeOptions = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        { id: 5, label: '二级 2-1' },
        { id: 6, label: '二级 2-2' }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        { id: 7, label: '二级 3-1' },
        { id: 8, label: '二级 3-2' }
      ]
    }
  ]
  export default {
    data() {
      return {
        model: {
          text: '',
          textarea: '',
          integer: '',
          decimal: '',
          select: '',
          selectTree: '',
          info: '只展示, 不可编辑',
          datePicker: '',
          switch: '',
          checkbox: [],
          radio: ''
        },
        ref: 'form',
        formItems: [
          { label: '单行文本', prop: 'text', type: 'text', component: 'el-input' },
          {
            label: '前置',
            prop: 'prepend',
            type: 'text',
            component: 'el-input',
            slots: { prepend: 'http://' }
          },
          {
            label: '后置',
            prop: 'append',
            type: 'text',
            component: 'el-input',
            slots: { append: '.com' }
          },
          { label: '文本域', prop: 'textarea', type: 'textarea', component: 'el-input' },
          { label: '整数', prop: 'integer', type: 'integer', component: 'number-input' },
          { label: '小数', prop: 'decimal', type: 'decimal', component: 'number-input' },
          {
            label: '选择器',
            prop: 'select',
            type: 'select',
            component: 'el-select',
            options
          },
          {
            label: '树形选择器',
            prop: 'selectTree',
            type: 'select',
            component: 'select-tree',
            treeProps: {
              data: selectTreeOptions
            },
            rules: [{ required: true, message: '请选择kk树形选择器', trigger: ['blur', 'change'] }]
          },
          { label: '不可编辑', prop: 'info', type: 'info', component: 'span', noRequired: true },
          { label: '日期选择器', prop: 'datePicker', type: 'date', component: 'el-date-picker' },
          { label: '开关', prop: 'switch', type: 'switch', component: 'el-switch' },
          {
            label: '多选框',
            prop: 'checkbox',
            type: 'checkbox',
            component: 'el-checkbox-group',
            options
          },
          {
            label: '单选框',
            prop: 'radio',
            type: 'radio',
            component: 'el-radio-group',
            options
          }
        ]
      }
    },
    methods: {
      submitForm() {
        this.$refs[this.ref].validate(valid => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm() {
        this.$refs[this.ref].resetFields()
      }
    }
  }
</script>
```

:::

## Attributes

| 参数                    | 说明                                                                                      | 类型    | 可选值                | 默认值                             |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------- | --------------------- | ---------------------------------- |
| model                   | 表单数据对象                                                                              | object  | —                     | —                                  |
| form-items              | Form-Item Attributes 集合, 具体看下表                                                     | array   | —                     | —                                  |
| props                   | 统一配置 `form-items` 的 `prop` 及 `label`                                                | object  | —                     | `{ prop: 'prop', label: 'label' }` |
| rules                   | 表单验证规则                                                                              | object  | —                     | —                                  |
| inline                  | 行内表单模式                                                                              | boolean | —                     | false                              |
| label-position          | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width`                   | string  | right/left/top        | right                              |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string  | —                     | —                                  |
| label-suffix            | 表单域标签的后缀                                                                          | string  | —                     | —                                  |
| hide-required-asterisk  | 是否显示必填字段的标签旁边的红色星号                                                      | boolean | —                     | false                              |
| show-message            | 是否显示校验错误信息                                                                      | boolean | —                     | true                               |
| inline-message          | 是否以行内形式展示校验信息                                                                | boolean | —                     | false                              |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                        | boolean | —                     | false                              |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证                                                 | boolean | —                     | true                               |
| size                    | 用于控制该表单内组件的尺寸                                                                | string  | medium / small / mini | —                                  |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效         | boolean | —                     | false                              |

### form-items 每项

| 参数                                                             | 说明                                                                         | 类型    | 可选值                            | 默认值 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------- | --------------------------------- | ------ |
| [EditableElements - item](/ElementUI/EditableElements.html#item) | 与 EditableElements 一样                                                     | —       | —                                 | —      |
| noRequired                                                       | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean | —                                 | false  |
| prop                                                             | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string  | 传入 Form 组件的 `model` 中的字段 | —      |
| label                                                            | 标签文本                                                                     | string  | —                                 | —      |
| label-width                                                      | 表单域标签的的宽度，例如 '50px'。支持 `auto`。                               | string  | —                                 | —      |
| rules                                                            | 表单验证规则                                                                 | object  | —                                 | —      |
| error                                                            | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息    | string  | —                                 | —      |
| show-message                                                     | 是否显示校验错误信息                                                         | boolean | —                                 | true   |
| inline-message                                                   | 以行内形式展示校验信息                                                       | boolean | —                                 | false  |
| size                                                             | 用于控制该表单域下组件的尺寸                                                 | string  | medium / small / mini             | -      |

## Methods

| 方法名        | 说明                                                                                                                                                                 | 参数                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                              |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array \| string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | —                                                                          |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array \| string)                                           |

## Events

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |
