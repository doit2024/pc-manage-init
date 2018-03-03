<template>
  <div ref="box" class="trend-box"></div>
</template>

<script>
import Highcharts from 'highcharts'
import { credits } from './common'
export default {
  props: {
    viewData: {
      type: Object,
      required: true
    },
    color: String
  },
  data: () => ({
    chart: null
  }),
  // computed: {
  //   trendColors: () => [
  //     '#068DFF',
  //     '#1AD3A8'
  //   ]
  // },
  watch: {
    viewData: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.viewData.data && this.init()
  },
  methods: {
    init () {
      this.chart = new Highcharts.Chart(this.$refs.box, this.setOptions(this.viewData))
    },
    setOptions (viewData) {
      return {
        chart: {
          zoomType: 'x'
          // alignTicks: false
        },
        credits,
        title: {
          text: null
        },
        subtitle: {
          text: document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放'
        },
        xAxis: {
          type: 'datetime',
          crosshair: true,
          minorTickInterval: 'auto',
          // endOnTick: true,
          dateTimeLabelFormats: {
            // millisecond: '%H:%M:%S.%L',
            // second: '%H:%M:%S',
            // minute: '%H:%M',
            // hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
        },
        yAxis: {
          title: {
            text: null
          },
          min: 0,
          allowDecimals: false,
          crosshair: true,
          gridLineDashStyle: 'longdash'
        },
        tooltip: {
          dateTimeLabelFormats: {
            // millisecond: '%H:%M:%S.%L',
            // second: '%H:%M:%S',
            // minute: '%H:%M',
            // hour: '%H:%M',
            day: '%Y-%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.Color(this.color).setOpacity(0.5).get('rgba')],
                [1, Highcharts.Color(this.color).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: viewData.name,
          data: viewData.data,
          color: this.color
        }]
      }
    }
  }
}
</script>

<style>
.trend-box {
  height: 400px;
}
</style>
