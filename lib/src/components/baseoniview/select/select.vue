<template>
  <Select v-model="selected" :placeholder="placeholder">
    <Option
      v-for="(x, i) in options"
      :key="i"
      :value="`${i+from}`"
    >{{x}}</Option>
  </Select>
</template>

<script>
import { OPTIONS } from '@/global'
export default {
  props: {
    value: String,
    from: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      validator: v => OPTIONS[v]
    },
    plus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', this.plus ? (parseInt(v) + 1) : v)
      }
    },
    options () {
      return OPTIONS[this.name]
    }
  }
}
</script>
