<template>
  <div style="height:400px;"></div>
</template>

<script>
import Highcharts from 'highcharts'
import { setOptionsCircle } from './genOptions'
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
      new Highcharts.Chart(this.$el, setOptionsCircle({data: this.options, colors: this.colors}))
    }
  }
}
</script>
