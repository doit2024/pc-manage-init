<template>
  <div class="section">
    <div class="section-header">
      <div class="left" :style="`color: ${color}`">
        <img v-if="icon" class="section-icon" :src="icon">
        {{title}}
      </div>
      <div class="right">
        <slot name="action"/>
      </div>
    </div>
    <div class="section-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    color: {
      type: String,
      default: '#2d8cf0'
    }
  }
}
</script>

<style lang=less>
.section {
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 10px 3px #ddd;
  margin-bottom: 30px;
  &-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #eee;
    line-height: 50px;
    background-color: #fff;
    padding: 0 15px;
    .left {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
    }
    .right {
      cursor: pointer;
    }
  }
  &-content {
    padding: 30px;
    background-color: #fff;
  }
  &-icon {
    margin-right: 10px;
  }
}
</style>
