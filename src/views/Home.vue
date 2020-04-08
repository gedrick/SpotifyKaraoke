<template>
  <div class="home">
    <SignIn v-if="!token" />
    <div class="home__not-listening" v-if="token">
      You're signed in, but not listening to anything.<br />
      <a href="/logout">Logout</a>
    </div>

    <div class="home__status" v-if="checkStep === 1 && !song">
      Fetching your current song...
    </div>
    <div class="home__status" v-if="checkStep === 2 && !lyrics && isLoading">
      Fetching lyrics...
    </div>

    <div v-if="song && song.isPlaying">
      <Karaoke />
      <ProgressBar />
    </div>
  </div>
</template>

<script>
import Karaoke from '@/components/Karaoke.vue';
import SignIn from '@/components/SignIn.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Karaoke,
    SignIn,
    ProgressBar
  },
  data() {
    return {
      queryInterval: null,
      queryTimeout: 3000,

      token: null,
      checkStep: 0
    };
  },
  computed: {
    ...mapState(['song', 'lyrics'])
  },
  methods: {
    ...mapMutations(['setUser']),
    checkTrack() {
      this.$store.dispatch('getCurrentSong');
    }
  },
  beforeMount() {
    this.checkTrack();
  },
  mounted() {
    this.token = this.$cookies.get('user.token');
    if (this.token) {
      this.checkStep = 1;
      this.queryInterval = setInterval(() => {
        this.checkTrack();
      }, this.queryTimeout);
    }
  },
  watch: {
    song: function(value) {
      if (
        value &&
        value.artist &&
        value.trackName &&
        value.artist !== this.artist &&
        value.trackName !== this.trackName
      ) {
        console.log('found new track playing');
        this.checkStep = 2;

        this.artist = value.artist;
        this.trackName = value.trackName;

        this.isLoading = true;
        this.$store
          .dispatch('getLyrics', {
            query: `${this.song.artist} ${this.song.trackName}`
          })
          .then(() => {
            this.checkStep = 0;
          });
      }
    }
  }
};
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

  &__status {
    font-size: 48px;
    color: #ffffff;
  }
}
</style>
