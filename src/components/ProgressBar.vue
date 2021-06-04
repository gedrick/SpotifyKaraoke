<template>
  <div
    class="progress-bar"
    :class="{ hovered: isHovered }"
    v-if="song && song.isPlaying"
    @mouseenter="isHovered = true"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @touchstart="isHovered = true"
    @click="progressBarClicked"
  >
    <div class="control-container">
      <div
        class="previous"
        @click="skipPrevious"
        @mouseenter="isHovered = false"
      >
        <span class="icon icon-to-start"></span>
      </div>
      <div class="title">{{ title }}</div>
      <div class="next" @click="skipNext" @mouseenter="isHovered = false">
        <span class="icon icon-to-end"></span>
      </div>
    </div>
    <div
      v-if="settings.autoRefresh"
      class="progress"
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
    ...mapActions(['seekToPosition', 'previous', 'next']),
    skipPrevious(event) {
      this.isHovered = false;
      event.stopPropagation();
      this.previous();
    },
    skipNext(event) {
      this.isHovered = false;
      event.stopPropagation();
      this.next();
    },
    onMouseLeave() {
      this.isHovered = false;
      this.hoverSpace = 0;
    },
    onMouseMove(event) {
      this.hoverSpace = event.clientX;
    },
    async progressBarClicked(event) {
      if (!this.isHovered) {
        return;
      }
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

  .title {
    pointer-events: none;
    z-index: 5;
    color: $white;
    font-weight: bold;
    text-align: center;
    line-height: 1.3;
    padding: 0 10px;
    font-size: 14px;
    width: 80%;

    @media (min-width: 450px) {
      width: 70%;
    }

    @media (min-width: 650px) {
      font-size: 18px;
    }
  }

  .control-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    height: 100%;
    width: 100%;
  }

  .previous,
  .next {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    width: 15%;
    height: 100%;
    z-index: 6;
    color: $white;

    @media (min-width: 450px) {
      width: 10%;
    }

    span {
      text-shadow: 0px 0px 10px black;
      transition-duration: 0.25s;
      transition-property: text-shadow;
      cursor: pointer;
    }

    &:hover span {
      text-shadow: 0px 0px 20px black;
    }
    &:active span {
      text-shadow: none;
    }
  }

  & .progress {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    transition-property: width;
    transition-duration: 0.2s;
    height: 100%;
    background-color: $green;
  }

  &.hovered .progress {
    background-color: #1db95457;
    transition-property: none;
    transition-duration: 0.2s;
  }
}
</style>
