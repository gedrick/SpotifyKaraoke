<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <a v-if="!token" href="/auth/spotify">Sign in With Spotify</a>
    <div v-if="token">Welcome back!</div>
    <Karaoke v-if="token"/>
  </div>
</template>

<script>
import Karaoke from '@/components/karaoke.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    Karaoke
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
