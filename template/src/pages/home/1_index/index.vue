<template>
  <div>

    <DtSection title="概览">
      <DtOverview :data="[
        {title: '昨日活用用户', content: '10', bg: require('@/assets/today.png')},
        {title: '7日活用用户', content: '20', bg: require('@/assets/seven.png')},
        {title: '30日活用用户', content: '30', bg: require('@/assets/thirty.png')}
      ]"/>
    </DtSection>

    <DtChartTrend api="statistics.user_trends"/>

    <DtChartTrend api="statistics.device_trends"/>

    <DtChartTrend api="nodata"/>

    <DtSection title="数据统计">
      <ButtonGroup slot="action" shape="circle">
        <Button :type="mapType===0?'primary':'ghost'" @click="mapType=0">产品分布</Button>
        <Button :type="mapType===1?'primary':'ghost'" @click="mapType=1">用户分布</Button>
      </ButtonGroup>
      <Row>
        <Col span="16">
          <DtMap :data="mapData" :name="['产品数', '用户数'][mapType]"/>
        </Col>
        <Col span="8">
          <DtTableScroll :tableData="mapData" :type="mapType"/>
        </Col>
      </Row>
    </DtSection>

  </div>
</template>

<script>
export default {
  data () {
    return {
      deviceTrend: [],
      userTrend: [],
      mapType: 0,
      mapData: []
    }
  },
  watch: {
    mapType: 'init'
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.mapData = [
        [{city: '广东', value: 90, percent: '100%'}],
        [{city: '台湾', value: 100, percent: '100%'}]
      ][this.mapType]
    }
  }
}
</script>
