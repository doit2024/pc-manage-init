<template>
  <Select v-model="city" :placeholder="`${!options.length?'请先选择省份':'选择城市'}`" :disabled="!options.length" clearable>
    <Option
      v-for="(x, i) in options"
      :key="i"
      :value="x.value"
    >{{x.label}}</Option>
  </Select>
</template>

<script>
import level3 from './level3'
export default {
  props: {
    province: {
      type: String
    },
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => ({
    options: []
  }),
  computed: {
    city: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    province (c) {
      if (c) {
        this.init(c)
      } else {
        this.options = []
        this.city = ''
      }
    }
  },
  mounted () {
    if (this.province) {
      this.init(this.province)
    }
  },
  methods: {
    init (province) {
      this.options = level3.filter(v => v.value === province)[0].children
    }
  }
}
</script>

<style>

</style>
