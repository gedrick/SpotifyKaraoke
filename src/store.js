import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    token: null
  },
  song: {}
}

const mutations = {
  setUser (state, token) {
    Vue.set(state.user, 'token', token)
  },
  setSong (state, user) {
    Vue.set(state, 'user', user)
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
