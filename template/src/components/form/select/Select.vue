<template>
  <Select class="dt-select" :value="value" v-bind="$attrs" v-on="$listeners">
    <Option v-for="(item, i) in opts" :value="item.value" :key="i">
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
import { OPTIONS } from '@/global/cons'
export default {
  props: {
    name: String,
    value: String
  },
  computed: {
    opts () {
      return OPTIONS[this.name]
    }
  }
}
</script>

<style>
.dt-select {
  width: 150px;
}
</style>
