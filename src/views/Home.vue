<template>
  <div class="home">
    <TopMenu />
    <div
      v-if="!song && notListening && settings.autoRefresh"
      class="home__not-listening"
    >
      You're signed in to Spotify, but not listening to anything.<br><br>Start
      listening on any device - your phone, tablet, or desktop!
    </div>
    <div class="home__status" v-if="fetchingLyrics">
      Fetching lyrics...
      <p>
        for
        <span>{{ song.trackName }}</span> by
        <span>{{ song.artist}}</span>
      </p>
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
    ...mapState(['song', 'lyrics', 'settings']),
    isLoggedIn() {
      return this.$cookies.get('loggedIn');
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    startInterval(interval) {
      window.clearInterval(this.queryTimer);
      this.queryTimer = setInterval(() => {
        if (this.isLoggedIn && this.settings.autoRefresh) {
          this.$store.dispatch('getCurrentSong');
        }
      }, interval);
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push({ path: 'login' });
    }
    this.startInterval(2000);
  },
  beforeDestroy() {
    window.clearTimeout(this.queryTimer);
  },
  watch: {
    song: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          this.notListening = true;
          this.startInterval(2000);
          this.fetchingSong = false;
          this.fetchingLyrics = false;
        } else if (
          value.artist &&
          value.trackName &&
          (value.artist !== this.artist ||
          value.trackName !== this.trackName)
        ) {
          this.startInterval(6000);
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
@import "@/styles/variables.scss";

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
    max-width: 50%;
    @media (min-width: 650px) {
      font-size: 28px;
    }
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
