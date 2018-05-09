<template>
  <div>
    <Form ref="form" :rules="rules" :model="formData" label-position="left" :label-width="80">
      <FormItem label="账号名">
        <span>{{formData.username}}</span>
      </FormItem>
      <FormItem prop="fullname" label="姓名">
        <Input v-model.trim="formData.fullname" :maxlength="$ml.name" placeholder="请输入用户姓名"></Input>
      </FormItem>
      <FormItem label="头像">
        <DtUploadImage v-model="formData.image"/>
      </FormItem>
      <FormItem label="密码">
        <span class="value mr-30">************</span>
        <Button type="ghost" size="small" @click="isUpdatePassword=!isUpdatePassword">
          <a>{{ isUpdatePassword ? '继续使用原密码' : '修改密码' }}</a>
        </Button>
      </FormItem>
    </Form>
    <Form v-if="isUpdatePassword" ref="formPassword" :rules="rulesPassword" :model="password" label-position="left" :label-width="80">
      <FormItem prop="old_pwd">
        <Input v-model="password.old_pwd" :maxlength="$ml.password" placeholder="请输入原密码"></Input>
      </FormItem>
      <FormItem prop="new_pwd">
        <Input v-model="password.new_pwd" :maxlength="$ml.password" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem prop="repwd">
        <Input v-model="password.repwd" :maxlength="$ml.password" placeholder="请再次输入新密码"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['modal'],
  data: () => ({
    isUpdatePassword: false,
    formData: {
      username: '',
      fullname: '',
      image: ''
    },
    password: {
      old_pwd: '',
      new_pwd: '',
      repwd: ''
    }
  }),
  computed: {
    ...mapGetters(['userinfo']),
    rules () {
      return {
        fullname: this.$v.aRequireText
      }
    },
    rulesPassword () {
      const p = this.$v.aPassword
      return {
        old_pwd: p,
        new_pwd: p,
        repwd: p
      }
    }
  },
  mounted () {
    this.formData = {...this.userinfo}
  },
  methods: {
    submit () {
      this.isUpdatePassword
        ? this.handlePasswordChange({...this.formData, ...this.password})
        : this.handlePasswordNotChange({...this.formData})
    },
    handlePasswordNotChange (data) {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$http.account.setting(data).then(data => {
          this.$Message.success('保存成功')
          this.$store.dispatch('update', {key: 'userinfo', value: this.formData})
          this.close()
        })
      })
    },
    handlePasswordChange (data) {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$refs['formPassword'].validate(valid => {
          if (!valid) return
          this.$http.account.setting(data).then(data => {
            this.$Message.success('保存成功, 密码已更改，请重新登录！')
            this.$router.push('/login')
            this.close()
          })
        })
      })
    }
  }
}
</script>
