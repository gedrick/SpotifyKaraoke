<template>
  <div class="home">

<TopMenu />
    <div
      v-if="!song && notListening"
      class="home__not-listening"
    >
      You're signed in, but not listening to anything.
    </div>
    <div class="home__status" v-if="fetchingLyrics">
      Fetching lyrics...
      <p>for <span>
        {{ song.trackName }}
      </span> by <span>
        {{ song.artist}}
      </span></p>
    </div>
    <div class="home__lyrics" v-if="!fetchingLyrics && song && song.isPlaying">
      <Karaoke />
      <ProgressBar />
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import Karaoke from '@/components/Karaoke.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    TopMenu,
    Karaoke,
    ProgressBar
  },
  data() {
    return {
      queryTimer: null,

      notListening: true,
      fetchingSong: false,
      fetchingLyrics: false
    };
  },
  computed: {
    ...mapState(['song', 'lyrics']),
    isLoggedIn() {
      return this.$cookies.get('loggedIn');
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async checkTrack() {
      console.log('checkTrack');

      try {
        await this.$store.dispatch('getCurrentSong');
      } catch (err) {
        // There is an error communicating with Spotify; force login.
        console.log('failed');
        window.location = '/logout';
      }
    },
    startTimer(interval) {
      if (this.isLoggedIn) {
        this.queryTimer = setInterval(() => {
          if (this.isLoggedIn) {
            this.checkTrack();
          }
        }, interval);
      }
    }
  },
  beforeMount() {
    this.checkTrack();
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push({ path: 'login' });
    }
    this.startTimer(2000);
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
          this.startTimer(2000);
        } else if (
          value.artist &&
          value.trackName &&
          value.artist !== this.artist &&
          value.trackName !== this.trackName
        ) {
          this.startTimer(6000);

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
@import '@/styles/variables.scss';

.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__lyrics {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  &__not-listening {
    font-size: 28px;
  }

  &__logout {
    position: fixed;
    bottom: 0;
    font-size: 18px;

    a:hover {
      color: $white;
    }
  }

  &__status {
    font-size: 48px;
    color: $white;

    p {
      font-size: 14px;
    }

    span {
      color: $purple;
      font-weight: bold;
    }
  }
}
</style>
