<template>
  <div class="productos">
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful title="Productos" description="Catálogo de productos." />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <h2>Lista de productos 👇</h2>

    <!-- Spinner -->
    <div v-show="loading" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- /Spinner -->

    <productcard :products="products" v-on:buy="buyProduct"></productcard>

    <!-- /CONTENIDO -->

    <!-- FOOTER -->
    <footercustom></footercustom>
    <!-- /FOOTER -->
  </div>
</template>

<script>
// @ is an alias to /src
//Importando componentes
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import productcard from "@/components/ProductCard.vue";

//Importando librería
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Productos",
  components: {
    menucustom,
    footercustom,
    productcard,
  },
  data() {
    return {
      //array de los clientes de la bbdd
      products: [],
      loading: true,
    };
  },
  methods: {
    getProducts() {
      var self = this;
      axios
        .get("http://localhost:3050/productos")
        //si sale bien
        .then(function(response) {
          console.log(response);
          self.products = response.data;
          self.loading = false;
        })
        //si sale mal
        .catch((error) => console.log(error));
    },

    buyProduct(index) {
      let product = this.products[index];

      Swal.fire({
        icon: "success",
        title: "¡Hecho!",
        text: `Has comprado ${product.nombre} por ${product.precio}€. En breve lo recibirás en tu casa.`,
      });

      console.log(product);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
</style>
