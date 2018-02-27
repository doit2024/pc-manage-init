<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang=less>
  @import './style/base/reset';
  @import './style/base/atom';
  @import './style/base/anim';
  @import './style/base/media';
  @import './style/base/scrollbar';
  @import './style/common';
</style>
