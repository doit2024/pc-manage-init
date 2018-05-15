<template>
  <div class="login">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <div class="links">
        <a href="">帮助</a>
        <a href="">隐私</a>
        <a href="">条款</a>
      </div>
      <div class="copyright">Copyright @ 2018 电陶思创</div>
    </div>
    <DtParticles/>
  </div>
</template>

<style lang=less>

.login {
  height:100%;
  width:100%;
  display: flex;
  flex-direction: column;
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    z-index: 10;
  }
  .links a {
    margin: 10px;
  }
}

</style>
