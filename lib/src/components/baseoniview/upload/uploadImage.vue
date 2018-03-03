<template>
  <div>
    <div class="demo-upload-list" v-for="(item, i) in uploadList" :key="i">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(i)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="`${baseUrl}upload/upload_img`"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
      <img style="width:490px" :src="viewImage">
    </Modal>
  </div>
</template>
<script>
import { baseUrl } from '@/env'
export default {
  props: {
    value: String | Array,
    maxLength: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      defaultList: [],
      viewImage: '',
      visible: false,
      uploadList: []
    }
  },
  computed: {
    isArray () {
      return Object.prototype.toString.call(this.value) === '[object Array]'
    },
    baseUrl: () => baseUrl
  },
  watch: {
    value () {
      this.handleValue()
    }
  },
  mounted () {
    this.handleValue()
  },
  methods: {
    handleValue () {
      const v = this.value
      if (this.isArray) {
        this.uploadList = v.map(url => ({status: 'finished', url}))
      } else {
        this.uploadList = v ? [{status: 'finished', url: v}] : []
      }
    },
    handleView (index) {
      this.viewImage = this.uploadList[index].url
      this.visible = true
    },
    handleRemove (index) {
      this.$refs.upload.fileList.splice(index, 1)
      this.uploadList.splice(index, 1)
      this.handleChange()
    },
    handleSuccess (res, file) {
      file.url = res.filename
      this.uploadList.push({status: 'finished', url: res.filename})
      this.handleChange()
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '错误提示',
        desc: '文件类型只允许 jpg 或者 png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '错误提示',
        desc: '文件大小不能超过2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.maxLength
      if (!check) {
        this.$Notice.warning({
          title: `只允许上传 ${this.maxLength} 张图。`
        })
      }
      return check
    },
    handleChange () {
      const files = this.uploadList.map(item => item.url)
      this.$emit('input', this.isArray ? files : files[0])
    }
  }
}
</script>
<style>
.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
