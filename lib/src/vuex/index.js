import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowSider: false,
  modal: {
    show: false,
    detail: {}
  },
  userinfo: {}
}

const mutations = {
  showSider: (state, show) => { state.isShowSider = show },
  quit: state => {
    state.modal = {
      show: false,
      detail: {}
    }
  },
  modal: (state, modal) => {
    state.modal = modal
  },
  update: (state, {key, value}) => {
    // 更新状态机
    switch (key) {
      case 'userinfo':
        state.userinfo = value
        break
      default: throw Error('wrong key!')
    }
  }
}

const actions = {
  showSider: ({commit}, show) => { commit('showSider', show) },
  quit: ({commit}) => { commit('quit') },
  modal: ({commit}, modal) => { commit('modal', modal) },
  update: ({commit}, {key, value}) => { commit('update', {key, value}) }
}

const getters = {
  isShowSider: () => state.isShowSider,
  modal: () => state.modal,
  userinfo: () => state.userinfo
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
