<template>
  <Row class="overview-cards">
    <Col span="6" v-for="(item, i) in detail" :key="i">
      <div class="item">
        <i class="icon" :style="{backgroundImage: `url(${getIcon(item.icon)})`}"></i>
        <p class="title">{{item.title}}</p>
        <p class="number">{{item.number}}</p>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  props: {
    detail: Array
  },
  methods: {
    getIcon (icon) {
      return require(`./img/icon_${icon}.png`)
    }
  }
}
</script>

<style lang=scss>
.overview-cards {
  width: 100%;
  display: flex;
  .item {
    border: 1px solid #ddd;
    margin-right: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .icon {
      display: block;
      width: 28px;
      height: 28px;
      background-size: cover;
      margin-right: 12px;
    }
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-right: 10px;
    }
    .number {
      font-size: 32px;
      line-height: 3;
    }
  }
}
</style>
