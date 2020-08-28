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
      @touchstart="handleLyricDrag"
      @touchend="handleLyricDrag"
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

      positionModifier: 0,
      notListening: true,
      fetchingLyrics: false,
      userIsDraggingLyrics: false
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
    handleLyricDrag(event) {
      this.userIsDraggingLyrics = event.type === 'touchstart';
    },
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
          } else if (
            this.settings.scrollLyrics &&
            this.$refs.lyricContainer &&
            !this.userIsDraggingLyrics
          ) {
            // const box = this.$refs.lyricContainer;
            // // Remove the upper padding.
            // const totalHeight = box.scrollHeight * 0.7;
            // const newPosition = Math.round(
            //   totalHeight * (this.songPercentage / 100)
            // );
            this.scrollLyricsToPosition();
          }
        }
      }, interval);
    },
    scrollLyricsToPosition() {
      const pos = this.$refs.lyricContainer.scrollTop;
      const adjustment = this.calculateScrollAdjustment();
      this.$refs.lyricContainer.scrollTop = pos + adjustment;
    },
    calculateScrollAdjustment() {
      const lyricsBox = this.$refs.lyricContainer;
      const heightOfLyrics = lyricsBox.offsetHeight;
      const heightOfLyricPadding = window.innerHeight * 0.4; // 30vh up and down
      const totalLyricHeight = heightOfLyrics - heightOfLyricPadding;

      const secondsInSong = this.song.duration / 1000;
      const pixelsPerSecond = Math.ceil(totalLyricHeight / secondsInSong);
      const finalAdjustment = pixelsPerSecond * 4; // runs every two seconds
      return finalAdjustment;
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
      handler: async function(value) {
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
          let trackName = this.song.trackName;

          trackName = trackName.replace(/remaster(?:ed)? \d{2,4}/i, '');
          trackName = trackName.replace(/\d{2,4} remaster(?:ed)?/i, '');
          trackName = trackName.replace(/remaster(?:ed)?/i, '');

          this.getLyrics({
            query: `${this.song.artist} ${trackName}`
          }).then(() => {
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
