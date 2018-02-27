<template>
  <div class="login">
    <div class="login_box">
      <div class="login_title">
        XXXX后台管理系统
      </div>
      <div class="login_detail mt-30">
        <Form ref="form" :rules="$v.login" :model="formData" label-position="top">
          <FormItem prop="username">
            <Input v-model.trim="formData.username" :maxlength="$ml.username" @keyup.enter.native="submit" placeholder="请输入账号">
              <Icon type="person" slot="prepend" class="login_icon"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model.trim="formData.password" :maxlength="$ml.password" @keyup.enter.native="submit" placeholder="请输入密码">
              <Icon type="locked" slot="prepend" class="login_icon"></Icon>
            </Input>
          </FormItem>
          <Checkbox v-model="remember">记住密码</Checkbox>
          <FormItem class="mt-10">
            <Button v-if="!formData.username||!formData.password" class="login_btn" type="primary" style="opacity: .6">
              <span>登录</span>
            </Button>
            <Button v-else class="login_btn" type="primary" @click="submit" style="border: none">
              <DtLoading v-if="loging"/>
              <span v-else>登录</span>
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { ACCESS_TOKEN, USER_INFO, LOGIN_INFO } from '../../../../php/project'
import { aes } from '@/global/funs'
export default {
  data: () => ({
    loging: false,
    formData: {
      username: '',
      password: ''
    },
    remember: false
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let info = window.localStorage.getItem(USER_INFO)
      if (info) {
        this.remember = true
        this.formData = JSON.parse(aes.decrypt(info))
      }
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        // this.doLogin()
        this.$router.replace('./home')
      })
    },
    doLogin () {
      this.loging = true
      this.$http.account.login(this.formData).then(data => {
        window.localStorage.setItem(ACCESS_TOKEN, data['access_token'])
        window.localStorage.setItem(LOGIN_INFO, aes.encrypt(JSON.stringify({login_time: Date.now(), expire: data.expire})))
        this.$router.replace('./home')
        this.rememberOrNot()
      }).catch(e => {
        this.loging = false
        this.$Message.error(e.errmsg)
      })
    },
    rememberOrNot () {
      if (this.remember) {
        window.localStorage.setItem(USER_INFO, aes.encrypt(JSON.stringify(this.formData)))
      } else {
        window.localStorage.removeItem(USER_INFO)
      }
    }
  }
}
</script>

<style lang=less>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 600px;
  &_box {
    width: 400px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    padding: 40px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(66, 185, 131, .4);
    transform: translate(0, -50px)
  }
  &_icon {
    color: #888;
    font-size: 18px;
    padding-left: 2px;
    padding-right: 1px;
  }
  &_title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  &_btn {
    width: 100%;
    height: 40px;
  }
}

</style>
