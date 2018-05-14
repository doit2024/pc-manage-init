<template>
  <DtSection :title="trend.title">
    <DtTrend :color="trend.color" :name="trend.name" :data="trend.data"/>
  </DtSection>
</template>

<script>
const data = {
  user: {
    title: '用户趋势',
    color: '#f80',
    name: '用户数量',
    data: []
  },
  device: {
    title: '设备趋势',
    color: '#f00',
    name: '设备数量',
    data: []
  }
}
export default {
  props: {
    api: {
      type: String,
      validator: v => data[v]
    }
  },
  data () {
    return {
      trend: data[this.api]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // const data = await this.$http[this.api].trend()
      // this.trend.data = data

      if (this.api === 'user') {
      this.trend.data = ['20180905', '20180906', '20180907', '20180908', '20180909', '20180910']
      .map(v => [Date.parse(v.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')) + 8*60*60*1000, 25])
      } else {
        this.trend.data = ['20190905', '20180906', '20180907', '20180908', '20180909', '20180910']
        .map(v => [Date.parse(v.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')) + 8*60*60*1000, 125])
      }
    }
  }
}
</script>
