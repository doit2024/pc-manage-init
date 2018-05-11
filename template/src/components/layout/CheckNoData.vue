<template>
  <div>
    <div v-if="isNoData" class="nodata">
      暂无数据
    </div>
    <slot v-else/>
  </div>
</template>

<script>
export default {
  props: {
    isNoData: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
.nodata {
  padding: 30px 0 60px;
  text-align: center;
}
</style>
