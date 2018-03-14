<template>
  <Button
    type="error"
    style="width:100px"
    :disabled="!target"
    @click="del"
  >批量删除</Button>
</template>

<script>
import bus from '@/bus'
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    }
  },
  methods: {
    del () {
      this.$Modal.confirm({
        title: '操作确认',
        content: '确定进行删除操作？',
        onOk: () => {
          this.$http[this.api].del({id: this.target}).then(res => {
            this.$Message.success('删除成功')
            bus.$emit('update', {})
          }).catch(e => {
            console.log(e)
            this.$Message.error('网络错误， 请稍后再试！')
          })
        }
      })
    }
  }
}
</script>
