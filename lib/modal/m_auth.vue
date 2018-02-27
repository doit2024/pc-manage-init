<template>
  <Form ref="form" :rules="$v.firmare" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="name" label="权限名称">
      <Input v-model="formData.name" :maxlength="$ml.default" :placeholder="`请输入权限名称（${$ml.default}字以内）`"></Input>
    </FormItem>
    <FormItem prop="desc" label="权限说明">
      <DtTextarea v-model="formData.desc" placeholder="请输入权限说明"/>
    </FormItem>
    <FormItem prop="auth" label="权限选择">
      <CheckboxGroup v-model="formData.auth">
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
     </CheckboxGroup>
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
      desc: '',
      auth: []
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
          bus.$emit('update', { is_reset_page: !this.detail })
          this.close()
        })
      })
    }
  }
}
</script>
