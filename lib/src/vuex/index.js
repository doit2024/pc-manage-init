import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowSider: false,
  modal: {
    show: false,
    detail: {}
  }
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
      case 'key':
        // state.key = value
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
  modal: () => state.modal
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
