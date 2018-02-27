<template>
  <Upload
    type="drag"
    ref="upload"
    :format="innerFormat"
    :before-upload="onBeforeUpload"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :action="`${baseUrl}/upload/upload_file`">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #42B782"></Icon>
        <p>点击或拖拽到这里上传</p>
      </div>
  </Upload>
</template>

<script>
import { baseUrl } from '@/env'
const names = {
  'apk': /\.apk$/i,
  'bin': /\.bin$/i,
  's1': /\.s1$/i,
  'excel': /\.xlsx?$/i
}
export default {
  props: ['format'],
  computed: {
    baseUrl: () => baseUrl,
    innerFormat () {
      let fm = this.format
      return fm === 'excel' ? ['xls', 'xlsx', 'xlt', 'xlsm'] : [fm]
    }
  },
  methods: {
    onBeforeUpload (f) {
      if (!names[this.format].test(f.name)) {
        this.$Message.error(`文件类型错误，请上传${this.format}文件`)
      } else {
        this.$emit('fileChange', '')
        this.$refs.upload.clearFiles()
      }
    },
    onSuccess (res, f) {
      if (res.errcode !== 0) {
        this.$Message.error(`上传失败，文件类型检查未通过`)
        this.$refs.upload.clearFiles()
        return
      }
      this.$emit('fileChange', res.filename)
    },
    onRemove () {
      this.$emit('fileChange', '')
    }
  }
}
</script>
