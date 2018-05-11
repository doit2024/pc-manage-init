<template>
  <Form ref="form" :model="formData" :rules="formRules" key="login">
    <FormItem prop="mobile" class="form_item">
      <Input ref="logMobile" v-model="formData.mobile" :maxlength="$ml.mobile" placeholder="请输入手机号">
        <i slot="prepend" class="iconfont icon-mobile"></i>
      </Input>
    </FormItem>
    <FormItem prop="password" class="form_item">
      <Input ref="logPass" type="password" v-model="formData.password" :maxlength="$ml.password" placeholder="请输入密码" @on-enter="submit">
        <i slot="prepend" class="iconfont icon-password"></i>
      </Input>
    </FormItem>
    <div class="auto">
      <Checkbox v-model="auto">记住密码</Checkbox>
      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
    </div>
    <a v-if="loading" class="btn btn_primary mt-20" style="position:relative">
      <dt-loading></dt-loading>
    </a>
    <a v-else class="btn btn_primary mt-20" @click="submit">登录</a>
  </Form>
</template>

<script>
import * as v from '@/global/validate'
import { accessToken, loginUser } from '@/global/storage'
export default {
  data: () => ({
    auto: false,
    loading: false,
    formData: {
      mobile: '',
      password: ''
    }
  }),
  computed: {
    formRules: () => ({
      mobile: v.mobile,
      password: v.password
    })
  },
  mounted () {
    let username = this.$route.query.id
    username && (this.formData.mobile = username)
    let info = loginUser.get()
    if (info) {
      this.auto = true
      this.formData = info
    }
  },
  methods: {
    submit (name) {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.loading = true
        this.$http.account.login(this.formData.mobile, this.formData.password).then(data => {
          this.$Message.success('登陆成功！')
          accessToken.set(data['access_token'])
          this.$router.replace('/home')
          this.auto ? loginUser.set(this.formData) : loginUser.cls()
        }).catch(e => {
          setTimeout(() => { this.loading = false }, 300)
          this.$Message.error(e.errmsg)
        })
      })
    }
  }
}
</script>
