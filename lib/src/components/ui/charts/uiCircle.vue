<template>
  <div ref="circleBox" class="circle-box"></div>
</template>

<script>
import Highcharts from 'highcharts'
import config from './config'
export default {
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    chart: null
  }),
  watch: {
    detail: {
      handler (c) {
        console.log(c)
        this.init(c)
      },
      deep: true
    }
  },
  mounted () {
    this.init(this.detail)
  },
  methods: {
    init (oKeys) {
      if (this.detail) {
        this.chart = new Highcharts.Chart(this.$refs.circleBox, this.setOptions(oKeys))
      }
    },
    setOptions (oKeys) {
      return {
        // legend: {
        //   align: 'right',
        //   verticalAlign: 'top'
        // },
        colors: oKeys.colors,
        credits: config.credits,
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacing: [10, 10, 10, 10]
        },
        title: {
          text: oKeys.title,
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
          data: oKeys.data,
          showInLegend: true
        }]
      }
    }
  }
}
</script>

<style lang=scss>
.circle-box {
  height: 300px;
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  margin-right: 30px;
}
</style>
