<template>
  <div class="kararoke" v-if="song && song.isPlaying">
    Karaoke!
    <div v-if="song">{{song.artist}} - {{song.trackName}} <span>{{song.progress}}</span></div>
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
    ...mapState(['song'])
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
    }
  }
}
</script>

<style lang="scss" scoped>
.karaoke {

}
</style>
