<template>
  <div class="home">
    <a v-if="!token" href="/auth/spotify">Sign in With Spotify</a>
    <div v-if="token">
      <Karaoke/>
      <ProgressBar/>
    </div>
  </div>
</template>

<script>
import Karaoke from '@/components/Karaoke.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    Karaoke,
    ProgressBar
  },
  data () {
    return {
      token: null
    }
  },
  methods: {
    ...mapMutations(['setUser'])
  },
  mounted () {
    this.token = this.$cookies.get('user.token')
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
