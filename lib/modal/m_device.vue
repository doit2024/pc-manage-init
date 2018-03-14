<template>
  <Form ref="form" :rules="rules" :model="formData" label-position="left" :label-width="120">
    <div class="ivu-form-item f-info f-14">
      <Icon type="android-alert" class="f-18 mr-6"></Icon>
      设备序列号长度必须为6-32位数字或字母, 多个序列号之间换行隔开， 不允许有空格！
    </div>
    <FormItem prop="data" label="序列号">
      <Input
        type="textarea"
        v-model="formData.data"
        :autosize="{minRows: 10,maxRows: 20}"
        placeholder="多序列号之间换行隔开"
      ></Input>
    </FormItem>
  </Form>
</template>

<script>
import bus from '@/bus'
export default {
  data: () => ({
    type: '0',
    formData: {
      data: ''
    }
  }),
  computed: {
    rules () {
      return {
        data: this.$v.aSn
      }
    }
  },
  methods: {
    submit () {
      const data = { data: this.formData.data.split('\n').filter(item => item).join(',') }
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.device.import(data).then(res => {
          this.$Message.success('导入成功!')
          this.close()
          bus.$emit('update', {is_reset_page: true})
        })
      })
    }
  }
}
</script>
