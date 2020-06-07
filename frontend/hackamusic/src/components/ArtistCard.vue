<template>
  <div class="card" @mouseover="hover = true" @mouseleave="hover = false">
    <table @click="getInfoEvent">
      <thead>
        <tr>
          <th><img :src="artist.image[2]['#text']" :alt="artist.name" /></th>
        </tr>
        <tr>
          <th>{{ artist.name }}</th>
        </tr>
      </thead>
      <tbody v-show="hover">
        <tr>
          <td>{{ artist.listeners }} oyentes</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ArtistCard",
  props: {
    artist: Object,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    getInfoEvent() {
      this.$emit("getInfo");
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
}
</style>
