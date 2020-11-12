<template>
  <component
    :is="item.component"
    v-model="model[item.prop]"
    :key="item.prop"
    v-bind="item"
    v-focus="item.focus"
    :placeholder="item.placeholder || `${handlePlaceholder(item.type)}${item.label}`"
    v-on="{ ...$listeners, ...item.events }"
  >
    <text-ellipsis v-if="item.type === 'info'" :content="model[item.prop]"></text-ellipsis>
    <template v-if="item.type === 'select'">
      <el-option
        v-for="option in item.options || item.select"
        :key="option[listProps.value]"
        :value="option[listProps.value]"
        :label="option[listProps.label]"
        :disabled="option.disabled"
      ></el-option>
    </template>
    <!-- radio / checkbox 等 -->
    <template v-if="list.includes(item.type)">
      <component
        :is="`el-${item.type}`"
        v-for="ele in item.options || item[item.type]"
        :key="ele[listProps.value]"
        :label="ele[listProps.value]"
        :disabled="ele.disabled"
      >
        {{ ele[listProps.label] }}
      </component>
    </template>
    <slot v-for="(value, key) in item.slots" :name="key" :slot="key">{{ value }}</slot>
  </component>
</template>

<script>
import TextEllipsis from './TextEllipsis'
import { handlePlaceholder } from 'utils'

export default {
  name: 'EditableElements',
  inheritAttrs: false,
  component: { TextEllipsis },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: ['radio', 'checkbox']
    }
  },
  computed: {
    listProps() {
      const props = this.item.props || this.item[`${this.item.type}Props`]
      if (!props) return { label: 'label', value: 'value' }
      const { label = 'label', value = 'value', ...rest } = props
      return {
        label,
        value,
        ...rest
      }
    }
  },
  methods: {
    handlePlaceholder
  },
  directives: {
    focus: {
      // [vue v-focus v-show控制input的显示聚焦，第二次不生效问题_JavaScript_宣城-CSDN博客](https://blog.csdn.net/qq_37361812/article/details/93782340)
      // [页面一刷新让文本框自动获取焦点-- 和自定义v-focus指令 - 明月人倚楼 - 博客园](https://www.cnblogs.com/IwishIcould/p/12006378.html)
      update(el, { value, oldValue }) {
        if (value && value !== oldValue) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom && dom.focus()
        }
      },
      inserted(el, { value }) {
        if (value) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom && dom.focus()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.editable-elements {
  .el-select {
    width: 100%;
  }
}
</style>
