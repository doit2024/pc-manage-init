<template>
  <div></div>
</template>

<script>
import Highcharts from 'highcharts'
import __options from './circle'
export default {
  props: {
    options: Array,
    colors: Array
  },
  watch: {
    options: 'init'
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      /* eslint-disable no-new */
      new Highcharts.Chart(this.$el, __options({
        data: this.options,
        colors: this.colors
      }))
    }
  }
}
</script>
