<template>
  <div class="container">
    <div class="card" v-for="char in chars" :key="char.id">
      <img :src="char.image" :alt="char.name" />
      <h2>{{ char.name }}</h2>
      <h3>Id: {{ char.id }}</h3>
      <p
        :class="{ green: char.status === 'Alive', red: char.status === 'Dead' }"
      >
        {{ char.status }}
      </p>
      <p>{{ char.species }} - {{ char.gender }}</p>
      <p v-if="char.type">({{ char.type }})</p>
      <p v-if="char.origin.url">
        Origin:
        <a :href="char.origin.url">{{ char.origin.name }}</a>
      </p>
      <p v-else>Origin: {{ char.origin.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharCard",
  props: {
    chars: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: 1fr;
}

.card {
  min-width: fit-content;
  max-width: 500px;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid black;
  display: inline-block;
  background: #00afc7ff;
  color: black;
  margin: 1rem;
  border: 2px solid black;
  box-shadow: 0 0 10px #f8fc57ff, 0 0 30px #66cc99ff;
}

.card > * {
  margin: 1rem;
}

.green {
  color: rgb(0, 99, 0);
}

.red {
  color: rgb(160, 0, 0);
}

a {
  color: rgb(34, 53, 116);
}

img {
  min-width: 5rem;
  object-fit: contain;

  border-radius: 50%;
  border: 2px solid black;
}
</style>
