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
  @import './style/reset';
  @import './style/atom';
  @import './style/anim';
  @import './style/media';
  @import './style/scrollbar';
  @import './style/common';
</style>
