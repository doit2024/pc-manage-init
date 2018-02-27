<template>
  <Header id="header">
    <div class="header_logo" @mouseenter="$store.dispatch('showSider', true)" @mouseleave="$store.dispatch('showSider', false)">
      <img src="../../assets/logo.png" alt="">
    </div>
    <h1  class="header_title">XXXX后台管理系统</h1>
    <Dropdown class="header_right" trigger="click" placement="bottom-end" @on-visible-change="onVisibleChange">
      <img v-if="userInfo.avatar" :src="userInfo.avatar">
      <!-- <img v-else src="../assets/avatar_default.png"> -->
      <span class="welcome">{{ userInfo.fullname }}</span>
      <Icon type="arrow-down-b" :class="{'dropdown-tran': visible}"></Icon>
      <DropdownMenu slot="list">
        <li class="ivu-dropdown-item" @click="$store.dispatch('showModal', {name: 'user-edit'})">账号信息</li>
        <li class="ivu-dropdown-item" @click="quit">退出</li>
      </DropdownMenu>
    </Dropdown>
  </Header>
</template>

<script>
import { ACCESS_TOKEN } from '@/../php/project'
// import { mapGetters } from 'vuex'
export default {
  data: () => ({
    visible: false,
    userInfo: {
      avatar: '',
      fullname: 'summer'
    }
  }),
  // computed: {
  //   ...mapGetters(['userInfo'])
  // },
  methods: {
    onVisibleChange (v) {
      this.visible = v
    },
    quit (name) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要退出吗？',
        onOk: () => {
          this.$http.account.logout().then(res => {
            this.$utils.removeStore(ACCESS_TOKEN)
            this.$utils.removsStore('routerPath')
            this.$store.dispatch('quit')
            this.$router.replace('/login')
          }).catch(e => {
            this.$utils.removeStore(ACCESS_TOKEN)
            this.$store.dispatch('quit')
            this.$router.replace('/login')
          })
        }
      })
    }
  }
}
</script>

<style lang=less>
@import '../../style/base/var';
#header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  opacity: .9;
  box-shadow: 0 1px 3px #eee;
  z-index: 1;
  .header {
    &_logo {
      height: 100%;
      img {
        height: 100%;
      }
    }
    &_title {
      font-size: 20px;
    }
    &_right {
      cursor: pointer;
      font-size: 14px;
      .ivu-icon {
        transition: all .3s;
        transform-origin: center;
        &.dropdown-tran {
          transform: rotate(180deg)
        }
      }
    }
  }
}
</style>
