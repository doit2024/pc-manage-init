<template>
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang=scss>
  @import './style/base/reset';
  @import './style/base/atom';
  @import './style/base/anim';
  @import './style/base/media';
  @import './style/base/scrollbar';
  @import './style/common';
</style>