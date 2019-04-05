<template>
  <div class="kararoke" v-if="song && song.isPlaying">
    <div
      class="karaoke__lyrics"
      v-html="parsedLyrics"
      v-if="lyrics">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Karaoke',
  data () {
    return {
      artist: null,
      trackName: null
    }
  },
  computed: {
    ...mapState(['song', 'lyrics']),
    parsedLyrics () {
      if (this.lyrics) {
        return this.lyrics.replace(/\n/g, '<br><br>')
      }
      return false
    }
  }
}
</script>