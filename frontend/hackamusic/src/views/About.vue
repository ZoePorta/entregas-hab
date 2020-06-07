<template>
  <div class="About">
    <!-- CAMBIAR TITULO DE LA PAGINA -->
    <vue-headful title="About" description="Información sobre Hack A Music." />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <h1>Esta web...</h1>
    <avatar class="avatar"></avatar>
    <p>Ha sido creada por Zoe,</p>
    <p>
      usando la API de
      <a href="https://www.last.fm/api/?lang=es&" target="_blank">LastFM</a>, la
      librería
      <a href="https://github.com/axios/axios" target="_blank">AXIOS</a>,
      <a href="https://sweetalert2.github.io/" target="_blank">SweetAlert</a>,
      <a href="https://www.npmjs.com/package/vue-headful" target="_blank"
        >Vue-Headful</a
      >,
      <a href="https://loading.io/css/" target="_blank">CSS Loader Spiner</a>,
      <a href="https://animate.style/" target="_blank">Animate.css</a>,
      <a href="https://loading.io/color/random/" target="_blank"
        >Beautiful Palette Generator</a
      >
      y
      <a href="https://github.com/orgordin/vuejs-avataaars" target="_blank"
        >Avataaars</a
      >.
    </p>
    <!-- /CONTENIDO -->

    <!-- FOOTER -->
    <footercustom></footercustom>
    <!-- /FOOTER -->
  </div>
</template>

<script>
//IMPORTANDO COMPONENTES
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import avatar from "@/components/Avatar.vue";

export default {
  name: "About",
  components: {
    menucustom,
    footercustom,
    avatar,
  },
};
</script>

<style scoped>
.avatar {
  margin: 2rem auto;
}

a:visited {
  color: #196faf;
}

a {
  color: #f250f8;
}

p {
  max-width: 500px;
  margin: 0 auto;
}
</style>
