<template>
  <div>

    <DtSection title="概览">
      <DtOverview :data="[
        {title: '昨日活用用户', content: '10', bg: require('@/assets/today.png')},
        {title: '7日活用用户', content: '20', bg: require('@/assets/seven.png')},
        {title: '30日活用用户', content: '30', bg: require('@/assets/thirty.png')}
      ]"/>
    </DtSection>

    <DtChartTrend api="user"/>

    <DtChartTrend api="device"/>

    <DtSection title="数据统计">
      <ButtonGroup shape="circle">
        <Button :type="type===0?'primary':'ghost'" @click="type=0">产品分布</Button>
        <Button :type="type===1?'primary':'ghost'" @click="type=1">用户分布</Button>
      </ButtonGroup>
      <Row>
        <Col span="16">
          <DtMap :mapData="mapData"/>
        </Col>
        <Col span="8">
          <DtTableScroll :tableData="mapData" :type="type"/>
        </Col>
      </Row>
    </DtSection>

  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceTrend: [],
      userTrend: [],
      type: 0,
      mapData: []
    }
  },
  watch: {
    type(c) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.mapData = [{city: '广东', value: 90, percent: '100%'}]
    }
  }
}
</script>
