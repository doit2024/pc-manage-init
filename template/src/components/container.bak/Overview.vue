<template>
  <DtSection title="数据概览">
    <DtSelect v-if="hasKeys" name="days" slot="header" v-model="keys.type" style="width:200px"/>
    <DtUiOverview :detail="detail"/>
  </DtSection>
</template>

<script>
export default {
  props: {
    hasKeys: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      required: true
    }
  },
  data: () => ({
    keys: {
      type: '0'
    },
    detail: []
  }),
  watch: {
    keys: {
      handler (c) {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http[this.api].overview(this.keys).then(data => {
        this.detail = this.handleData(data, this.api)
      })
    },
    handleData (data, api) {
      switch (api) {
        case 'homepage':
          return [{
            icon: 'user',
            title: '新增用户',
            number: data.amount_user
          }, {
            icon: 'xzsb',
            title: '新增设备数',
            number: data.amount_device
          }, {
            icon: 'xzjg',
            title: '新增机柜数',
            number: data.amount_cabinet
          }, {
            icon: 'xzdd',
            title: '新增订单数',
            number: data.amount_order
          }]
        case 'deviceFault':
          return [{
            icon: 'faults',
            title: '故障数量',
            number: data.fault_total
          }, {
            icon: 'sbgz',
            title: '设备故障',
            number: data.device_total
          }, {
            icon: 'jggz',
            title: '机柜故障',
            number: data.cab_total
          }]
        case 'userCouponDetail':
          return [{
            icon: 'faults',
            title: '领取总数',
            number: data.receive_total
          }, {
            icon: 'xzsb',
            title: '使用总数',
            number: data.used_total
          }]
        default:
          break
      }
    }
  }
}
</script>
