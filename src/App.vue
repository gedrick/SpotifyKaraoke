<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';

body {
  background-color: $darkgray;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
}

a, a:visited {
  color: $purple;
  text-decoration: none;
}

h1 {
  font-family: 'Bungee';
  font-size: 60px;
  margin-bottom: 0;
  color: $white;
}

h3 {
  font-size: 18px;
  margin: 5px 0 20px 0;
  font-style: italic;
}
</style>
