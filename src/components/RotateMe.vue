<template>
  <div class="rotate-me">
    <div class="container">
      <h2>Rotate to portrait mode!</h2>
      <span class="icon icon-cw"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.rotate-me {
  display: none;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: $black;
  justify-content: center;

  @media (hover: none) and (orientation: portrait) {
    display: flex;
  }
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
}

.icon {
  font-size: 50px;
}
</style>
