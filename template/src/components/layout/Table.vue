<template>
  <DtSection :title="title">
    <div slot="action">
      <slot :disabled="!tableData.list.length" :target="selections"></slot>
    </div>
    <Table
      stripe
      border
      class="large"
      :loading="loading"
      :columns="columns"
      :data="tableData.list"
      no-data-text="<p class='tc'>暂无数据</p>"
      @on-selection-change="onSelectionChange"
    ></Table>
    <div class="table_pagination-box">
      <Page :total="tableData.total" show-elevator :current.sync="keys.page"></Page>
      <slot :target="selections" name="footer"></slot>
    </div>
  </DtSection>
</template>

<script>
import bus from '@/bus'
export default {
  props: {
    title: {
      type: String
    },
    api: {
      type: String,
      required: true
    },
    keys: {
      type: Object,
      required: true
    },
    columns: Array,
    selectIdName: String
  },
  data: () => ({
    tableData: {
      total: 0,
      list: []
    },
    loading: false,
    selections: ''
  }),
  watch: {
    keys: {
      handler: 'init',
      deep: true,
      immediate: true
    }
  },
  mounted () {
    bus.$on('updateTable', isUnshift => {
      if (isUnshift && this.keys.page > 1) {
        this.keys.page = 1
      } else {
        this.init()
      }
    })
  },
  destroyed () {
    bus.$off('updateTable')
  },
  methods: {
    async init () {
      this.loading = true
      this.selections = ''
      const { data } = await this.$http[this.api].getList(this.keys)
      data.total = ~~data.total
      data.domain && data.list.map(item => { item.image = data.domain + item.image })
      if (data.list.length === 0 && this.keys.page > 1) {
        return this.keys.page--
      }
      setTimeout(() => {
        this.loading = false
        this.tableData = data
      }, 300)
    },
    onSelectionChange (selections) {
      this.selections = selections.map(v => v[this.selectIdName] || v.id).join(',')
    },
    onPageChange (page) {
      this.keys.page = page
    }
  }
}
</script>

<style>
.table_pagination-box {
  display: flex;
  padding: 30px 0;
  background-color: #fff;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.title_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
