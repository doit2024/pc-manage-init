<template>
  <div class="table-scroll">
    <table class="header">
      <tr style="width: 100%;display: flex;">
        <th style="width:27%">地域</th>
        <th style="width:42%">{{ ['产品数', '用户数'][this.type] }}</th>
        <th style="width:25%">占比</th>
      </tr>
    </table>
    <Table
      class="small"
      height="400"
      :show-header="false"
      :columns="columns"
      :data="tableData"
      :noDataText="nodataimg"
    ></Table>
  </div>
</template>

<script>
export default {
  props: {
    type: Number,
    tableData: Array
  },
  computed: {
    nodataimg: () => `no data`,
    columns() {
      return [
        { title: '地域', key: 'city' },
        { title: '数量', key: 'value' },
        { title: '占比', key: 'percent' }
      ]
    }
  }
}
</script>

<style lang=less>
.table-scroll {
  .header {
    font-weight: bold;
    padding: 6px 16px;
    width: 100%;
  }
  .ivu-table-cell {
    text-align: center
  }
}
</style>
