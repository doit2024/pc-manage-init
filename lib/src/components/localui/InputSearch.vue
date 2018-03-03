<template>
  <div>
    <Input v-model="content" :placeholder="placeholder">
      <Icon slot="prepend" type="ios-search-strong"></Icon>
    </Input>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  data: () => ({
    content: ''
  }),
  watch: {
    content (c) {
      setTimeout(() => this.$emit('input', c), 500)
    }
  }
}
</script>
