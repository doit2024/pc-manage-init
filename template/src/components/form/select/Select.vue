<template>
  <Select class="dt-select" :value="value" v-bind="$attrs" v-on="$listeners">
    <Option v-for="(item, i) in opts" :value="item.value" :key="i">
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
import * as opts from './data'
export default {
  props: {
    name: String,
    value: String
  },
  computed: {
    opts () {
      return opts[this.name]
    }
  }
}
</script>

<style>
.dt-select {
  width: 150px;
}
</style>
