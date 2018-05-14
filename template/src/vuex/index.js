import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  isSidebar: false,
  modal: { show: false }
}

const mutations = {
  showSidebar: (state, show) => {
    state.isSidebar = show
  },
  modal: (state, obj) => {
    state.modal = obj
  },
  update: (state, data) => {
    const { key, value } = data
    if (!key || !value) throw Error('update格式： {key: xx, value: xxx}')
    state[key] = value
  }
}

const actions = {
  showSidebar: ({commit}, show) => { commit('showSidebar', show) },
  modal: ({commit}, obj) => { commit('modal', obj) },
  update: ({commit}, data) => { commit('update', data) }
}

const getters = {
  isSidebar: () => state.isSidebar,
  modal: () => state.modal
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
