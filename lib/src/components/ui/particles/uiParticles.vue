<template>
  <div id="particles"></div>
</template>

<script>
import particles from './bundle'
export default {
  mounted () {
    particles('particles', {
      particles: {
        color: '#E3E9F0',
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: 1,
        size: 15,
        size_random: true,
        nb: 50,
        line_linked: {
          enable_auto: true,
          distance: 300,
          color: '#E3E9F0',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 2
        }
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 300
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: 0.5
        },
        events: {
          onclick: {
            enable: true,
            mode: 'push', // "push" or "remove"
            nb: 1
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    })
  }
}
</script>

<style>
#particles {
  background: #F6FAFC;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
