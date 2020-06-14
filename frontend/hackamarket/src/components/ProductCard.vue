<template>
  <div id="list">
    <article
      class="products"
      v-for="(product, index) in products"
      :key="product.id"
    >
      <figure>
        <img :src="product.img" :alt="product.nombre" />
      </figure>
      <p class="id">id#{{ product.id }}</p>
      <h1>{{ product.nombre }}</h1>
      <p class="descripcion">{{ product.descripcion }}</p>
      <p
        class="disponibilidad"
        :class="{
          green: product.estado === 'disponible',
          red: product.estado === 'no disponible',
        }"
      >
        ● {{ product.estado }}
      </p>
      <h2 class="precio">{{ product.precio }}€</h2>
      <p class="stock">Quedan {{ product.stock }} unidades.</p>
      <button
        class="boton"
        @click="buyEvent(index)"
        :disabled="product.estado === 'no disponible'"
      >
        COMPRAR
      </button>
    </article>
  </div>
</template>

<script>
export default {
  name: "ClienteCard",
  props: {
    products: Array,
  },
  methods: {
    //Funcion que emite un evento para comprar un producto
    buyEvent(index) {
      //Enviando el índice del producto a la vista
      this.$emit("buy", index);
    },
  },
};
</script>

<style scoped>
#list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.green {
  color: #34d1bf;
}

.red {
  color: #d1345b;
}

.products {
  background: #efefef;
  color: #070707;
  border-radius: 1rem;
  max-width: 800px;
  width: 90%;
  margin: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 8rem;
  grid-template-rows: repeat(6, minmax(min-content, auto));
  grid-template-areas:
    "nombre  id"
    "imagen imagen"
    "precio precio"
    "descripcion descripcion"
    "stock disponibilidad"
    "comprar comprar";
  align-items: center;
  justify-items: center;
}

h1 {
  grid-area: nombre;
  position: relative;
  left: 4rem;
  margin-bottom: 1rem;
}

/* figure {

  height: 100%;

  min-width: 20rem;

} */

figure {
  grid-area: imagen;

  width: 100%;
  min-width: 10rem;

  height: 15rem;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.id {
  grid-area: id;
  justify-self: right;
}

.disponibilidad {
  grid-area: disponibilidad;
  font-weight: bold;
}

.descripcion {
  grid-area: descripcion;
  padding: 1rem;
}

.precio {
  grid-area: precio;
  font-size: 5rem;
  align-self: flex-start;
}

.stock {
  grid-area: stock;
  justify-self: left;
}

button:disabled {
  background: gray;
  border: none;
  cursor: unset;
}

/* MEDIA QUERIES */
@media (min-width: 700px) {
  .products {
    height: 25rem;

    grid-template-columns: 1fr 1fr 8rem;
    grid-template-rows: 3rem 3rem 1fr 3rem;
    grid-template-areas:
      "nombre nombre id"
      "imagen precio disponibilidad"
      "imagen descripcion descripcion"
      "imagen stock comprar";
  }

  figure {
    height: 100%;

    min-width: 20rem;
  }

  .stock {
    justify-self: center;
  }
}
</style>
