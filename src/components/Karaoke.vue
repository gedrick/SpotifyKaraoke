<template>
  <div class="kararoke" v-if="song && song.isPlaying">
    <div class="karaoke__loading" v-if="isLoading">
      Fetching lyrics...
    </div>
    <div class="karaoke__lyrics" v-html="parsedLyrics" v-if="!isLoading"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Karaoke',
  data () {
    return {
      queryInterval: null,
      queryTimeout: 3000,

      artist: null,
      trackName: null,

      isLoading: true
    }
  },
  computed: {
    ...mapState(['song', 'lyrics']),
    parsedLyrics () {
      if (this.lyrics) {
        return this.lyrics.replace(/\n/g, '<br><br>')
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.karaoke {

  &__loading {
    font-size: 48px;
    color: #ffffff;
  }
}
</style>
