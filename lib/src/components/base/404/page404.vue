<template>
  <div id="page404">
    <div class="wrap" ref="wrap">
      <div class="wall">
        <p class="text" ref="text">404</p>
        <div></div>
      </div>
      <div class="light" ref="light"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$refs.wrap.onmousemove = this.onMouseMove
      this.$refs.wrap.ontouchmove = e => {
        e.preventDefault()
        e.stopPropagation()
        this.onMouseMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY
        })
      }
      this.onMouseMove({ clientX: 600, clientY: 500 })
    },
    onMouseMove (e) {
      let x = e.clientX - this.$refs.wrap.offsetLeft
      let y = e.clientY - this.$refs.wrap.offsetTop
      let xm = x - 300
      let ym = y - 175
      let d = Math.sqrt(xm * xm + ym * ym)
      this.$refs.text.style.textShadow = -xm + 'px ' + -ym + 'px ' + (d / 5 + 10) + 'px black'
      xm = x - 600
      ym = y - 450
      this.$refs.light.style.backgroundPosition = xm + 'px ' + ym + 'px'
    }
  }
}
</script>

<style lang=scss scoped>
#page404 {
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    position: relative;
    width: 598px;
    height: 406px;
    background: #666;
    overflow: hidden;
    cursor: none;
    border: 1px solid #333;
    box-shadow: 0 0 20px #444;
    border-radius: 10px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
  }
  .wrap div.wall {
    position: absolute;
    top: 175px;
    left: 0;
    width: 100%;
  }
  .text {
    margin: 0;
    color: #999;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 80px;
    line-height: 0.5em;
    height: 1px;
    font-weight: bold;
    text-align: center;
  }
  div.wall div {
    position: absolute;
    background: #999;
    top: 42px;
    left: 0;
    height: 300px;
    width: 100%;
  }
  .light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(./light.png) top center;
  }
}
</style>
