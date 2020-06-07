<template>
  <div class="home">
    <!-- CAMBIAR TITULO DE LA PAGINA -->
    <vue-headful
      title="Hack A Music"
      description="Página de inicio de Hack A Music."
    />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- CSS LOADER -->
    <div v-show="loading" class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- /CSS LOADER -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <!-- Búsqueda por nombre de artista -->
    <div class="container">
      <!--       <div class="prueba" v-for="tag in tags" :key="tag.id"></div>
 -->
      <tagcard
        :tag="tag"
        v-for="tag in tags"
        :key="tag.id"
        v-on:getInfo="getInfo(tag.name)"
      ></tagcard>
    </div>
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
import tagcard from "@/components/TagCard.vue";

//IMPORTANDO API
import api from "@/api/index.js";

//IMPORTANDO SWEET ALERT Y ANIMATE.CSS
import Swal from "sweetalert2";
import "animate.css";

export default {
  name: "Home",
  components: {
    menucustom,
    footercustom,
    tagcard,
  },
  data() {
    return {
      tags: [],
      loading: true,
    };
  },
  created() {
    api.getTopTags().then((response) => {
      this.tags = response.data.tags.tag;
      this.loading = false;
    });
  },

  methods: {
    getInfo(name) {
      this.loading = true;

      //Muestra más información
      api
        .getTagInfo(name)
        .then((response) => {
          console.log(response.data.tag.wiki.summary);

          const tag = response.data.tag;

          //Eliminar el link del final
          let wiki = "";
          if (tag.wiki && tag.wiki.summary) {
            wiki = tag.wiki.summary.split(" <")[0];
          }

          Swal.fire({
            //Mostar un popup con la info
            title: `<h1>${tag.name}</h1>`,
            html: `<p>${wiki}...</p>`,
            confirmButtonText: "Más info",
            showCancelButton: true,
            cancelButtonText: "Atrás",

            //Animaciones del popup
            showClass: {
              popup: "animate__animated animate__lightSpeedInLeft",
            },
            hideClass: {
              popup: "animate__animated animate__lightSpeedOutRight",
            },
          }).then(
            //Si se pulsa en "más info" se abre una pestaña nueva
            (result) => {
              if (result.value) {
                window.open(`http://www.last.fm/tag/${tag.name}`, "_blank");
              }
            }
          );

          this.loading = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Algo salió mal!",
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* .container {
  padding: 0 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-gap: 1rem;
  justify-content: center;
  justify-items: center;
} */

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
