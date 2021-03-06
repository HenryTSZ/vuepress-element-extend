<template>
  <el-form v-bind="$attrs" :model="model" ref="elForm" class="base-form">
    <slot name="prev"></slot>
    <el-form-item
      v-for="item in items"
      :key="item.prop"
      v-bind="item"
      :rules="
        item.rules ||
          rules[item.prop] || [
            {
              required: !item.noRequired,
              message: item.ruleMessage || `${handlePlaceholder(item.type)}${item.label}`,
              trigger: selectMap.includes(item.type) ? 'change' : 'blur'
            }
          ]
      "
    >
      <editable-elements :model="model" :item="item" v-on="$listeners"></editable-elements>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import EditableElements from './EditableElements'
import { selectMap, handlePlaceholder } from 'utils'

export default {
  name: 'BaseForm',
  inheritAttrs: false,
  component: { EditableElements },
  props: {
    props: {
      type: Object,
      default() {
        return null
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    formItems: {
      type: Array,
      default() {
        return []
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return { selectMap }
  },
  computed: {
    items() {
      return this.props
        ? this.formItems.map(item => ({
            ...item,
            prop: item[this.props.prop || 'prop'],
            label: item[this.props.label || 'label']
          }))
        : this.formItems
    }
  },
  methods: {
    handlePlaceholder
  },
  mounted() {
    for (let key in this.$refs.elForm) {
      if (!(key in this) && typeof this.$refs.elForm[key] === 'function') {
        this[key] = this.$refs.elForm[key].bind(this.$refs.elForm)
      }
    }
  }
}
</script>

<style lang="less"></style>
