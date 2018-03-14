export default {
  showSider: ({commit}, show) => { commit('showSider', show) },
  quit: ({commit}) => { commit('quit') },
  modal: ({commit}, modal) => { commit('modal', modal) },
  update: ({commit}, {key, value}) => { commit('update', {key, value}) }
}
