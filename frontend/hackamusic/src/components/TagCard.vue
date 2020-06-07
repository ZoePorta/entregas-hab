<template>
  <div @mouseover="hover = true" @mouseleave="hover = false" class="card">
    <table @click="getInfoEvent">
      <thead>
        <tr>
          <th colspan="2">
            {{ tag.name }}
          </th>
        </tr>
      </thead>
      <tbody v-show="hover">
        <tr>
          <th>Alcance</th>
          <th>Usos</th>
        </tr>
        <tr>
          <td>{{ tag.reach }}</td>
          <td>{{ tag.taggings }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TagCard",
  props: {
    tag: Object,
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
  min-width: 8.5rem;
  height: 5rem;
  display: flex;
}
</style>
