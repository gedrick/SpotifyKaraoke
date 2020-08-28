<template>
  <div class="top-menu" :class="{hidden: hideInterface}">
    <ul>
      <li v-if="isLoggedIn">
        <a @click="showModal('settings')">Settings</a>
      </li>
      <li>
        <a @click="showModal('about')">About</a>
      </li>
      <li>
        <a @click="showModal('bookmark')">Bookmark</a>
      </li>
      <li>
        <a @click="showModal('privacy')">Privacy</a>
      </li>
      <li v-if="isLoggedIn">
        <a href="/logout">Logout</a>
      </li>
    </ul>
    <button
      v-if="isLoggedIn && !settings.autoRefresh"
      class="action"
      @click="$store.dispatch('getCurrentSong')"
      href="/auth/spotify"
    >
      <span>Get Lyrics</span>
    </button>
    <button
      v-if="isLoggedIn && settings.autoRefresh"
      class="action"
      :class="{disabled: !settings.scrollLyrics}"
      @click="toggleSetting('scrollLyrics')"
    >
      <span>
        <input type="checkbox" v-model="settings.scrollLyrics" />Autoscroll
      </span>
    </button>
    <button
      v-if="isLoggedIn && results.length > 1"
      class="action more-results"
      @click="nextActiveLyricResult()"
    >
      <span>
        More ({{activeLyricResult + 1}}/{{results.length}})
      </span>
    </button>
    <div class="modal-container" :class="{hidden: modal === ''}">
      <div class="modal about" :class="{visible: modal === 'about'}">
        <div class="modal-close" @click="showModal()">x</div>
        <p>
          Hey there! Thanks for checking out
          <span>SpotifyKaraoke</span>.
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
          <span>SpotifyKaraoke</span> was born.
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
      <div class="modal bookmark" :class="{visible: modal === 'bookmark'}">
        <div class="modal-close" @click="showModal()">x</div>
        <h4>Adding SpotifyKaraoke to your iOS Home Screen</h4>
        <p>
          Here's a neat way to get instant lyrics - add it to your
          home screen. That way, you have one-button access to lyrics
          for whatever it is you're listening to.
        </p>
        <b>Step 1</b><br>
        <p>
          Open SpotifyKaraoke in Safari.
        </p>
        <b>Step 2</b><br>
        <p>
          Click the <i>Share</i> button.<br>
          <img src="/share.png">
        </p>
        <b>Step 3</b><br>
        <p>
          Click <i>Add to Home Screen</i>.<br>
          <img src="/add-to-home.png">
        </p>
        <b>Step 4</b><br>
        <p>
          All done! You now have a one-tap icon to instant lyrics.<br>
          <img src="/icon.png">
        </p>
      </div>
      <div class="modal privacy" :class="{visible: modal === 'privacy'}">
        <div class="modal-close" @click="showModal()">x</div>
        <h4>tl;dr</h4>
        <p>
          SpotifyKaraoke is a small utility project specifically built out
          of need. I can't stand companies selling my data any less than you
          do, so the minimal amount
          of information collected is purely for site functionality.
          SpotifyKaraoke is merely a side project for a full time
          developer. In fact the whole thing is open source, so if you don't
          trust that I'm not stealing your identity, feel free to look at
          <a href="https://github.com/gedrick/SpotifyKaraoke" target="_blank">
          the source code</a> :)
        </p>
        <p>
          Thanks for reading, and I  truly hope you get as much use out
          of it as I do!  -Gedrick
        </p>
        <h4>Cookie Usage</h4>
        <p>
          There are three cookies set on SpotifyKaraoke, all of which are
          used solely for managing your logged-in status:
        </p>
        <p>
          <b>isLoggedIn:</b> convenience cookie so the app
          knows you are logged in, so it may forward you to the right
          page.
        </p>
        <p>
          <b>user.token:</b> passed back from Spotify (httponly) and used
          to query Spotify and find your current track.
        </p>
        <p>
          <b>user.refresh:</b> passed back from Spotify (httponly) and
          used to refresh your token in the event that your token times out.
        </p>
        <h4>Tracking</h4>
        <p>
          A non-invasive tracker is used purely
          to see how many people are using the site. This is
          used to determine if it's worth the time of upkeep. The service
          used is
          <a
            href="https://www.goatcounter.com/"
            target="_blank"
          >GoatCounter</a> which does not track any personally identifiable
          information. Read their privacy policy
          <a
            href="https://www.goatcounter.com/privacy"
            target="_blank"
          >here</a>.
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
          <br />This will continuously ping Spotify to see what you're
          listening to. Turning off this feature will disable
          <b>Karaoke Mode</b> and will
          prevent SpotifyKaraoke from automatically grabbing lyrics when a new
          song starts to play.
          <br />
          <br />However, it will show a button to manually update the
          lyrics to match your current song.
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
    ...mapState(['settings', 'results', 'activeLyricResult', 'hideInterface']),
    isLoggedIn() {
      return this.$cookies.get('loggedIn');
    }
  },
  methods: {
    ...mapMutations(['toggleSetting', 'nextActiveLyricResult']),
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

  opacity: 1;
  transition-property: opacity;
  transition-duration: 0.5s;
  &.hidden {
    opacity: 0;
  }
}

ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  &.vertical {
    flex-direction: column;
  }
  li:not(:last-of-type) {
    margin-right: 15px;
    cursor: pointer;
  }
  li {
    cursor: pointer;
  }
}

button.more-results {
  position: fixed;
  bottom: 90px;
}
</style>
