<template>
  <div class="home">
    <TopMenu />
    <div v-if="!song && notListening" class="home__not-listening">
      You're signed in to Spotify, but not listening to anything.
      <br />
      <br />Start
      listening on any device - your phone, tablet, or desktop!
      <br><br>
      <p class="idle-mode" @click="getCurrentSong" v-if="idleMode">
        It looks like you're idle! Click here to wake up SpotifyKaraoke.
      </p>
    </div>
    <div class="home__status" v-if="fetchingLyrics">
      Fetching lyrics...
      <p>
        for
        <span>{{ song.trackName }}</span> by
        <span>{{ song.artist}}</span>
      </p>
    </div>
    <div
      v-if="!fetchingLyrics && song && song.isPlaying"
      ref="lyricContainer"
      class="home__lyrics">
      <Karaoke />
      <ProgressBar />
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import Karaoke from '@/components/Karaoke.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { mapMutations, mapState, mapActions } from 'vuex';

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
      idleCounter: 0,
      idleThreshold: 30,
      idleMode: false,

      notListening: true,
      fetchingLyrics: false
    };
  },
  computed: {
    ...mapState(['song', 'lyrics', 'settings']),
    songPercentage() {
      if (!this.song) {
        return 0;
      }
      const progress = this.song.progress;
      const duration = this.song.duration;
      const percentage = (progress / duration) * 100;
      return Math.round(percentage);
    },
    isLoggedIn() {
      return this.$cookies.get('loggedIn');
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['getCurrentSong', 'getLyrics']),
    startInterval(interval) {
      window.clearInterval(this.queryTimer);
      this.queryTimer = setInterval(async () => {
        if (this.settings.autoRefresh) {
          await this.getCurrentSong();
          if (!this.song && !this.idleMode) {
            this.idleCounter++;
            if (this.idleCounter >= this.idleThreshold) {
              this.idleMode = true;
              window.clearInterval(this.queryTimer);
            }
          } else if (this.settings.scrollLyrics && this.$refs.lyricContainer) {
            const box = this.$refs.lyricContainer;
            // Remove the upper padding.
            const totalHeight = box.scrollHeight * 0.7;
            const newPosition = Math.round(
              totalHeight * (this.songPercentage / 100)
            );
            this.scrollLyricsToPosition(newPosition);
          }
        }
      }, interval);
    },
    scrollLyricsToPosition(position) {
      // Enhance this to smooth out the scrolling.
      this.$refs.lyricContainer.scrollTop = position;
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
          this.fetchingLyrics = false;
        } else if (
          this.idleMode ||
          (
            value.artist &&
            value.trackName &&
            (value.artist !== this.artist || value.trackName !== this.trackName)
          )
        ) {
          // Reset all the idle counters.
          this.idleMode = false;
          this.idleCounter = 0;
          this.startInterval(2000);

          this.notListening = false;

          this.artist = value.artist;
          this.trackName = value.trackName;

          this.fetchingLyrics = true;
          this.getLyrics({
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
    scrollbar-color: $green $darkgray;
  }

  &__not-listening {
    font-size: 28px;
    max-width: 50%;
    @media (min-width: 650px) {
      font-size: 28px;
    }

    .idle-mode {
      font-size: 12px;
      cursor: pointer;
      color: $green;
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
