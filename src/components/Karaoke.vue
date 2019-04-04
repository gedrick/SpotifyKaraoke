<template>
  <div class="kararoke" v-if="song && song.isPlaying">
    <div v-if="song">{{song.artist}} - {{song.trackName}} <span>{{song.progress}}</span></div>
    <div v-html="parsedLyrics"></div>
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
      trackName: null
    }
  },
  computed: {
    ...mapState(['song', 'lyrics']),
    parsedLyrics () {
      if (this.lyrics) {
        return this.lyrics.replace(/\n/g, '<br><br>')
      }
    }
  },
  beforeMount() {
    this.checkTrack();
  },
  mounted () {
    this.queryInterval = setInterval(() => {
      this.checkTrack();
    }, 3000);
  },
  methods: {
    checkTrack() {
      this.$store.dispatch('getCurrentSong')
    }
  },
  watch: {
    song: function (value) {
      if (value.artist && value.trackName
          && value.artist !== this.artist
          && value.trackName !== this.trackName) {
        this.artist = value.artist
        this.trackName = value.trackName

        this.$store.dispatch('getLyrics', {
          query: `${this.song.artist} ${this.song.trackName}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.karaoke {

}
</style>
