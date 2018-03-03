<template>
  <DtSectionInline title="数据概览">
    <div slot="header">
      <slot></slot>
    </div>
    <Row class="card-group">
      <Col span="6" v-for="(v, i) in detail" :key="i">
        <Card shadow class="mr-20">
          <p slot="title">{{v.title}}</p>
          <p class="number">{{v.number || '--'}}</p>
        </Card>
      </Col>
    </Row>
  </DtSectionInline>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      validator: v => ['deviceInTrouble', 'couponDetail'].includes(v)
    },
    viewData: Array
  },
  data: () => ({
    detail: []
  }),
  watch: {
    viewData () {
      this.handleViewData()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleViewData () {
      if (this.viewData) this.detail = this.viewData
    },
    init () {
      this.handleViewData()
      switch (this.name) {
        case 'deviceInTrouble':
          this.$http.deviceFault.get().then(data => {
            this.detail = [{
              title: '故障数量',
              number: data.fault_total
            }, {
              title: '设备故障',
              number: data.device_total
            }, {
              title: '机柜故障',
              number: data.cab_total
            }]
          })
          break
        case 'couponDetail':
          this.$http.userCouponDetail.get().then(data => {
            this.detail = [{
              title: '领取总数',
              number: data.receive_total
            }, {
              title: '使用总数',
              number: data.used_total
            }]
          })
          break
      }
    }
  }
}
</script>

<style lang=less>
.card-group {
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  .ivu-card {
    box-shadow: 0 0 10px #ccc;
  }
  .ivu-card-head p {
    color: #485b6d;
  }
  .number {
    font-size: 50px;
    text-align: center;
    line-height: 90px;
  }
}
</style>
