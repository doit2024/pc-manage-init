<template>
  <Sider id="sider" v-scrollbar :class="{show: isShowSider}">
    <Menu
      style="width: 200px;"
      :open-names="['4', '5', '6']"
      :active-name="/^\/\w+/.exec($route.path)[0]"
      @on-select="handleSelect"
    >
      <MenuItem name="/home">
        <Icon type="ios-home"></Icon>
        <span class="title">主页概况</span>
      </MenuItem>
      <Submenu name="1">
        <template slot="title">
          <Icon type="usb"></Icon>
          <span class="title">设备管理</span>
        </template>
        <MenuItem name="/device">设备列表</MenuItem>
        <MenuItem name="/device_cabinet">机柜管理</MenuItem>
        <MenuItem name="/device_charge">分时费率管理</MenuItem>
        <MenuItem name="/device_trouble">设备故障记录</MenuItem>
        <MenuItem name="/device_map">地图显示</MenuItem>
        <MenuItem name="/device_firmware">固件管理</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          <span class="title">用户管理</span>
        </template>
        <MenuItem name="/user">用户列表</MenuItem>
        <MenuItem name="/user_black">用户黑名单</MenuItem>
        <MenuItem name="/user_rent">快递租借</MenuItem>
        <MenuItem name="/user_coupon">优惠券</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-chatbubble"></Icon>
          <span class="title">消息管理</span>
        </template>
        <MenuItem name="/message">消息列表</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-list"></Icon>
          <span class="title">互动信息管理</span>
        </template>
        <MenuItem name="/interaction">APP反馈</MenuItem>
        <MenuItem name="/interaction_help">帮助问题</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-cart"></Icon>
          <span class="title">商品管理</span>
        </template>
        <MenuItem name="/product">商品列表</MenuItem>
        <MenuItem name="/product_order">订单管理</MenuItem>
        <MenuItem name="/product_appraise">评价管理</MenuItem>
      </Submenu>
      <MenuItem name="/analysis">
        <Icon type="stats-bars"></Icon>
        <span class="title">数据分析</span>
      </MenuItem>
      <Submenu name="6">
        <template slot="title">
          <Icon type="person-stalker"></Icon>
          <span class="title">系统成员管理</span>
        </template>
        <MenuItem name="/member">成员列表</MenuItem>
        <MenuItem name="/member_auth">权限设置</MenuItem>
        <MenuItem name="/member_role">角色列表</MenuItem>
        <MenuItem name="/member_log">操作日志</MenuItem>
      </Submenu>
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
