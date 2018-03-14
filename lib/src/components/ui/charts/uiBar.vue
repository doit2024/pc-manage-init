<template>
  <div ref="box" class="bar-box">
    <div class="no-data">暂无数据</div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import config from './config'
export default {
  props: {
    data: {
      type: Array
    },
    themeColor: {
      type: String,
      default: config.color
    },
    yTitle: {
      type: String,
      default: '数量 (台)'
    }
  },
  data: () => ({
    chart: null
  }),
  watch: {
    data (c) {
      if (c.length) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.chart = new Highcharts.Chart(this.$refs.box, this.setOptions(this.data))
    },
    setOptions (data) {
      return {
        chart: {
          type: 'column'
        },
        credits: config.credits,
        title: {
          text: null
        },
        xAxis: {
          type: 'category',
          labels: {
            // rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: this.yTitle
          },
          allowDecimals: false
        },
        legend: {
          enabled: false
        },
        tooltip: {
          // '数量: <b>{point.y:.0f} </b>'
          pointFormat: this.yTitle.split('(').join(`: <b>{point.y:.0f} </b>`).replace(')', '')
        },
        series: [{
          data,
          color: this.themeColor,
          dataLabels: {
            enabled: true,
            // rotation: -90,
            color: '#FFFFFF',
            // align: 'right',
            format: '{point.y:.0f}', // one decimal
            // y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px'
              // fontFamily: 'Verdana, sans-serif'
            }
          }
        }]
      }
    }
  }
}
</script>

<style lang=scss>
.bar-box {
  height: 400px;
  background-color: #fff;
  .no-data {
    text-align: center;
    font-size: 16px;
    padding: 50px 0;
  }
}
</style>
