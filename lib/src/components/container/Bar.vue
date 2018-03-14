<template>
  <DtSection :title="title">
    <DtUiBar :data="stats" :themeColor="themeColor"/>
  </DtSection>
</template>

<script>
import { OPTIONS } from '@/global'
export default {
  name: 'DtBar',
  props: {
    api: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    themeColor: String
  },
  data: () => ({
    stats: []
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http[this.api].stats().then(data => {
        this.stats = this.handleData(data, this.api)
      })
    },
    handleData (data, api) {
      switch (api) {
        case 'deviceFault':
          return data.map(item => [
            OPTIONS.deviceType[item.device_type - 1] + OPTIONS.fault[item.fault_type],
            parseInt(item.c)
          ])
        default:
          break
      }
    }
  }
}
</script>
