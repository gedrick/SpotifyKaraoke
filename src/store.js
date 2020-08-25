import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  song: null,
  lyrics: null,
  results: [],
  settings: {
    scrollLyrics: true,
    autoRefresh: true
  },
  activeLyricResult: 0
};

const getters = {
  currentLyrics(state) {
    if (state.results.length) {
      return state.results[state.activeLyricResult].lyrics || 0;
    }
    return false;
  }
};

const mutations = {
  toggleSetting(state, key) {
    const value = state.settings[key];
    Vue.set(state.settings, key, !value);
  },
  setSong(state, { song }) {
    Vue.set(state, 'song', song);
  },
  setLyrics(state, { lyrics }) {
    Vue.set(state, 'lyrics', lyrics);
    Vue.set(state, 'activeLyricResult', 0);
  },
  setAllLyricResults(state, { results }) {
    Vue.set(state, 'results', results);
  },
  nextActiveLyricResult(state) {
    let newIndex = 0;
    if (state.activeLyricResult < state.results.length) {
      newIndex = state.activeLyricResult + 1;
    }
    Vue.set(state, 'activeLyricResult', newIndex);
  }
};

const actions = {
  getCurrentSong({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/getCurrentSong')
        .then((response) => {
          const data = response.data;

          if (data.err) {
            return reject(data.err);
          }

          const result = data.result.body;
          let songData;
          if (result.is_playing) {
            songData = {
              album: result.item.album.name,
              artist: result.item.artists[0].name,
              trackName: result.item.name,
              progress: result.progress_ms,
              duration: result.item.duration_ms,
              isPlaying: true
            };
          } else {
            songData = null;
          }
          commit('setSong', { song: songData });
          return resolve();
        })
        .catch(() => {
          console.log('getCurrentSong failed');
          commit('setSong', {
            song: {
              isPlaying: false
            }
          });
          return resolve();
        });
    });
  },
  getLyrics({ commit }, { query }) {
    commit('setLyrics', {
      lyrics: ''
    });
    return axios
      .get(`/api/getLyrics?query=${query}`)
      .then((results) => {
        const trackData = results.data;
        const firstResult = trackData[0];
        const lyrics = firstResult.lyrics;

        if (!lyrics) {
          throw new Error();
        }

        commit('setLyrics', {
          lyrics
        });

        commit('setAllLyricResults', {
          results: results.data
        });
      })
      .catch(() => {
        commit('setLyrics', {
          lyrics: null
        });
      });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
