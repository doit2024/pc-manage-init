<template>
  <Sider id="sider" v-scrollbar :class="{show: isShowSider}">
    <Menu
      style="width: 200px;"
      :open-names="[]"
      :active-name="/^\/\w+/.exec($route.path)[0]"
      @on-select="handleSelect"
    >
      <MenuItem name="/index">
        <Icon type="ios-home"></Icon>
        <span class="title">首页</span>
      </MenuItem>

      <MenuItem name="/device">
        <Icon type="ios-home"></Icon>
        <span class="title">设备管理</span>
      </MenuItem>

      <MenuItem name="/user">
        <Icon type="ios-home"></Icon>
        <span class="title">用户管理</span>
      </MenuItem>

      <MenuItem name="/data">
        <Icon type="ios-home"></Icon>
        <span class="title">数据分析</span>
      </MenuItem>

      <MenuItem name="/message">
        <Icon type="ios-home"></Icon>
        <span class="title">消息推送</span>
      </MenuItem>

      <MenuItem name="/feedback">
        <Icon type="ios-home"></Icon>
        <span class="title">反馈意见</span>
      </MenuItem>

      <MenuItem name="/member">
        <Icon type="ios-home"></Icon>
        <span class="title">成员管理</span>
      </MenuItem>

      <MenuItem name="/firmware">
        <Icon type="ios-home"></Icon>
        <span class="title">固件升级</span>
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

<style lang=less>
@import '../../style/base/var';
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
    /* color: @color-theme; */
    color: @color-success;
    /* background-color: rgba(0,155,155,.05); */
    background: linear-gradient(90deg,rgba(0,155,155,.05),rgba(0,155,155,.08), rgba(0,155,155,.3));
  }
  .ivu-menu-item-selected {
    color: @color-success;
    /* background: linear-gradient(rgba(0,155,155,.08), #fff, rgba(0,155,155,.08)); */
    background: linear-gradient(#fff, rgba(0,155,155,.05), #fff);
  }
}
.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

</style>
