<template>
  <div class="login">
    <TopMenu />
    <div class="text">
      <div class="inner">
        <h1>Spotify Karaoke</h1>
        <h3>Instant lyrics for whatever you're listening to!</h3>
        <div class="signin-login">
          <a href="/auth/spotify">
            <button class="action" href="/auth/spotify">
              <span>Sign in with Spotify</span>
            </button>
          </a>
        </div>
        <div class="signin-info">
          <p>
            Note: by signing into this site with your Spotify account, we will
            receive absolutely
            <i>no</i> personal information. Click the <b>Privacy</b> link to
            learn more about the required permissions, or read the
            <a
              href="https://developer.spotify.com/documentation/general/guides/scopes/"
              target="_blank"
              >Spotify API documentation</a
            >.
          </p>
        </div>
      </div>
    </div>
    <div
      class="image"
      :style="{ backgroundImage: 'url(\'/background-image.png\')' }"
    ></div>
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
export default {
  components: {
    TopMenu
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;

  @media (min-width: 1024px) {
    display: flex;
  }
}

.inner {
  display: grid;
  justify-self: center;
  align-self: center;
  padding-top: 20vh;

  @media (min-width: 450px) {
    max-width: 70%;
  }

  @media (min-width: 650px) {
    padding-top: 0;
    max-width: unset;
  }

  @media (min-width: 650px) {
    max-width: 50%;
  }
}

.text {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  z-index: 4;

  @media (min-width: 1024px) {
    margin-right: -20%;
  }
}

.image {
  z-index: 3;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.1;

  animation: glowAnimation;
  animation-duration: 10s;
  animation-iteration-count: infinite;

  @media (min-width: 650px) {
    margin-left: -20%;
    opacity: 0.5;
  }

  @media (min-width: 1024px) {
    margin-left: -0%;
  }
}

.text,
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 650px) {
    position: initial;
    top: unset;
    left: unset;
    width: 50%;
    height: auto;
  }
}

h1 {
  text-shadow: 7px 4px 1px black;
}

.signin-info {
  font-size: 14px;
  align-self: center;
  padding: 0 20px;

  @media (min-width: 650px) {
    padding: 0;
  }
}
</style>
