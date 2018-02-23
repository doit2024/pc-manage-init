<template>
  <Button type="primary" @click="createNew" icon="ios-plus-outline">
    <slot>新建</slot>
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
    createNew () {
      this.$store.dispatch('modal', {
        show: this.name + '-new'
      })
    }
  }
}
</script>
