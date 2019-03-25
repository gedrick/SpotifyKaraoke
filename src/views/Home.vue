<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <a v-if="!user" href="/auth/spotify">Sign in With Spotify</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    mapGetters
  }
}
</script>
