<template>
  <div>
    <Form ref="form" :rules="rules" :model="formData" label-position="left" :label-width="80">
      <FormItem prop="username" label="账号名">
        <Input v-model.trim="formData.username" :maxlength="$ml.username" placeholder="请输入用户姓名"></Input>
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
      <FormItem label="密码">
        <span class="value mr-30">************</span>
        <Button type="ghost" size="small" @click="isUpdatePassword=!isUpdatePassword">
          <a>{{ isUpdatePassword ? '继续使用原密码' : '修改密码' }}</a>
        </Button>
      </FormItem>
    </Form>
    <Form v-if="isUpdatePassword" ref="formPassword" :rules="rulesPassword" :model="password" label-position="left" :label-width="80">
      <FormItem prop="pwd">
        <Input v-model="password.pwd" :maxlength="$ml.password" placeholder="输入密码"></Input>
      </FormItem>
      <FormItem prop="repwd">
        <Input v-model="password.repwd" :maxlength="$ml.password" placeholder="确认密码"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import bus from '@/bus'
export default {
  props: ['modal'],
  data: () => ({
    isUpdatePassword: false,
    formData: {
      username: '',
      fullname: '',
      image: '',
      role_id: '2',
      privileges_id: []
    },
    password: {
      pwd: '',
      repwd: ''
    }
  }),
  computed: {
    detail () {
      return this.modal.detail
    },
    rules () {
      return {
        username: this.$v.aRequireText,
        fullname: this.$v.aRequireText,
        privileges_id: this.$v.aCheckbox
      }
    },
    rulesPassword () {
      const p = this.$v.aPassword
      return {
        pwd: p,
        repwd: p
      }
    }
  },
  mounted () {
    let pi = this.detail.privileges_id
    let image = this.detail.image
    this.formData = {
      ...this.detail,
      privileges_id: pi ? pi.split(',') : [],
      image: /\w+\/$/.test(image) ? '' : image
    }
  },
  methods: {
    submit () {
      const data = {...this.formData, privileges_id: this.formData.privileges_id.join(',')}
      this.isUpdatePassword
        ? this.handlePasswordChange({...data, ...this.password})
        : this.handlePasswordNotChange(data)
    },
    handlePasswordNotChange (data) {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.member.edit(data).then(data => {
          this.$Message.success('保存成功')
          bus.$emit('update')
          this.close()
        })
      })
    },
    handlePasswordChange (data) {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$refs['formPassword'].validate(valid => {
          if (!valid) return
          this.$http.member.edit(data).then(data => {
            this.$Message.success('保存成功！')
            bus.$emit('update')
            this.close()
          })
        })
      })
    }
  }
}
</script>
