<template>
  <div class="kararoke" v-if="song && song.isPlaying">
    Karaoke!
    <div v-if="song">{{song.artist}} - {{song.trackName}} <span>{{song.progress}}</span></div>
    <button @click="getLyrics">Get Lyrics</button>
    <div v-html="lyrics"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Karaoke',
  data () {
    return {
      queryInterval: null,
      queryTimeout: 3000
    }
  },
  computed: {
    ...mapState(['song', 'lyrics'])
  },
  mounted () {
    this.startQueryInterval()
  },
  methods: {
    startQueryInterval () {
      this.queryInterval = setInterval(this.sendQuery, this.queryTimeout)
    },
    sendQuery () {
      this.$store.dispatch('getCurrentSong')
    },
    getLyrics () {
      this.$store.dispatch('getLyrics', {
        query: `${this.song.artist} ${this.song.trackName}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.karaoke {

}
</style>
