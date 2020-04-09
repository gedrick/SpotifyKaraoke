<template>
  <div class="progress-bar" v-if="song && song.isPlaying">
    <div class="progress-bar__title">{{ title }}</div>
    <div class="progress-bar__progress" :style="{ width: progress + '%'}">&nbsp;</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['song']),
    progress() {
      const progress = this.song.progress;
      const duration = this.song.duration;
      const percentage = (progress / duration) * 100;
      return Math.round(percentage);
    },
    title() {
      return `${this.song.artist} - ${this.song.trackName}`;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

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

  background-color: rgba(41, 125, 41, 0.2);

  &__title {
    z-index: 5;
    color: $white;
    font-weight: bold;
    text-align: center;
    font-size: 10px;
    width: 100%;

    @media (min-width: 650px) {
      font-size: 14px;
    }
  }

  &__progress {
    position: absolute;
    z-index: 4;
    transition-property: width;
    transition-duration: 0.2s;
    height: 100%;
    width: 55%;
    background-color: $green;
  }
}
</style>
