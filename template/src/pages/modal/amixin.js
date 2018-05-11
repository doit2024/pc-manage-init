import bus from '@/bus'

export default {
  props: ['modal', 'btns'],
  mounted () {
    this.btns.forEach(action => {
      bus.$on(`modal-${action}`, () => {
        this[action]()
      })
    })
  },
  destroyed () {
    this.btns.forEach(action => {
      bus.$off(`modal-${action}`)
    })
  },
  methods: {
    close () {
      this.$store.dispatch('modal', {show: false})
    },
    reset () {
      this.formData = {page: 1}
      this.submit()
    }
  }
}
