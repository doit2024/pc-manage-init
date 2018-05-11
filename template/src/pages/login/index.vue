<template>
  <div style="height:100%; width:100%">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <DtParticles/>
  </div>
</template>

<script>
import { loginUser } from '@/global/storage'
import CONFIG from '@/config'
const { DEV_ADMIN } = CONFIG
export default {
  created () {
    if (process.env.NODE_ENV === 'development') {
      loginUser.set(DEV_ADMIN)
    }
  }
}
</script>
