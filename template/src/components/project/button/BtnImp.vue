<template>
  <Button
    class="dt-btn"
    type="info"
    @click="openImport"
  >
    <slot/>
  </Button>
</template>

<script>
export default {
  props: {
    api: {
      type: String,
      required: true
    }
  },
  methods: {
    openImport () {
      this.$store.dispatch('modal', {show: `m_${this.api}_new`})
    }
  }
}
</script>
