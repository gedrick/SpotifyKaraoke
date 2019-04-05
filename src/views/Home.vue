<template>
  <div class="home">
    <div class="home__login">
      <a v-if="!token" href="/auth/spotify">Sign in With Spotify</a>
    </div>

    <div class="home__not-listening" v-if="token && (!song || !song.isPlaying)">
      You're signed in, but not listening to anything.<br>
      <a href="/logout">Logout</a>
    </div>

    <div v-if="song && song.isPlaying">
      <Karaoke/>
      <ProgressBar/>
    </div>

    <div class="home__logout">

    </div>
  </div>
</template>

<script>
import Karaoke from '@/components/Karaoke.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Karaoke,
    ProgressBar
  },
  data () {
    return {
      token: null,

      queryInterval: 2000
    }
  },
  computed: {
    ...mapState(['song'])
  },
  methods: {
    ...mapMutations(['setUser']),
    checkTrack () {
      this.$store.dispatch('getCurrentSong')
    }
  },
  beforeMount () {
    this.checkTrack()
  },
  mounted () {
    this.token = this.$cookies.get('user.token')
    if (this.token) {
      this.queryInterval = setInterval(() => {
        this.checkTrack()
      }, this.queryInterval)
    }
  },
  watch: {
    song: function (value) {
      if (value.artist && value.trackName &&
          value.artist !== this.artist &&
          value.trackName !== this.trackName) {
        this.artist = value.artist
        this.trackName = value.trackName

        this.isLoading = true
        this.$store.dispatch('getLyrics', {
          query: `${this.song.artist} ${this.song.trackName}`
        }).then(() => {
          this.isLoading = false
          this.queryInterval = 5000
        })
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  &__not-listening {
    font-size: 28px;
  }

  &__logout {
    position: fixed;
    bottom: 0;

  }
}
</style>
