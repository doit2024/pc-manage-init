<template>
  <Input
    class="dt-search"
    :value="value"
    icon="search" 
    v-bind="$attrs"
    @on-change="handleChange"
  />
</template>

<script>
import debounce from './debounce'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handleChange (e) {
      debounce(() => {
        this.$emit('input', e.target.value);
      }, 1000)
    }
  }
};
</script>

<style lang="less">
.dt-search {
  width: 180px;
  margin-right: 20px;
}
</style>
