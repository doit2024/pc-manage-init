import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  isSidebar: false,
  isModal: false
}

const mutations = {
  showSidebar: (state, show) => {
    state.isSidebar = show
  },
  showModal: (state, show) => {
    state.isModal = show
  },
  update: (state, data) => {
    const { key, value } = data
    if (!key || !value) throw Error('update格式： {key: xx, value: xxx}')
    state[key] = value
  }
}

const actions = {
  showSidebar: ({commit}, show) => { commit('showSidebar', show) },
  showModal: ({commit}, show) => { commit('showModal', show) },
  update: ({commit}, data) => { commit('update', data) }
}

const getters = {
  isSidebar: () => state.isSidebar,
  isModal: () => state.isModal
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
