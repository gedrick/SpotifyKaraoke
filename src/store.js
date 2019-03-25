import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  song: null,
  lyrics: null
}

const mutations = {
  setSong (state, user) {
    Vue.set(state, 'user', user)
  },
  setLyrics (state, lyrics) {
    Vue.set(state, 'lyrics', lyrics)
  }
}

const actions = {
  getCurrentSong ({ commit }) {
    return axios.get('/api/getCurrentSong')
      .then(song => {
        console.log('song recevied:', song)
      })
  },
  getLyrics ({ commit }, title) {
    return axios.get('/api/getLyrics', {
      title
    }).then(lyrics => {
      console.log('got lyrics:', lyrics)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
