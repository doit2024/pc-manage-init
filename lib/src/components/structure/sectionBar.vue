<template>
  <DtSection :title="title">
    <DtBar :viewData="viewData"/>
  </DtSection>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '柱状图分布'
    },
    viewData: Array
  }
}
</script>
