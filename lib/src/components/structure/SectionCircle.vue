<template>
  <DtSectionInline :title="title">
    <DtCircle v-for="(item, i) in viewData" :key="i" :viewData="item" style="width:46%"/>
  </DtSectionInline>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '比例图'
    },
    viewData: Array
  }
}
</script>
