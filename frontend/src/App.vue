<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  color: #00afc7ff;
  background: #1f2b51ff;
  width: 100vw;
  min-width: fit-content;
}

a {
  color: #66cc99ff;
  text-decoration: none;
}

p {
  margin: 1rem;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

figure.logo {
  max-width: 90vw;
}

img.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#app {
  min-width: fit-content;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 1rem;
}

#nav a {
  font-weight: bold;
  color: #66cc99ff;
}

#nav a.router-link-exact-active {
  color: #f8fc57ff;
}

#search input {
  margin-left: 0.5rem;
}

button,
input {
  color: black;
  font-weight: bold;
  padding: 0.2rem;
  background: rgb(98, 247, 105);
  border: 1px solid black;
  box-shadow: 0 0 2px #f8fc57ff;
}
</style>
