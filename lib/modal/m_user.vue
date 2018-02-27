<template>
  <Form label-position="left" :label-width="100">
    <FormItem label="关联设备">
      <Input v-model="formData.sn" placeholder="请输入关联设备编号"/>
    </FormItem>
    <FormItem label="信用等级">
      <Input v-model="formData.level" placeholder="请输入信用等级"/>
    </FormItem>
    <FormItem label="信用积分">
      <Input v-model="formData.integral" placeholder="请输入信用积分"/>
    </FormItem>
    <FormItem label="积分">
      <Input v-model="formData.aaa" placeholder="请输入积分"/>
    </FormItem>
  </Form>
</template>

<script>
import bus from '@/bus'
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: ['modal'],
  data: () => ({
    formData: {}
  }),
  computed: {
    detail () {
      return this.modal.detail
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.detail) {
        this.formData = {...this.detail}
      }
    },
    submit () {
      this.$http.about.put(this.formData).then(res => {
        this.$Message.success('保存成功')
        this.close()
        bus.$emit('update', { is_reset_page: !this.detail })
      })
    }
  }
}
</script>
