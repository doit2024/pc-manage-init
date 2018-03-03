<template>
  <DtSection :title="title">
    <div class="flexJS">
      <ButtonGroup>
        <Button :type="type==='added' ? theme : 'ghost'" @click="type='added'">单日增长</Button>
        <Button :type="type==='total_added' ? theme : 'ghost'" @click="type='total_added'">累计增长</Button>
      </ButtonGroup>
      <DtSelect name="days" :from="1" v-model="keys.type" style="width:180px" :class="theme"/>
    </div>
    <DtTrend :viewData="drawData" :color="color"/>
  </DtSection>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '趋势图'
    },
    theme: {
      type: String,
      default: 'primary',
      validator: v => ['primary', 'success'].includes(v)
    },
    keys: {
      type: Object,
      required: true
    },
    viewData: Array
  },
  data: () => ({
    type: 'added'
  }),
  computed: {
    color () {
      const colorMap = {
        'primary': '#1AA891',
        'success': '#8BC446'
      }
      return colorMap[this.theme]
    },
    added () {
      return {
        name: '单日增长',
        data: this.viewData.map(item => [this.toTimestamp(item.date), parseInt(item.added)])
      }
    },
    total_added () {
      return {
        name: '累计增长',
        data: this.viewData.map(item => [this.toTimestamp(item.date), parseInt(item.total_added)])
      }
    },
    drawData () {
      return this[this.type]
    }
  },
  methods: {
    toTimestamp (str) {
      return new Date(str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).getTime()
    }
  }
}
</script>

<style lang=less>
@import '../../style/var';
.success {
  &.ivu-select-visible .ivu-select-selection {
    border-color: @color-success;
  }
  .ivu-select-selection:hover {
    border-color: @color-success;
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover {
    background: @color-success;
  }
}
</style>
