import Highcharts from 'highcharts'
import common from './common'

export default oKeys => {
  const { color, name, data } = oKeys

  return {
    ...common,
    chart: {
      zoomType: 'x'
    },
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
      dateTimeLabelFormats: {
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
            [0, Highcharts.Color(color).setOpacity(0.5).get('rgba')],
            [1, Highcharts.Color(color).setOpacity(0).get('rgba')]
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
      name,
      data,
      color
    }]
  }
}
