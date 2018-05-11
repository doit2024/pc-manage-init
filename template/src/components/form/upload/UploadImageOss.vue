<template>
  <div>
    <div class="demo-upload-list" v-for="(item, i) in uploadList" :key="i">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(i)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <upload-oss @onfilechange="handleFileChange"></upload-oss>
    <Modal title="View Image" v-model="visible">
      <img :src="imgPath" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import UploadOss from './UploadOss'
export default {
  props: {
    value: {
      type: Array | String,
      required: true
    }
  },
  data () {
    return {
      imgPath: '',
      visible: false
    }
  },
  computed: {
    multiple () {
      return this.value instanceof Array
    },
    uploadList () {
      if (this.multiple) {
        return this.value.map(path => ({
          'url': path,
          'status': 'finished'
        }))
      } else {
        return this.value ? [{
          'url': this.value,
          'status': 'finished'
        }] : []
      }
    }
  },
  methods: {
    handleView (path) {
      this.imgPath = path
      this.visible = true
    },
    handleRemove (i) {
      if (this.multiple) {
        this.value.splice(i, 1)
      } else {
        this.$emit('input', '')
      }
    },
    handleFileChange (path) {
      if (this.multiple) {
        this.value.push(path)
      } else {
        this.$emit('input', path)
      }
    }
  },
  components: {
    UploadOss
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
