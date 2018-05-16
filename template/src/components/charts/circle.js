import common from './common'

export default oKeys => {
  const { data, colors, name } = oKeys

  return {
    ...common,
    legend: {
      align: 'right',
      verticalAlign: 'top'
    },
    colors,
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
      name: name || '占比',
      data,
      showInLegend: true
    }]
  }
}
