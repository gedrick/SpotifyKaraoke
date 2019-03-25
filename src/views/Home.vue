<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <a v-if="!token" href="/auth/spotify">Sign in With Spotify</a>
    <div v-if="token">Welcome back!</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'home',
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
