<template>
  <DtSection :title="title">
    <Row style="width:100%">
      <Col class="" span="8" v-for="(item, i) in detail" :key="i">
        <DtUiCircle :detail="item"/>
      </Col>
    </Row>
  </DtSection>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    detail: []
  }),
  mounted () {
    this.$http.homepage.get_diagram_analyse().then(data => {
      this.detail = [
        {
          title: '近7天订单有效性',
          data: [
            ['有效', ~~data.order_effective],
            ['无效', ~~(data.order_total - data.order_effective)]
          ],
          colors: ['#96DBBC', '#42B983']
        },
        {
          title: '设备连接状态比例',
          data: [
            ['在线', ~~data.online],
            ['离线', ~~data.offline]
          ],
          colors: ['#9ABBF9', '#508DFF']
        // },
        // {
        //   title: '设备运行状态比例',
        //   data: [
        //     ['运行', 7],
        //     ['离线', 5],
        //     ['故障', 5],
        //     ['报废', 5]
        //   ],
        //   colors: ['#E96969', '#EA9574', '#FFC377', '#F1E17C']
        // },
        // {
        //   title: '机柜运营状态比例',
        //   data: [
        //     ['有效订单', 7],
        //     ['无效订单', 15]
        //   ],
        //   colors: ['#8254CA', '#B89AE8']
        }
      ]
    })
  }
}
</script>
