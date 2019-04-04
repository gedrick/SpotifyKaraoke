<template>
  <div class="progress-bar">
    <div class="progress-bar__title">{{ title }}</div>
    <div class="progress-bar__progress" :style="{ width: progress + '%'}">
      &nbsp;
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['song']),
    progress () {
      const progress = this.song.progress
      const duration = this.song.duration
      const percentage = (progress / duration) * 100
      return Math.round(percentage)
    },
    title () {
      return `${this.song.artist} - ${this.song.trackName}`
    }
  }
}
</script>


<style lang="scss">
.progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 30px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: #000000;

  &__title {
    z-index: 5;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

  &__progress {
    position: absolute;
    z-index: 4;
    transition-property: width;
    transition-duration: 0.2s;
    height: 100%;
    width: 55%;
    background-color: #1DB954;
  }
}
</style>
