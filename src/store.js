import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  song: null,
  lyrics: null,
  album: null
}

const mutations = {
  setSong (state, { song }) {
    Vue.set(state, 'song', song)
  },
  setLyrics (state, { lyrics, album }) {
    Vue.set(state, 'lyrics', lyrics)
    Vue.set(state, 'album', album)
  }
}

const actions = {
  getCurrentSong ({ commit }) {
    return axios.get('/api/getCurrentSong')
      .then(data => {
        console.log('got result', data)
        if (!data.data.result) {
          throw new Error();
        }

        const result = data.data.result.body
        let songData
        if (result.is_playing) {
          songData = {
            album: result.item.album.name,
            artist: result.item.artists[0].name,
            trackName: result.item.name,
            progress: result.progress_ms,
            duration: result.item.duration_ms,
            isPlaying: true
          }
        } else {
          songData = null
        }
        commit('setSong', { song: songData })
      })
      .catch(() => {
        commit('setSong', { song: null })
      })
  },
  getLyrics ({ commit }, { query }) {
    console.log('getLyrics', query)
    return axios.get(`/api/getLyrics?query=${query}`)
      .then(trackData => {
        const data = trackData.data
        const album = data.album
        const lyrics = data.lyrics
        console.log('got lyrics:', data)

        commit('setLyrics', {
          album,
          lyrics
        })
      })
      .catch(error => {
        console.log('something broke!', error)
      })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
