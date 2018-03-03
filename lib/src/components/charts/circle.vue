<template>
  <div ref="box" class="circle-box"></div>
</template>

<script>
import Highcharts from 'highcharts'
import { credits } from './common'
export default {
  props: {
    viewData: Object
  },
  data: () => ({
    chart: null
  }),
  watch: {
    viewData (c) {
      this.init()
    }
  },
  methods: {
    init () {
      this.chart = new Highcharts.Chart(this.$refs.box, this.setOptions(this.viewData))
    },
    setOptions (viewData) {
      return {
        // legend: {
        //   align: 'right',
        //   verticalAlign: 'top'
        // },
        colors: viewData.colors,
        credits,
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacing: [10, 10, 10, 10]
        },
        title: {
          text: viewData.title,
          align: 'left',
          style: {
            fontSize: '12px'
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            size: 180,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.percentage:.0f}</b> %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          type: 'pie',
          innerSize: '80%',
          name: '占比',
          data: viewData.data,
          showInLegend: true
        }]
      }
    }
  }
}
</script>

<style lang=less>
.circle-box {
  width: 23%;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px #ccc;
}
</style>
