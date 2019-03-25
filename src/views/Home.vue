<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <a v-if="!user.token" href="/auth/spotify">Sign in With Spotify</a>
    <div v-if="user.token">Welcome back!</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'home',
  methods: {
    ...mapMutations(['setUser'])
  },
  computed: {
    ...mapState(['user'])
  },
  beforeMount () {
    const token = this.$cookies.get('user.token')
    if (token) {
      this.setUser(token)
    }
  }
}
</script>
