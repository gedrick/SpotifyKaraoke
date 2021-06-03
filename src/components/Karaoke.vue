<template>
  <div class="karaoke" v-if="song && song.isPlaying" @click="toggleInterface">
    <div class="gradient top"></div>
    <div
      v-if="lyrics && !songHasNoLyrics"
      class="karaoke__lyrics"
      v-html="parsedLyrics">
    </div>
    <div
      v-if="songHasNoLyrics"
      class="karaoke__no-lyrics">
      Sorry, this song doesn't have lyrics
    </div>
    <div class="gradient"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Karaoke',
  data() {
    return {
      artist: null,
      trackName: null
    };
  },
  computed: {
    ...mapState(['song', 'lyrics']),
    parsedLyrics() {
      if (this.lyrics) {
        return this.lyrics.replace(/\n/g, '<br>');
      }
      return false;
    },
    songHasNoLyrics() {
      if (this.song.isPlaying && this.song.duration > 0) {
        if (!this.lyrics) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    ...mapMutations(['toggleInterface'])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.karaoke {
  padding: 30vh 0;
  z-index: 4;

  &__lyrics {
    font-size: 20px;
    margin-bottom: 30px;

    @media (min-width: 650px) {
      font-size: 40px;
    }
  }

  &__no-lyrics {
    font-size: 48px;
    color: $white;
  }
}

.gradient {
  z-index: 3;
  height: 20vh;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  position: absolute;
  bottom: 0;
  pointer-events: none;

  &.top {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    bottom: unset;
    top: 0;
  }
}
</style>
