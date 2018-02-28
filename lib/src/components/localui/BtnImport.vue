<template>
  <Button type="primary" @click="goImport" icon="ios-plus-outline">
    <slot>导入</slot>
  </Button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    goImport () {
      this.$store.dispatch('modal', {
        show: this.name + '-new'
      })
    }
  }
}
</script>
