<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Exo:wght@500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Exo, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eae6ee;
  background: black;
  min-height: 100vh;
  padding: 2rem 1rem;
}

/* CSS LOADER */
.lds-facebook {
  display: block;
  float: right;
  position: relative;
  right: 1rem;
  width: 1rem;
  height: 2rem;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  width: 0.8rem;
  background: rgba(180, 180, 180, 0.623);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  right: 0;
  animation-delay: -0.24s;
  background: #f350f849;
}
.lds-facebook div:nth-child(2) {
  right: 1rem;
  animation-delay: -0.12s;
  background: #f350f888;
}
.lds-facebook div:nth-child(3) {
  right: 2rem;
  animation-delay: 0;
  background: #f350f8b0;
}
@keyframes lds-facebook {
  0% {
    /*  top: 8px; */
    top: 0;
    height: 3rem;
  }
  50%,
  100% {
    /*  top: 24px; */
    top: 0.1rem;
    height: 2rem;
  }
}
/* /CSS LOADER */

/* FICHAS */
.card {
  background: #196faf;
  width: 15rem;
  height: 16rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
  align-items: center;
}

.card:hover {
  box-shadow: 0 0 5px #f350f8;
}

.card img {
  border-radius: 50%;
}

.card:hover thead th {
  text-shadow: 1px 1px #090a66, -1px -1px 0 #090a66, 1px -1px 0 #090a66,
    -1px 1px 0 #090a66;
}

.card tbody {
  font-size: 0.8rem;
}

.card td {
  padding: 0 1rem;
}
/* /FICHAS */

/* VISTAS */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding-top: 2rem;
}

.container h1 {
  flex-basis: 100vw;
}
/* /VISTAS */
</style>
