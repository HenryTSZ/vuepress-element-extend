# TextEllipsis 文本溢出省略号

基于 `el-tooltip` 封装的文本溢出效果

1. 当文本内容未溢出, 不做任何处理

2. 当文本内容溢出, 显示省略号, 并悬浮弹出 `tooltip`

封装思路: [基于 ElementUI 封装的 TextEllipsis | Henry](https://tsz.now.sh/2020/09/03/based-on-element-ui-encapsulation-text-ellipsis/)

[源码](https://github.com/HenryTSZ/vuepress-element-extend/blob/master/docs/.vuepress/components/TextEllipsis.vue)

## 基础用法

:::demo 传入 `content` 即可, 仅支持简单的文本

```html
<template>
  <text-ellipsis v-for="text in texts" :key="text" :content="text"></text-ellipsis>
</template>

<script>
  export default {
    data() {
      return {
        texts: [
          `孔乙己一到店，所有喝酒的人便都看着他笑，有的叫道，“孔乙己，你脸上又添上新伤疤了！”
          他不回答，对柜里说，“温两碗酒，要一碟茴香豆。”
          便排出九文大钱。他们又故意的高声嚷道，“你一定又偷了人家的东西了！”
          孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”
          “什么清白？我前天亲眼见你偷了何家的书，吊着打。”
          孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，
          “窃书不能算偷……窃书！……读书人的事，能算偷么？”
          接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，
          引得众人都哄笑起来：店内外充满了快活的空气。`,
          '希望本无所谓有，也无所谓无，这就像地上的路，其实地上本没有路，走的人多了，也便成了路。',
          '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。'
        ]
      }
    }
  }
</script>

<style scope>
  .text-ellipsis {
    margin-bottom: 20px;
  }
</style>
```

:::

## 高级扩展

:::demo 支持 [ElementUI-Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 属性

```html
<template>
  <text-ellipsis
    v-for="text in texts"
    :key="text"
    :content="text"
    effect="light"
    :open-delay="500"
  ></text-ellipsis>
</template>

<script>
  export default {
    data() {
      return {
        texts: [
          `孔乙己一到店，所有喝酒的人便都看着他笑，有的叫道，“孔乙己，你脸上又添上新伤疤了！”
          他不回答，对柜里说，“温两碗酒，要一碟茴香豆。”
          便排出九文大钱。他们又故意的高声嚷道，“你一定又偷了人家的东西了！”
          孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”
          “什么清白？我前天亲眼见你偷了何家的书，吊着打。”
          孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，
          “窃书不能算偷……窃书！……读书人的事，能算偷么？”
          接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，
          引得众人都哄笑起来：店内外充满了快活的空气。`,
          '希望本无所谓有，也无所谓无，这就像地上的路，其实地上本没有路，走的人多了，也便成了路。',
          '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。'
        ]
      }
    }
  }
</script>

<style scope>
  .text-ellipsis {
    margin-bottom: 20px;
  }
</style>
```

:::

## Attributes

| 参数            | 说明                                                                                                    | 类型    | 可选值                                                                                                    | 默认值                                                |
| --------------- | ------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| content         | 显示的内容, 仅支持简单的文本                                                                            | string  | —                                                                                                         | —                                                     |
| effect          | 默认提供的主题                                                                                          | string  | dark/light                                                                                                | dark                                                  |
| placement       | Tooltip 的出现位置                                                                                      | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                |
| value / v-model | 状态是否可见                                                                                            | boolean | —                                                                                                         | false                                                 |
| offset          | 出现位置的偏移量                                                                                        | number  | —                                                                                                         | 0                                                     |
| transition      | 定义渐变动画                                                                                            | string  | —                                                                                                         | el-fade-in-linear                                     |
| visible-arrow   | 是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)        | boolean | —                                                                                                         | true                                                  |
| popper-options  | [popper.js](https://popper.js.org/documentation.html) 的参数                                            | object  | 参考 [popper.js](https://popper.js.org/documentation.html) 文档                                           | { boundariesElement: 'body', gpuAcceleration: false } |
| open-delay      | 延迟出现，单位毫秒                                                                                      | number  | —                                                                                                         | 0                                                     |
| manual          | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效                                   | boolean | —                                                                                                         | false                                                 |
| popper-class    | 为 Tooltip 的 popper 添加类名                                                                           | string  | —                                                                                                         | —                                                     |
| enterable       | 鼠标是否可进入到 tooltip 中                                                                             | boolean | —                                                                                                         | true                                                  |
| hide-after      | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏                                               | number  | —                                                                                                         | 0                                                     |
| tabindex        | Tooltip 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number  | —                                                                                                         | 0                                                     |
