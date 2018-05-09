export const state = {
  userinfo: {},
  isShowSider: false,
  modal: {
    show: false,
    detail: {}
  }
}

export const getters = {
  userinfo: () => state.userinfo,
  isShowSider: () => state.isShowSider,
  modal: () => state.modal
}
