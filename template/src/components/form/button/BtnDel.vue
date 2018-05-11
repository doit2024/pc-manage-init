<template>
  <Button
    class="dt-btn"
    type="warning"
    @click="handleDel"
    :disabled="!ids"
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
    },
    ids: {
      type: String
    }
  },
  methods: {
    handleDel () {
      this.$Modal.confirm({
        content: '确定？',
        onOk: async e => {
          const res = await this.$http[this.api].del()
          res && alert('done!')
        }
      })
    }
  }
}
</script>
