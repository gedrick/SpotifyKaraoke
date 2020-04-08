<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #1a1a1a;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

a {
  color: #9a6dc3;
  text-decoration: none;
}

h1 {
  font-family: 'Bungee';
  font-size: 60px;
  margin-bottom: 0;
  color: #fff;
}

h3 {
  font-size: 18px;
  margin: 5px 0 20px 0;
  font-style: italic;
}
</style>
