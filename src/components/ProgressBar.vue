<template>
  <div
    class="progress-bar"
    :class="{ hovered: isHovered }"
    v-if="song && song.isPlaying"
    @mousemove="onMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="onMouseLeave"
    @click="progressBarClicked"
  >
    <div class="progress-bar__title">{{ title }}</div>
    <div
      v-if="settings.autoRefresh"
      class="progress-bar__progress"
      :style="{ width: isHovered ? `${hoverSpace}px` : progress + '%' }"
    >
      &nbsp;
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      hoverSpace: 0,
      isHovered: false
    };
  },
  methods: {
    ...mapActions(['seekToPosition']),
    onMouseLeave() {
      this.isHovered = false;
      this.hoverSpace = 0;
    },
    onMouseMove(event) {
      this.hoverSpace = event.clientX;
    },
    async progressBarClicked(event) {
      const fullWidth = window.innerWidth;
      const clickPosition = event.clientX;
      const percentage = clickPosition / fullWidth;
      const position = Math.round(this.song.duration * percentage);
      await this.seekToPosition({ position });
      this.onMouseLeave();
    }
  },
  computed: {
    ...mapState(['song', 'settings']),
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
@import '@/styles/variables.scss';

.progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;

  width: 100%;
  height: 70px;
  z-index: 4;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: rgba(41, 125, 41, 0.2);

  &__title {
    pointer-events: none;
    z-index: 5;
    color: $white;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    width: 100%;

    @media (min-width: 650px) {
      font-size: 18px;
    }
  }

  &__progress {
    pointer-events: none;
    position: absolute;
    z-index: 4;
    transition-property: width;
    transition-duration: 0.2s;
    height: 100%;
    width: 55%;
    background-color: $green;

    .hovered & {
      background-color: #1db95457;
    }
  }
}
</style>
