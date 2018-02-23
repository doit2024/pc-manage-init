<template>
  <Sider id="sider" v-scrollbar :class="{show: isShowSider}">
    <Menu
      style="width: 200px;"
      :open-names="['1', '2']"
      :active-name="/^\/\w+/.exec($route.path)[0]"
      @on-select="handleSelect"
    >
      
      <MenuItem name="/index">
        <Icon type="ios-home"></Icon>
        <span class="title">首页</span>
      </MenuItem>

      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-list"></Icon>
          <span class="title">用户</span>
        </template>
        <MenuItem name="/user_detail">用户详情</MenuItem>
        <MenuItem name="/user_active">活跃用户</MenuItem>
      </Submenu>

      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-list"></Icon>
          <span class="title">设备</span>
        </template>
        <MenuItem name="/device_detail">设备详情</MenuItem>
        <MenuItem name="/device_authorize">设备授权</MenuItem>
      </Submenu>

      <MenuItem name="/apk">
        <Icon type="ios-home"></Icon>
        <span class="title">APK升级</span>
      </MenuItem>

      <MenuItem name="/firmware">
        <Icon type="ios-home"></Icon>
        <span class="title">固件升级</span>
      </MenuItem>

      <MenuItem name="/alert">
        <Icon type="ios-home"></Icon>
        <span class="title">告警管理</span>
      </MenuItem>

      <MenuItem name="/content">
        <Icon type="ios-home"></Icon>
        <span class="title">内容发布</span>
      </MenuItem>

      <MenuItem name="/message">
        <Icon type="ios-home"></Icon>
        <span class="title">消息管理</span>
      </MenuItem>

      <MenuItem name="/feedback">
        <Icon type="ios-home"></Icon>
        <span class="title">用户反馈</span>
      </MenuItem>

      <MenuItem name="/email">
        <Icon type="ios-home"></Icon>
        <span class="title">邮件管理</span>
      </MenuItem>

      <MenuItem name="/aboutus">
        <Icon type="ios-home"></Icon>
        <span class="title">关于我们</span>
      </MenuItem>

      <MenuItem name="/question">
        <Icon type="ios-home"></Icon>
        <span class="title">常见问题</span>
      </MenuItem>

    </Menu>
  </Sider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isShowSider'])
  },
  methods: {
    handleSelect (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang=scss>
@import '../scss/var';
#sider {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 200px;
  z-index: 10;
  box-shadow: 1px 0 3px #eee;
  overflow: auto;
  background: #fff;
  .ivu-menu-submenu-title {
    padding-left: 16px;
    padding-right: 10px;
  }
  .ivu-menu-vertical>.ivu-menu-item {
    padding-left: 16px;
    padding-right: 10px;
  }
  .ivu-icon {
    width: 13px;
    font-size: 16px;
  }
  .ivu-menu-submenu-title {
    background-color: rgba(0,155,155,.05);
  }
  .ivu-menu-item-active .ivu-menu-submenu-title {
    /* color: $color-theme; */
    color: $color-success;
    /* background-color: rgba(0,155,155,.05); */
    background: linear-gradient(90deg,rgba(0,155,155,.05),rgba(0,155,155,.08), rgba(0,155,155,.3));
  }
  .ivu-menu-item-selected {
    color: $color-success;
    /* background: linear-gradient(rgba(0,155,155,.08), #fff, rgba(0,155,155,.08)); */
    background: linear-gradient(#fff, rgba(0,155,155,.05), #fff);
  }
}
.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

</style>
