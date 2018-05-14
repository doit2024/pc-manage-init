<template>
  <Sider id="sider" class="scroll-hide" :class="{show: isSidebar}">
    <Menu
      style="width: 200px;"
      :open-names="[]"
      :active-name="$route.path"
      @on-select="handleSelect"
    >{{$content}}
    </Menu>
  </Sider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isSidebar'])
  },
  methods: {
    handleSelect (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang=less>
@import '../../style/var';
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
}
.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

</style>
