import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  modal: {
    show: false,
    name: '',
    detail: {}
  },
  menu: []
}

const mutations = {
  quit: state => {
    state.modal = {
      show: false,
      name: '',
      detail: {}
    }
    state.menu = []
  },
  modal: (state, modal) => {
    state.modal = modal
  },
  update: (state, key) => {
    switch (key) {
      case 'menu':
        // Vue.prototype.$http.api().then(fnHandle)
        break
      default: throw Error('wrong key!')
    }
  }
}

const actions = {
  quit: ({commit}) => { commit('quit') },
  modal: ({commit}, modal) => { commit('modal', modal) },
  update: ({commit}, key) => { commit('update', key) }
}

const getters = {
  modal: () => state.modal,
  menu: () => state.menu
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
