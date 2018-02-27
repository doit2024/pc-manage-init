<template>
  <Form ref="form" :rules="$v.firmare" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="name" label="账户名称">
      <Input v-model="formData.name" :maxlength="$ml.username" :placeholder="`请输入账户名称（${$ml.username}字以内）`"></Input>
    </FormItem>
    <FormItem prop="password" label="账户密码">
      <Input v-model="formData.password" :maxlength="$ml.password" placeholder="请输入密码"></Input>
    </FormItem>
    <FormItem prop="repassword" label="密码确认">
      <Input v-model="formData.repassword" :maxlength="$ml.password" placeholder="请再次输入密码"></Input>
    </FormItem>
    <FormItem prop="role" label="选择角色">
      <Select v-model="formData.role">
        <Option value="1">角色1</Option>
        <Option value="2">角色2</Option>
      </Select>
    </FormItem>
    <FormItem prop="auth" label="选择权限">
      <Select v-model="formData.auth">
        <Option value="1">权限1</Option>
        <Option value="2">权限2</Option>
      </Select>
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
      password: '',
      repassword: '',
      role: '1',
      auth: '1'
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
