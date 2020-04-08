<template>
  <div class="signin">
    <h1>Spotify Karaoke</h1>
    <h3>Instant lyrics for whatever you're listening to!</h3>
    <div class="signin-login">
      <a href="/auth/spotify">
        <button href="/auth/spotify">
          <span>Sign in With Spotify</span>
        </button>
      </a>
    </div>
    <div class="signin-info">
      <p>
        Note: by signing into this site with your Spotify account,
        we will receive absolutely
        <i>no</i> personal information. The only permission scope
        required for this service is
        <b>
          <a
            href="https://developer.spotify.com/documentation/general/guides/scopes/#user-read-playback-state"
            target="_blank"
          >user-read-playback-state</a>
        </b>
        for the purpose of fetching the song you are currently listening to. For more
        information, please see the rest of the
        <a
          href="https://developer.spotify.com/documentation/general/guides/scopes/"
          target="_blank"
        >Spotify API documentation</a>.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signin {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
}

.signin-login {
  button {
    background-color: #1db954;
    border-radius: 0;
    border-style: none;
    padding: 15px;
    cursor: pointer;
  }

  span {
    font-size: 20px;
    color: #fff;
  }
}

.signin-info {
  font-size: 14px;
  max-width: 50%;
  align-self: center;
}
</style>
