<template>
  <DtSection :title="trend.title">
    <DtSelect slot="action" name="days" v-model="keys.type"/>
    <DtCheckNoData :isNoData="!trend.data.length">
      <DtTrend :color="trend.color" :name="trend.name" :data="trend.data"/>
    </DtCheckNoData>
  </DtSection>
</template>

<script>
const data = {
  'statistics.user_trends': {
    title: '用户趋势',
    color: '#f80',
    name: '用户数量',
    data: []
  },
  'statistics.device_trends': {
    title: '设备趋势',
    color: '#f00',
    name: '设备数量',
    data: []
  },
  'nodata': {
    title: '无数据情况',
    color: '#f00',
    name: '----',
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
      trend: data[this.api],
      keys: {
        type: '1'
      }
    }
  },
  watch: {
    keys: {
      handler: 'init',
      deep: true,
      immediate: true
    }
  },
  methods: {
    async init () {
      if (this.api === 'nodata') return // 演示效果用，可删除此行
      const [ controller, action ] = this.api.split('.')
      const data = await this.$http[controller][action]()
      this.trend.data = data.map(item => [item.date * 1000, item.value])
    }
  }
}
</script>
