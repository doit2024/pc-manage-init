<template>
  <label class="upload-btn">
    <slot><Icon type="ios-camera" class="icon"></Icon></slot>
    <input type="file" hidden accept="image/*" @change="onFileChange"/>
  </label>
</template>

<script>
import { aes } from '@/global/funs'
import CONFIG from '@/config'
const { OSS_URL } = CONFIG
export default {
  data: () => ({
    ossParams: {
      host: ''
    }
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http.getUploadParams({type: 1}).then(data => {
        this.ossParams = JSON.parse(aes.decrypt(data))
      })
    },
    onFileChange (e) {
      let ossData = new FormData()
      ossData.append('OSSAccessKeyId', this.ossParams.accessid)
      ossData.append('policy', this.ossParams.policy)
      ossData.append('Signature', this.ossParams.signature)
      ossData.append('key', this.ossParams.dir + `\${filename}`)
      ossData.append('callback', this.ossParams.callback)
      ossData.append('success_action_status', 200)
      ossData.append('file', e.target.files[0])
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let obj = JSON.parse(xhr.response)
            try {
              this.$emit('onfilechange', obj.data.path)
            } catch (e) {
              console.log(e)
              this.$Message.error('上传失败，请重新上传！')
            }
          }
        }
      }
      xhr.open('POST', OSS_URL || this.ossParams.host, true)
      xhr.send(ossData)
    }
  }
}
</script>

<style lang=less>
@import '../../../style/var';
.upload-btn {
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 1px dashed #ccc;
  border-radius: 6px;
  transition: all .3s;
  &.ivu-btn {
    padding: 0;
  }
  &:hover {
    color: @color-theme;
    border-color: @color-theme;
    .icon{
      color: @color-theme;
    }
  }
  .icon {
    font-size: 25px;
    color: #888;
    transition: color .3s;
  }
}
</style>
