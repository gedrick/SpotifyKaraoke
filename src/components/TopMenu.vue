<template>
  <div class="top-menu">
    <ul>
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
    <div class="modal-container" :class="{hidden: modal === ''}">
      <div class="modal-close">[x]</div>
      <div class="modal about" :class="{visible: modal === 'about'}"></div>
      <div class="modal privacy" :class="{visible: modal === 'privacy'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: ''
    };
  },
  methods: {
    showModal(modalName) {
      this.modal = modalName;
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
  align-content: center;
  background-color: rgba($darkgray, 0.5);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    color: $white;
  }

  .modal {
    display: none;
    width: 50vh;
    height: 50vh;
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
}

ul {
  display: flex;
  flex-direction: row;
  list-style: none;

  li {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
