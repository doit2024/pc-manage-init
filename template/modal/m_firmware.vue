<template>
  <Form ref="form" :rules="$v.firmare" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="name" label="固件类型">
      <DtSelect name="firmwareType" :add="1" v-model="formData.type"/>
    </FormItem>
    <FormItem prop="name" label="固件名称">
      <Input v-model="formData.name" :maxlength="$ml.packageName" :placeholder="`请输入固件名称（${$ml.packageName}字以内）`"></Input>
    </FormItem>
    <FormItem prop="version" label="版本号">
      <Input v-model="formData.version" :maxlength="$ml.version" placeholder="请输入版本号（只允许输入整数）"></Input>
    </FormItem>
    <FormItem prop="path" label="固件包">
      <DtUploadFile format="s1" @fileChange="onFileChange"/>
    </FormItem>
  </Form>
</template>

<script>
import bus from '@/bus'
export default {
  props: ['modal'],
  data: () => ({
    formData: {
      type: '1',
      name: '',
      version: '',
      path: ''
    }
  }),
  // computed: {
  //   detail () {
  //     return this.modal.detail
  //   }
  // },
  // mounted () {
  //   this.init()
  // },
  methods: {
    // init () {
    //   if (this.detail) {
    //     this.formData = {...this.detail}
    //   }
    // },
    onFileChange (file) {
      this.formData.path = file
      this.$refs.form.validateField('path')
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.firmware.add(this.formData).then(data => {
          this.$Message.success('保存成功')
          this.close()
          bus.$emit('update', { is_reset_page: !this.detail })
        })
      })
    }
  }
}
</script>
