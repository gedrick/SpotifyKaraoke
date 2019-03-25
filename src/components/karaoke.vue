<template>
  <div class="kararoke">
    Karaoke!
    <div v-if="song">{{song}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['song', 'lyrics'])
  },
  mounted () {
    this.$store.dispatch('getCurrentSong')
      .then(currentSong => {
        console.log('Current song returned:', currentSong)
      })
  }
}
</script>

<style lang="scss" scoped>
.karaoke {

}
</style>
