<template>
  <DatePicker
    :value="value"
    format="yyyy/MM/dd"
    :type="type"
    :placement="placement"
    :placeholder="`请选择时间${type==='daterange'?'范围':''}`"
    @on-change="handleChange"
    style="width: 200px"
  />
</template>

<script>
export default {
  props: {
    value: Array | String,
    placement: {
      type: String,
      default: 'bottom-end'
    },
    type: {
      type: String,
      default: 'daterange'
    }
  },
  methods: {
    handleChange (c) {
      this.$emit('input', c)
    }
  }
}
</script>
