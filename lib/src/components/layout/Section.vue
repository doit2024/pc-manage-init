<template>
  <div class="dt-section">
    <div class="header">
      <div v-if="title" class="title">{{title}}</div>
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

<style lang=less>
.dt-section {
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
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 40px 6px #eee;
    border-radius: 6px;
    overflow: hidden;
  }
}
</style>
