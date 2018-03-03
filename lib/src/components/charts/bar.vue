<template>
  <div ref="box" class="bar-box">
    <div class="no-data">暂无数据</div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import { credits } from './common'
export default {
  props: {
    viewData: Array,
    color: {
      type: String,
      default: '#1AD3A8'
    }
  },
  data: () => ({
    chart: null
  }),
  watch: {
    viewData (c) {
      if (c.length) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.chart = new Highcharts.Chart(this.$refs.box, this.setOptions(this.viewData))
    },
    setOptions (data) {
      return {
        chart: {
          type: 'column'
        },
        credits,
        title: {
          text: null
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: '用户数 (位)'
          },
          allowDecimals: false
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: '用户数: <b>{point.y:.0f} </b>位'
        },
        series: [{
          name: '故障名称',
          data,
          color: this.color,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }]
      }
    }
  }
}
</script>

<style lang=less>
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
