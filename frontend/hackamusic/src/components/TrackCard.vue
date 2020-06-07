<template>
  <div class="card" @mouseover="hover = true" @mouseleave="hover = false">
    <table @click="getInfoEvent">
      <thead>
        <tr>
          <th><img :src="track.image[2]['#text']" :alt="track.name" /></th>
        </tr>
        <tr>
          <th>{{ track.name }}</th>
        </tr>
        <tr>
          <td>{{ track.artist.name || track.artist }}</td>
        </tr>
      </thead>
      <tbody v-show="hover">
        <tr>
          <td>{{ track.listeners }} oyentes</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TrackCard",
  props: {
    track: Object,
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
  height: 18rem;
}
</style>
