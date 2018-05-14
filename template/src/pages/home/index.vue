<template>
  <div id="home">
    <DtHeader/>
    <div class="main">
      <DtSider/>
      <div class="child">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
    <DtModal/>
  </div>
</template>

<script>
import DtHeader from './header'
import DtSider from './sider'
import DtModal from '../modal'
export default {
  components: {
    DtHeader,
    DtSider,
    DtModal
  }
}
</script>

<style lang=less>
@import '../../style/var';
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
    background-color: #f5f8fc;
  }
  .child {
    width: 100%;
    padding: 25px;
    height: 100%;
    overflow: auto;
  }
}
</style>
