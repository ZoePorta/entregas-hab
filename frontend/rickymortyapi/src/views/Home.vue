<template>
  <div class="home">
    <!-- LOGO DE RICK Y MORTY -->
    <figure class="logo">
      <img
        class="logo"
        src="../assets/images/RickMortyLogo.png"
        alt="Rick and Morty logo"
      />
    </figure>

    <!-- BÚSQUEDA POR ID -->
    <p>
      <label for="byId">Search by characters' ID: </label>
      <input type="number" v-model="id" id="byId" placeholder="ID number..." />
      <button @click="searchChar(id)">GO!</button>
    </p>

    <!-- PERSONAJE BUSCADO POR ID -->
    <div v-if="idChar.id">
      <button class="reset" @click="(idChar = {}), (id = null)">Back</button>
      <CharById :char="idChar"></CharById>
    </div>

    <div v-else>
      <!--SEARCH -->

      <form id="search">
        <p>Search your character...</p>
        <!-- BY NAME -->
        <label for="byName">Name: </label>
        <input
          v-model="search.name"
          id="byName"
          type="search"
          placeholder="Search..."
        />

        <!-- BY GENDER -->
        <p>
          Gender:
          <input
            type="checkbox"
            id="male"
            value="male"
            v-model="search.gender"
          />
          <label for="male">Male </label>
          <input
            type="checkbox"
            id="female"
            value="female"
            v-model="search.gender"
          />
          <label for="female">Female </label>
          <input
            type="checkbox"
            id="genderless"
            value="genderless"
            v-model="search.gender"
          />
          <label for="genderless">Genderless </label>
          <input
            type="checkbox"
            id="genderUnknown"
            value="unknown"
            v-model="search.gender"
          />
          <label for="genderUnknown">Unknown</label>
        </p>

        <!-- BY STATUS -->
        <p>
          Status:
          <input
            type="checkbox"
            id="alive"
            value="alive"
            v-model="search.status"
          />
          <label for="alive">Alive </label>
          <input
            type="checkbox"
            id="dead"
            value="dead"
            v-model="search.status"
          />
          <label for="dead">Dead </label>
          <input
            type="checkbox"
            id="statusUnknown"
            value="unknown"
            v-model="search.status"
          />
          <label for="statusUnknown">Unknown</label>
        </p>

        <!-- BY SPECIES -->
        <p>
          Species:
          <input
            type="checkbox"
            id="human"
            value="human"
            v-model="search.species"
          />
          <label for="human">Human </label>
          <input
            type="checkbox"
            id="alien"
            value="alien"
            v-model="search.species"
          />
          <label for="alien">Alien </label>
          <input
            type="checkbox"
            id="animal"
            value="animal"
            v-model="search.species"
          />
          <label for="animal">Animal</label>
        </p>
        <button
          class="reset"
          @click="
            search = {
              gender: [],
              status: [],
              species: [],
            }
          "
        >
          Reset
        </button>
      </form>
      <!-- TARJETAS DE PERSONAJES -->
      <CharCard :chars="filterChars"></CharCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharCard from "@/components/CharCard.vue";
import CharById from "@/components/CharById.vue";

//IMPORTANDO LA CONFIGURACIÓN DE LA API
import api from "@/api/api.js";

export default {
  name: "Home",
  components: {
    CharCard,
    CharById,
  },
  data() {
    return {
      chars: [],
      idChar: {},
      search: {
        gender: [],
        status: [],
        species: [],
      },
      id: null,
    };
  },
  computed: {
    filterChars() {
      let result = this.chars;

      /* By name */
      if (this.search.name) {
        result = result.filter((char) =>
          char.name.toLowerCase().includes(this.search.name.toLowerCase())
        );
      }

      /* By gender */
      if (this.search.gender.length) {
        console.log(this.search.gender);
        result = result.filter((char) =>
          this.search.gender.includes(char.gender.toLowerCase())
        );
      }

      /* By status */
      if (this.search.status.length) {
        console.log(this.search.status);
        result = result.filter((char) =>
          this.search.status.includes(char.status.toLowerCase())
        );
      }

      /* By species */
      if (this.search.species.length) {
        console.log(this.search.species);
        result = result.filter((char) =>
          this.search.species.includes(char.species.toLowerCase())
        );
      }

      return result;
    },
  },
  methods: {
    searchChar(id) {
      if (id > 0) {
        api.getChar(id).then((res) => (this.idChar = res.data));
      }
    },
  },
  created() {
    api.getAll().then((res) => (this.chars = res.data.results));
  },
};
</script>
