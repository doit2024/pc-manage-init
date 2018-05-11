<template>
  <div id="trend" style="height:400px"></div>
</template>

<script>
import Highcharts from 'highcharts'
import { setOptionsLine } from './help'
export default {
  props: {
    color: {
      type: String,
      default: '#2d8cf0'
    },
    name: {
      type: String,
      required: true      
    },
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    chart: null
  }),
  watch: {
    data: {
      handler: 'update',
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const { color, name, data } = this
      this.chart = Highcharts.chart('trend', setOptionsLine({ color, name, data }))
    },
    update () {
      const { name, data, color } = this
      this.chart.update({
        series: [{ name, data, color }]
      })
    }
  }
}

</script>
