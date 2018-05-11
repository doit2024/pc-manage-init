<template>
  <Form ref="form" :rules="rules" :model="formData" label-position="left" :label-width="80">
    <FormItem prop="username" label="账号名">
      <Input v-model.trim="formData.username" :maxlength="$ml.username" :disabled="!!detail" placeholder="请输入账户名称（手机号）"></Input>
    </FormItem>
    <FormItem prop="fullname" label="姓名">
      <Input v-model.trim="formData.fullname" :maxlength="$ml.username" placeholder="请输入用户姓名"></Input>
    </FormItem>
    <FormItem label="头像">
      <DtUploadImage v-model="formData.image"/>
    </FormItem>
    <FormItem label="角色">
      <DtSelect name="roleType" :from="1" v-model="formData.role_id"/>
    </FormItem>
    <FormItem prop="privileges_id" label="权限">
      <DtCheckboxPrivilege v-model="formData.privileges_id"/>
    </FormItem>
    <FormItem prop="pwd" label="输入密码">
      <Input v-model="formData.pwd" :maxlength="$ml.password" placeholder="输入密码"></Input>
    </FormItem>
    <FormItem prop="repwd" label="确认密码">
      <Input v-model="formData.repwd" :maxlength="$ml.password" placeholder="确认密码"></Input>
    </FormItem>
  </Form>
</template>

<script>
import bus from '@/bus'
export default {
  data: () => ({
    formData: {
      username: '',
      fullname: '',
      image: '',
      role_id: '2',
      privileges_id: [],
      pwd: '',
      repwd: ''
    }
  }),
  computed: {
    detail () {
      return this.modal.detail
    },
    rules () {
      const p = this.$v.aPassword
      return {
        username: this.$v.aUsername,
        fullname: this.$v.aRequireText,
        privileges_id: this.$v.aCheckbox,
        pwd: p,
        repwd: p
      }
    }
  },
  methods: {
    submit () {
      const data = {...this.formData, privileges_id: this.formData.privileges_id.join(',')}
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.member.add(data).then(data => {
          this.$Message.success('保存成功')
          bus.$emit('update', { is_reset_page: true })
          this.close()
        })
      })
    }
  }
}
</script>
