<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Inicio</router-link> ♪
      <router-link :to="{ name: 'Artists' }">Artistas</router-link> ♪
      <router-link :to="{ name: 'Tracks' }">Temas</router-link> ♪
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
};
</script>

<style scoped>
#nav {
  margin-bottom: 2rem;
}

#nav a {
  font-weight: bold;
  color: #196faf;
}

#nav a.router-link-exact-active {
  color: #f250f8;
}
</style>
