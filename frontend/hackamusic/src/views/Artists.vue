<template>
  <div>
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful title="Artistas" description="Lista de artistas." />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- CSS LOADER -->
    <div v-show="loading" class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- /CSS LOADER -->

    <!-- MENU -->
    <menucustom> </menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->

    <!-- Input para buscar -->

    <label for="search">Nombre del artista: </label>
    <input type="text" id="search" v-model="search" />

    <!-- /Input -->

    <!-- Resultados de búsqueda por nombre de artista -->
    <div class="container" v-show="showSearch">
      <h1>Resultados...</h1>
      <artistcard
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
        v-on:getInfo="getInfo(artist.mbid)"
      ></artistcard>
    </div>
    <!-- /Resultados -->

    <!-- Top artistas (se muestra cuando no hay resultados de búsqueda.) -->
    <div class="container" v-show="!showSearch">
      <h1>Top Artistas</h1>
      <artistcard
        v-for="artist in topArtists"
        :key="artist.id"
        :artist="artist"
        v-on:getInfo="getInfo(artist.mbid)"
      ></artistcard>
    </div>
    <!-- /Top artistas -->

    <!-- /CONTENIDO -->

    <!-- FOOTER -->
    <footercustom></footercustom>
    <!-- /FOOTER -->
  </div>
</template>

<script>
// @ is an alias to /src
//IMPORTANDO COMPONENTES
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import artistcard from "@/components/ArtistCard.vue";

//IMPORTANDO API
import api from "@/api/index.js";

//IMPORTANDO SWEET ALERT Y ANIMATE.CSS
import Swal from "sweetalert2";
import "animate.css";

export default {
  name: "Artists",
  components: {
    artistcard,
    menucustom,
    footercustom,
  },
  data() {
    return {
      topArtists: [],
      artists: [],
      search: "",
      showSearch: false,
      loading: true,
    };
  },
  created() {
    //Funcion para traer el top de artistas
    api.getTopArtists().then((response) => {
      this.topArtists = response.data.topartists.artist;
      this.loading = false;
    });
  },
  watch: {
    search() {
      this.loading = true;
      //Busca artistas con cada cambio en el input
      api.getArtistsByName(this.search).then((response) => {
        if (response.data.results) {
          this.artists = response.data.results.artistmatches.artist;
        } else {
          this.artists = [];
        }
        this.loading = false;
        return this.artists;
      });
    },

    artists() {
      //Cambia lo que se muestra según si hay resultados de búsqueda o no
      if (this.artists.length) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    },
  },
  methods: {
    getInfo(mbId) {
      this.loading = true;

      //Muestra más información
      api
        .getArtistInfo(mbId)
        .then((response) => {
          const artist = response.data.artist;

          //Eliminar el link del final
          const bio = artist.bio.summary.split(" <");

          Swal.fire({
            //Mostar un popup con la info
            title: artist.name,
            text: bio[0] + "...",
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
                window.open(artist.url, "_blank");
              }
            }
          );

          this.loading = false;
        })
        .catch((error) => {
          {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "¡Algo salió mal!",
            });
            this.loading = false;
          }
        });
    },
  },
};
</script>

<style scoped></style>
