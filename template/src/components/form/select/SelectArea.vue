<template>
  <Select :value="value" v-bind="$attrs" v-on="$listeners" :disabled="!rst.length" clearable>
    <Option
      v-for="(item, i) in opts"
      :value="item.value"
      :key="i"
    >{{ item.label }}</Option>
  </Select>
</template>

<script>
import area from './area'
export default {
  props: {
    name: String,
    value: String,
    type: {
      type: String,
      validator: v => ['province', 'city', 'district'].includes(v),
      default: 'province'
    },
    province: String,
    city: String
  },
  computed: {
    opts () {
      let rst = area
      if (['city', 'district'].includes(this.type)) {
        rst = this.province ? rst.filter(v => v.value === this.province)[0].children : []
      }
      if (this.type === 'district') {
        rst = this.city ? rst.filter(v => v.value === this.city)[0].children : []
      }
      return rst
    }
  }
}
</script>
