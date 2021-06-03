import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  hideInterface: false,
  song: null,
  lyrics: null,
  settings: {
    scrollLyrics: true,
    autoRefresh: true
  }
};

const mutations = {
  toggleInterface(state) {
    state.hideInterface = !state.hideInterface;
  },
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
  getLyrics({ commit }, { artist, title }) {
    commit('setLyrics', {
      lyrics: ''
    });

    return new Promise((resolve, reject) => {
      axios
        .get(`/api/getLyrics?artist=${artist}&title=${title}`)
        .then((results) => {
          const lyrics = results.data.lyrics;

          if (!lyrics) {
            throw new Error('No lyrics found');
          }

          commit('setLyrics', {
            lyrics
          });

          resolve();
        })
        .catch((error) => {
          commit('setLyrics', {
            lyrics: null
          });
          reject(error);
        });
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
