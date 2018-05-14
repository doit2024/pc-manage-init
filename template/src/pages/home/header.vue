<template>
  <Header id="header">
    <div class="header_logo" @mouseenter="$store.dispatch('showSidebar', true)" @mouseleave="$store.dispatch('showSidebar', false)">
      <div class="logo">
        <img class="logo-img" src="../../assets/logo.png" alt="">
      </div>
      <Icon class="icon" type="navicon-round"></Icon>
    </div>
    <h1 class="header_title ellipsis">XXXXX后台管理系统</h1>
    <Dropdown class="header_right" trigger="click" placement="bottom-end" @on-visible-change="onVisibleChange">
      <Avatar v-if="userinfo.image" :src="userinfo.image" />
      <Avatar v-else :src="userDefault" />
      <span>{{ userinfo.fullname }}</span>
      <Icon type="arrow-down-b" :class="{'dropdown-tran': visible}"></Icon>
      <DropdownMenu slot="list">
        <li class="ivu-dropdown-item" @click="$store.dispatch('modal', {show: 'account', data: userinfo})">账号信息</li>
        <li class="ivu-dropdown-item" @click="quit">退出</li>
      </DropdownMenu>
    </Dropdown>
  </Header>
</template>

<script>
export default {
  data: () => ({
    userinfo: {
      avatar: '',
      fullname: 'summer',
      image: ''
    },
    visible: false
  }),
  computed: {
    userDefault () {
      return require('../../assets/user_default.png')
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const data = await this.$http.account.info()
      this.userinfo = data
    },
    onVisibleChange (v) {
      this.visible = v
    },
    quit (name) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要退出吗？',
        onOk: () => {
          this.$http.account.logout().then(this.handleQuit).catch(this.handleQuit)
        }
      })
    },
    handleQuit () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang=less>
@import '../../style/var';
#header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  opacity: .9;
  border-bottom: 1px solid #eee;
  &.ivu-layout-header {
    padding-left: 0;
  }
  z-index: 1;
  .header {
    &_logo {
      height: 100%;
      img { height: 100%; }
      .logo {
        width: @sidebar-width;
        justify-content: center;
        align-items: center;
        &-img {
          max-width: @sidebar-width;
          max-height: @header-height;
        }
      }
      .icon {
        font-size: 20px;
        padding: 0 90px;
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
