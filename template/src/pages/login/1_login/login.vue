<template>
<div class="login-form">
  <div class="header">
    <h3 class="title">开发与运营平台</h3>
    <p class="subtitle">副标题副标题副标题副标题副标题副标题</p>
  </div>
  <Form class="form" ref="form" :model="formData" :rules="formRules" key="login">
    <FormItem prop="mobile" class="form_item">
      <Input ref="logMobile" v-model="formData.username" :maxlength="$ml.mobile" placeholder="请输入手机号">
        <Icon slot="prepend" type="person"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password" class="form_item">
      <Input ref="logPass" type="password" v-model="formData.password" :maxlength="$ml.password" placeholder="请输入密码" @on-enter="submit">
        <Icon slot="prepend" type="locked"></Icon>
      </Input>
    </FormItem>
    <div class="flex-sb">
      <Checkbox v-model="auto">记住密码</Checkbox>
      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
    </div>
    <div class="mt-20">
      <Button type="primary" long @click="submit">提交</Button>
    </div>
    <div class="flex-sb mt-10">
      <div class="other">其他登录方式
        <Icon type="ionic"></Icon>
        <Icon type="outlet"></Icon>
        <Icon type="happy"></Icon>
      </div>
      <router-link style="float:right" :to="{name: 'signup'}">注册账户</router-link>
    </div>
  </Form>
</div>
</template>

<script>
import * as v from '@/global/validate'
import { accessToken, loginUser } from '@/global/storage'
export default {
  data: () => ({
    auto: false,
    loading: false,
    formData: {
      username: '',
      password: ''
    }
  }),
  computed: {
    formRules: () => ({
      username: v.mobile,
      password: v.password
    })
  },
  mounted () {
    let info = loginUser.get()
    if (info) {
      this.auto = true
      this.formData = info
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.loading = true
        this.$http.account.login(this.formData).then(data => {
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

<style lang=less>
.login-form {
  padding: 112px 0 24px;
  flex: 1 1 0%;
  .header {
    text-align: center;
    margin-bottom: 40px;
  }
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 28px;
    position: relative;
    top: 2px;
  }
  .subtitle {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
  }
  .form {
    width: 280px;
    margin: 0 auto;
  }
  .other {
    font-size: 14px;
    .ivu-icon {
      margin: 3px;
    }
  }
}
</style>
