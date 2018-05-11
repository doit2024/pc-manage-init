<template>
  <Button
    class="dt-btn"
    type="info"
    @click="ept"
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
    async ept () {
      const { link } = await this.$http[this.api].export()
      window.location.href = link
    }
  }
}
</script>
