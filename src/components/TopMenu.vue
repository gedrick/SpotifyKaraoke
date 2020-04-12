<template>
  <div class="top-menu">
    <ul>
      <li>
        <a @click="showModal('settings')">Settings</a>
      </li>
      <li>
        <a @click="showModal('about')">About</a>
      </li>
      <li>
        <a @click="showModal('privacy')">Privacy</a>
      </li>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </ul>
    <button
      v-if="!settings.autoRefresh"
      class="action"
      @click="$store.dispatch('getCurrentSong')"
      href="/auth/spotify">
      <span>Get Lyrics</span>
    </button>
    <button
      v-if="settings.autoRefresh"
      class="action"
      :class="{disabled: !settings.scrollLyrics}"
      @click="toggleSetting('scrollLyrics')"
      href="/auth/spotify">
      <span>
        <input type="checkbox" v-model="settings.scrollLyrics">Karaoke Mode
      </span>
    </button>
    <div class="modal-container" :class="{hidden: modal === ''}">
      <div class="modal about" :class="{visible: modal === 'about'}">
        <div class="modal-close" @click="showModal()">x</div>
        <p>
          Hey there! Thanks for checking out
          <span>SpotifyKaraoke</span>!
        </p>
        <p>
          This site was born out of necessity - while listening
          to music, I often wanted to pull up lyrics. Unfortunately,
          lyric sites are typically packed with ads, malware, and
          overall aggravating features that took far too much time.
        </p>
        <p>
          What I wanted was a site that I could bookmark, and pull
          up at any time to see lyrics to whatever I was listening
          to at the time. And thus,
          <span>SpotifyKaraoke</span> was born!
        </p>
        <p>
          <b>Question: why doesn't the site auto-scroll?</b>
          <br />A great question. You might remember that Spotify had a
          service baked right into the app that relied on Musixmatch
          for their karaoke feature. Presumably the licensing got to
          be too expensive, so they nixed it. Unfortunately that's the
          only source for timestamped lyrics, and it would cost a lot
          of money to bring it back. So until it magically becomes
          free, this is the only option.
        </p>
        <p>
          The site is written in Vuejs with Node on the backend. It
          is open-source. Check out the Github page
          <a
            href="https://github.com/gedrick/SpotifyKaraoke"
            target="_blank"
          >here</a>. It uses the Spotify API and
          <a
            href="https://genius.com/developers"
            target="_blank"
          >Genius</a> for fetching
          the lyrics.
        </p>
      </div>
      <div class="modal privacy" :class="{visible: modal === 'privacy'}">
        <div class="modal-close" @click="showModal()">x</div>
        <p>
          <b>tl;dr:</b> SpotifyKaraoke is a utility site that does not
          collect, view, retain, or in any way store your personal data.
          Logging in with your Spotify account provides a token which
          gets passed between the browser and the server to make requests
          on your behalf. In this case, to retrieve your currently playing
          track, and nothing else.
        </p>
        <p>
          <b>Tracking:</b> a non-invasive tracking program is used purely
          to see how many people are actually using the site. This is
          used to determine if it's worth the time of upkeep. The service
          used is
          <a href="https://www.goatcounter.com/" target="_blank">GoatCounter</a> which does not track any personally identifiable
          information. Read their privacy policy
          <a href="https://www.goatcounter.com/privacy" target="_blank">here</a>.
        </p>
      </div>
      <div class="modal settings" :class="{visible: modal === 'settings'}">
        <div class="modal-close" @click="showModal()">x</div>
        <p>
          <input
          type="checkbox"
          v-model="settings.autoRefresh"
          name="autoRefresh"
          id="autoRefresh" />
          <label for="autoRefresh">&nbsp;Auto-Refresh</label>
          <br>
          This will continuously ping Spotify to see what you're listening to.
          Turning off this feature will disable <b>Karaoke Mode</b> and will
          prevent SpotifyKaraoke from automatically grabbing lyrics when a new
          song starts to play.<br><br>
          However, it will show a button to manually update the lyrics to match
          your current song.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      modal: ''
    };
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    ...mapMutations(['toggleSetting']),
    showModal(modalName) {
      this.modal = modalName || '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  transition-duration: 0.3s;
  transition-property: opacity;
  background-color: rgba($darkgray, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .modal {
    display: none;
    position: relative;
    z-index: 5;
    overflow: auto;
    align-self: center;
    justify-self: center;
    background-color: $darkgray;
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 2px solid $black;
    box-shadow: 10px 10px 0px 0px $black;
    font-weight: normal;
      text-align: left;

    span {
      color: $green;
    }

    &.visible {
      display: block;
    }

    @media (min-width: 650px) {
      width: 50vh;
      height: 50vh;
    }
  }

  .modal-close {
    position: absolute;
    top: 0;
    right: 7px;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
  }
}

.top-menu {
  z-index: 5;
  position: fixed;
  top: 0;
  right: 0;
  padding: 8px;
  font-weight: bold;
  text-align: center;
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

ul {
  display: flex;
  flex-direction: row;
  list-style: none;

  li:not(:last-of-type) {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
