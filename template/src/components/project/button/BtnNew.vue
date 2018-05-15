<template>
  <Button
    class="dt-btn"
    type="primary"
    @click="openNew"
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
    openNew () {
      this.$store.dispatch('modal', {show: `m_${this.api}_new`})
    }
  }
}
</script>
