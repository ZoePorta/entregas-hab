<template>
  <div>
    <!-- CAMBIAR TITULO DE LA PAGINA -->
    <vue-headful title="Temas" description="Lista de temas." />
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
    <label for="search">Nombre del tema: </label>
    <input type="text" id="search" v-model="search" />
    <!-- /Input -->

    <!-- Resultados de búsqueda por nombre de tema -->
    <div class="container" v-show="showSearch">
      <h1>Resultados...</h1>
      <trackcard
        v-for="track in tracks"
        :key="track.id"
        v-on:getInfo="getInfo(track.mbid)"
        :track="track"
      ></trackcard>
    </div>
    <!-- /Resultados -->

    <!-- Top temas (se muestra cuando no hay resultados de búsqueda.) -->
    <div class="container" v-show="!showSearch">
      <h1>Top Temas</h1>
      <trackcard
        v-for="track in topTracks"
        :key="track.id"
        v-on:getInfo="getInfo(track.mbid)"
        :track="track"
      ></trackcard>
    </div>
    <!-- /Top temas -->

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
import trackcard from "@/components/TrackCard.vue";

//IMPORTANDO API
import api from "@/api/index.js";

//IMPORTANDO SWEET ALERT Y ANIMATE.CSS
import Swal from "sweetalert2";
import "animate.css";

export default {
  name: "Tracks",

  components: {
    trackcard,
    menucustom,
    footercustom,
  },

  data() {
    return {
      topTracks: [],
      tracks: [],
      search: "",
      showSearch: false,
      loading: true,
    };
  },

  created() {
    api.getTopTracks().then((response) => {
      this.topTracks = response.data.tracks.track;
      this.loading = false;
    });
  },

  methods: {
    getInfo(mbId) {
      this.loading = true;

      //Muestra más información
      api
        .getTrackInfo(mbId)
        .then((response) => {
          const track = response.data.track;

          //Eliminar el link del final
          let wiki = "";
          if (track.wiki && track.wiki.summary) {
            wiki = track.wiki.summary.split(" <")[0];
          }

          Swal.fire({
            //Mostar un popup con la info
            title: `<h1>${track.name}</h1>`,
            html: `<h2>Parte del álbum ${track.album.title} de ${track.artist.name}</h2><p>${wiki}...</p>`,
            confirmButtonText: "Más info",
            showCancelButton: true,
            cancelButtonText: "Atrás",

            background: "#eae6ee",
            confirmButtonColor: "#f250f8",
            cancelButtonColor: "#196faf",

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
                window.open(track.url, "_blank");
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

  watch: {
    search() {
      this.loading = true;
      //Busca temas con cada cambio en el input
      api.getTracksByName(this.search).then((response) => {
        if (response.data.results) {
          this.tracks = response.data.results.trackmatches.track;
        } else {
          this.tracks = [];
        }
        this.loading = false;
        return this.tracks;
      });
    },

    tracks() {
      //Cambia lo que se muestra según si hay resultados de búsqueda o no
      if (this.tracks.length) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    },
  },
};
</script>
