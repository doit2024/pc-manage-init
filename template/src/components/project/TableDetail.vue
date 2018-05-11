<template>
  <div class="dt-table-detail">
    <Row class="key">
      <Col :span="span" v-for="(x, i) in data.keys" :key="i">{{x}}</Col>
    </Row>
    <Row class="value">
      <Col :span="span" v-for="(x, i) in data.values" :key="i">{{x}}</Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    span () {
      return ~~(24 / this.data.keys.length)
    }
  }
}
</script>

<style lang=less>
.dt-table-detail {
  background-color: #fff;
  text-align: center;
  line-height: 50px;
  .key {
    border-bottom: 1px dashed #ddd;
  }
  .value {
    font-weight: bold;
  }
}
</style>
