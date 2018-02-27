<template>
  <div id="home">
    <DtHeader/>
    <div class="main">
      <DtSider/>
      <transition name="fade" mode="out-in">
        <router-view class="child"/>
      </transition>
    </div>
    <DtModal/>
  </div>
</template>

<script>
import DtHeader from './header'
import DtSider from './sider'
import DtModal from '../modal'
import { aes } from '@/global'
import {
  USER_INFO,
  ACCESS_TOKEN,
  LOGIN_INFO
} from '../../../php/project'
export default {
  components: {
    DtHeader,
    DtSider,
    DtModal
  },
  beforeCreate () {
    let info = window.localStorage.getItem(USER_INFO)
    if (info) {
      this.$http.account.login(JSON.parse(aes.decrypt(info))).then(data => {
        window.localStorage.setItem(ACCESS_TOKEN, data['access_token'])
        window.localStorage.setItem(LOGIN_INFO, aes.encrypt(JSON.stringify({login_time: Date.now(), expire: data.expire})))
      })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang=less>
@import '../../style/base/var';
#home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    position: fixed;
    left: 0;
    right: 0;
    top: @header-height;
    bottom: 0;
  }
  .child {
    width: 100%;
    padding: 25px;
    height: 100%;
    overflow: auto;
  }
}
</style>
