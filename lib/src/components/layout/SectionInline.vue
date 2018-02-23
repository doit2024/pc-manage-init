<template>
  <div class="dt-section-inline">
    <div class="header">
      <div class="title">{{title}}</div>
      <div class="action"><slot name="header"></slot></div>
    </div>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang=scss>
.dt-section-inline {
  margin-bottom: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
    border: 1px solid #eee;
    border-radius: 6px;
    background-color: #fff;
    overflow: hidden;
  }
}
</style>
