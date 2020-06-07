<template>
  <div class="home">
    <!-- CAMBIAR TITULO DE LA PAGINA -->
    <vue-headful title="Error 404" description="Página no encontrada." />
    <!-- CAMBIAR TITULO DE LA PAGINA -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <h1>Error 404</h1>
    <p>Página no encontrada.</p>
    <!-- /CONTENIDO -->

    <!-- FOOTER -->
    <footercustom></footercustom>
    <!-- /FOOTER -->
  </div>
</template>

<script>
//IMPORTANDO API
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Home",
  components: {
    menucustom,
    footercustom,
  },
};
</script>
