<template>
  <Select v-model="province" placeholder="选择省份" clearable>
    <Option
      v-for="(x, i) in data"
      :key="i"
      :value="x.value"
    >{{x.label}}</Option>
  </Select>
</template>

<script>
import level3 from './level3'
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    data: () => level3,
    province: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
