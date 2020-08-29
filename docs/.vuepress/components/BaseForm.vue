<!--
 * @Author: HenryTSZ
 * @Date: 2020-03-21 10:13:51
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-05-16 11:53:24
-->
<template>
  <el-form v-bind="$attrs" :model="model" ref="elForm" class="base-form">
    <slot name="prev"></slot>
    <el-form-item
      v-for="item in items"
      :key="item.prop"
      v-bind="item"
      :rules="[
        {
          required: !item.noRequired,
          message: item.ruleMessage || `${handlePlaceholder(item.type)}${item.label}`,
          trigger: item.type === 'select' ? 'change' : 'blur'
        },
        ...(rules[item.prop] || [])
      ]"
    >
      <editable-elements :model="model" :item="item" v-on="$listeners"></editable-elements>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import { handlePlaceholder } from 'utils'

export default {
  name: 'BaseForm',
  props: {
    keyProps: {
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
  computed: {
    items() {
      return this.keyProps
        ? this.formItems.map(item => ({
            ...item,
            prop: item[this.keyProps.prop || 'prop'],
            label: item[this.keyProps.label || 'label']
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
