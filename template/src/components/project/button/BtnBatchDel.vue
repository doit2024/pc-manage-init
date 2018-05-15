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
        title: '操作确认',
        content: '确定批量删除本页选中项？',
        onOk: async e => {
          const res = await this.$http[this.api].del({ids: this.ids})
          res && alert('done!')
        }
      })
    }
  }
}
</script>
