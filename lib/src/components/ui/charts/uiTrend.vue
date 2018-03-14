<template>
  <div ref="trendBox" class="trend-box">
    <div class="no-data">暂无数据</div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import config from './config'
export default {
  props: {
    detail: Object
  },
  data: () => ({
    chart: null
  }),
  watch: {
    detail: {
      handler (c) {
        this.init(this.detail)
      },
      deep: true
    }
  },
  mounted () {
    this.init(this.detail)
  },
  methods: {
    init (oKeys) {
      if (oKeys.color) {
        this.chart = new Highcharts.Chart(this.$refs.trendBox, this.setOptions(oKeys))
      }
    },
    setOptions (oKeys) {
      return {
        chart: {
          zoomType: 'x'
        },
        credits: config.credits,
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
                [0, Highcharts.Color(oKeys.color).setOpacity(0.5).get('rgba')],
                [1, Highcharts.Color(oKeys.color).setOpacity(0).get('rgba')]
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
          name: oKeys.name,
          data: oKeys.data,
          color: oKeys.color
        }]
      }
    }
  }
}
</script>

<style lang=scss>
.trend-box {
  height: 400px;
  background-color: #fff;
  border: 1px solid #eee;
  .no-data {
    text-align: center;
    font-size: 16px;
    padding: 50px 0;
  }
}
</style>
