<template>
  <DtUiTrend :detail="detail"/>
</template>

<script>
export default {
  props: {
    name: String,
    themeColor: String,
    keys: Object,
    action: String
  },
  data: () => ({
    detail: {}
  }),
  watch: {
    keys: {
      handler (c) {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$http.homepage[this.action](this.keys).then(data => {
        this.detail = {
          color: this.themeColor,
          name: this.name,
          data: data.map(item => [this.toTimestamp(item.date), ~~item.revenue])
        }
      })
    },
    toTimestamp (str) {
      return new Date(str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).getTime()
    }
  }
}
</script>
