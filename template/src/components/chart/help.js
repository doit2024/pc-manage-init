import Highcharts from 'highcharts'

export const credits = {
  href: 'http://www.dtston.com',
  text: 'dtston.com'
}

export const setOptionsLine = oKeys => {
  const { color, name, data } = oKeys
  return {
    chart: {
      type: 'area',
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
      name,
      data,
      color
    }]
  }
}

export const setOptionsCircle = oKeys => {
  const { data, colors } = oKeys
  return {
    legend: {
      align: 'right',
      verticalAlign: 'top'
    },
    colors,
    credits,
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacing: [30, 10, 30, 10]
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        size: 200,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b style="font-size: 20px; color: #555">{point.percentage:.0f}</b> %',
          style: {
            color: 'black'
          }
        }
      }
    },
    series: [{
      type: 'pie',
      innerSize: '80%',
      name: '市场份额',
      data,
      showInLegend: true
    }]
  }
}
