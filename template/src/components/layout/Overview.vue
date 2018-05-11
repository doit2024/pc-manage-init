<template>
  <Row class="overview" :gutter="20">
    <Col :span="span" v-for="(x, i) in data" :key="i">
      <div class="overview-card" :style="{background: `url(${x.bg})`}">
        <h3>{{x.title}}</h3>
        <p>{{x.content}}</p>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    span () {
      return ~~(24 / this.data.length)
    }
  }
}
</script>

<style lang=less>
.overview {
  &-card {
    color: #fff;
    height: 156px;
    padding: 28px;
    background-color: #000;
    h3 { font-size: 16px; }
    p { font-size: 50px; }
  }
}
</style>
