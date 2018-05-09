<template>
  <Form label-position="left" :label-width="120">
    <FormItem label="导入方式">
      <RadioGroup v-model="type" type="button">
        <Radio label="0">上传Excel</Radio>
        <Radio label="1">输入数据</Radio>
      </RadioGroup>
      <Button v-show="type==='0'" class="ml-30" type="warning" @click="download">下载模板</Button>
    </FormItem>
    <div v-if="type==='0'">
      <FormItem label="上传excel">
        <DtUploadFile format="excel" @fileChange="handleFileChange"/>
      </FormItem>
    </div>
    <div v-else-if="type==='1'">
      <FormItem label="序列号">
        <Input v-model="formData.sn" placeholder="请输入所属机柜"/>
      </FormItem>
      <FormItem label="设备型号">
        <Input v-model="formData.model" placeholder="请输入设备型号"/>
      </FormItem>
    </div>
  </Form>
</template>

<script>
import bus from '@/bus'
export default {
  data: () => ({
    type: '0',
    formData: {
      sn: '',
      model: ''
    }
  }),
  methods: {
    download () {
      window.location.href = '/device/download_file'
    },
    handleFileChange (file) {
      this.formData.file = file
    },
    submit () {
      if (this.type === '0') {
        this.$http.device.import(this.formData).then(res => {
          this.$Message.success('导入成功!')
          this.close()
          bus.$emit('update', {is_reset_page: true})
        })
      }
      if (this.type === '1') {
        this.$http.device.add(this.formData).then(res => {
          this.$Message.success('保存成功')
          this.close()
          bus.$emit('update', { is_reset_page: true })
        })
      }
    }
  }
}
</script>
