<template>
  <div class="search">
    <Input v-model="content" :placeholder="placeholder" style="width: 200px;">
      <Button
        slot="append"
        icon="search"
        @click="doSearch"
        style="padding-left:8px;padding-right:8px"
      >搜索</Button>
    </Input>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '输入位置搜索'
    }
  },
  data: () => ({
    content: ''
  }),
  watch: {
    content (c, oc) {
      if (!c && oc) {
        this.doSearch()
      }
    }
  },
  methods: {
    doSearch () {
      this.$emit('onSearch', this.content)
    }
  }
}
</script>

<style>
.search .ivu-input-group-prepend,.ivu-input-group-append {
  background-color: #fff;
  user-select: none;
}
</style>
