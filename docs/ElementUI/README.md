# 快速上手

在 `md` 文件中编写以下代码(已经全局注册了 `ElementUI` 组件):

::: warning 注意

为了展示如何编写示例, 用于标记代码部分结束的三点增加了空格分隔，使用时需要将空格去除。

:::

````html
::: demo 此处放置代码示例的描述信息, 支持 `Markdown` 语法, **描述信息只支持单行**

```html
<template>
  <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
` ` ` <= 使用时删除左侧空格

:::
````

运行效果如下:

::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**

```html
<template>
  <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```

:::
