<template>
  <div class="home">
    <SignIn v-if="!token" />
    <div class="home__logout" v-if="token">
      <a href="/logout">Logout</a>
    </div>

    <div
      v-if="!song && notListening"
      class="home__not-listening"
    >You're signed in, but not listening to anything.</div>

    <div class="home__status" v-if="fetchingLyrics">Fetching lyrics...</div>

    <div v-if="song && song.isPlaying">
      <Karaoke />
      <ProgressBar />
    </div>
  </div>
</template>

<script>
import Karaoke from '@/components/Karaoke.vue';
import SignIn from '@/components/SignIn.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Karaoke,
    SignIn,
    ProgressBar
  },
  data() {
    return {
      queryInterval: null,
      queryTimeout: 3000,

      notListening: true,
      fetchingSong: false,
      fetchingLyrics: false,

      token: null
    };
  },
  computed: {
    ...mapState(['song', 'lyrics'])
  },
  methods: {
    ...mapMutations(['setUser']),
    checkTrack() {
      this.$store.dispatch('getCurrentSong');
    }
  },
  beforeMount() {
    this.checkTrack();
  },
  mounted() {
    this.token = this.$cookies.get('user.token');
    if (this.token) {
      this.checkStep = 1;
      this.queryInterval = setInterval(() => {
        this.checkTrack();
      }, this.queryTimeout);
    }
  },
  watch: {
    song: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          console.log('no song is currently playing');
          this.notListening = true;
          this.fetchingSong = false;
          this.fetchingLyrics = false;
        } else if (
          value.artist &&
          value.trackName &&
          value.artist !== this.artist &&
          value.trackName !== this.trackName
        ) {
          console.log('found new track playing');
          this.notListening = false;

          this.artist = value.artist;
          this.trackName = value.trackName;

          this.fetchingLyrics = true;
          this.$store
            .dispatch('getLyrics', {
              query: `${this.song.artist} ${this.song.trackName}`
            })
            .then(() => {
              this.fetchingLyrics = false;
            });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  &__logout {
    position: fixed;
    top: 0;
    left: 0;
    padding: 8px;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
  }

  &__not-listening {
    font-size: 28px;
  }

  &__logout {
    position: fixed;
    bottom: 0;
  }

  &__status {
    font-size: 48px;
    color: #ffffff;
  }
}
</style>
