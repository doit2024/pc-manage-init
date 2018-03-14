export default {
  showSider: (state, show) => { state.isShowSider = show },
  quit: state => {
    state.modal = {
      show: false,
      detail: {}
    }
    state.deviceConditionFilter = []
  },
  modal: (state, modal) => {
    state.modal = modal
  },
  update: (state, {key, value}) => {
    switch (key) {
      case 'userinfo':
        state.userinfo = value
        break
      default: throw Error('wrong key!')
    }
  }
}
