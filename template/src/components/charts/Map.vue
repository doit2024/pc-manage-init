<template>
  <div></div>
</template>

<script>
import $ from 'jsonp'
import Highcharts from 'highcharts'
import Highmaps from 'highcharts/modules/map'
import __options from './map'
Highmaps(Highcharts)

export default {
  props: {
    name: String,
    data: Array
  },
  watch: {
    data: 'init'
  },
  methods: {
    init() {
      $('https://data.jianshukeji.com/jsonp?filename=geochina/china.json', (err, mapData) => {
        if (err) return
        /* eslint-disable no-new */
        new Highcharts.Map(this.$el, __options({
          mapData,
          name: this.name,
          data: this.data.map(v => ({city: v.city, value: ~~v.value}))
        }))
      })
    }
  }
}
</script>
