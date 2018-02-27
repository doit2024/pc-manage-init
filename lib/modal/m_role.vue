<template>
  <Form ref="form" :rules="$v.firmare" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="name" label="角色名称">
      <Input v-model="formData.name" :maxlength="$ml.name" placeholder="请输入角色名称"></Input>
    </FormItem>
    <FormItem prop="desc" label="角色说明">
      <DtTextarea v-model="formData.desc" placeholder="请输入角色说明"/>
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
    formData: {
      name: '',
      desc: ''
    }
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
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.firmware.put(this.formData).then(data => {
          this.$Message.success('保存成功')
          this.close()
          bus.$emit('update', { is_reset_page: !this.detail })
        })
      })
    }
  }
}
</script>
