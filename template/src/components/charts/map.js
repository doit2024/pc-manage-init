import Highcharts from 'highcharts'

export default oKeys => {
  const { data, mapData, name } = oKeys

  return {
    title: null,
    credits: {
      enabled: false
    },
    mapNavigation: {
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    tooltip: {
      useHTML: true,
      headerFormat: `<table><tr><td>{point.name}</td></tr>`,
      pointFormat: `
        <tr><td>所在地：</td><td>{point.properties.fullname}</td></tr>
        <tr><td>{series.name}：</td><td>{point.value}</td></tr>
        <tr><td>经纬度：</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>
      `,
      footerFormat: `</table>`
    },
    colorAxis: {
      min: 0,
      minColor: '#e3effd',
      maxColor: '#006cee',
      labels: {
        style: { 'color': '#1AD3A8', 'fontWeight': 'bold' }
      }
    },
    series: [{
      data,
      mapData,
      joinBy: ['name', 'city'],
      name,
      states: {
        hover: {
          color: Highcharts.getOptions().colors[2]
        }
      }
    }]
  }
}
