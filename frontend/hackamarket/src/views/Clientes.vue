<template>
  <div class="clientes">
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful title="Clientes" description="Lista de clientes." />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <h2>Lista de clientes 👇</h2>

    <!-- Spinner -->
    <div v-show="loading" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- /Spinner -->

    <!-- lista de clientes -->
    <clientecard
      :clientes="clientes"
      v-on:editar="openModal"
      v-on:borrar="deleteClient"
    ></clientecard>
    <!-- /lista de clientes -->

    <!-- MODAL PARA EDITAR  CLIENTES -->
    <div v-show="modal" class="modal animate__animated animate__fadeIn">
      <div class="modalBox animate__animated animate__fadeInDown">
        <h2>
          Modal para datos
        </h2>

        <label for="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del cliente"
          v-model="nombre"
        />

        <!-- Apellido -->
        <label for="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          placeholder="Apellido del cliente"
          v-model="apellido"
        />

        <!-- Ciudad -->
        <label for="ciudad">Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad del cliente"
          v-model="ciudad"
        />

        <!-- Empresa -->
        <label for="empresa">Empresa:</label>
        <input
          type="text"
          name="empresa"
          placeholder="Empresa del cliente"
          v-model="empresa"
        />

        <div class="buttons">
          <button class="boton" @click="closeModal()">Cerrar</button>
          <button class="boton" @click="editClient()">Guardar</button>
        </div>
      </div>
    </div>
    <!-- /MODAL PARA EDITAR CLIENTES -->

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
import clientecard from "@/components/ClienteCard.vue";

//Importando librería
import axios from "axios";

import "animate.css";

export default {
  name: "Clientes",
  components: {
    menucustom,
    footercustom,
    clientecard,
  },
  data() {
    return {
      loading: true,

      //array de los clientes de la bbdd
      clientes: [],

      //Variable para controlar la visibilidad del modal
      modal: false,

      //Datos para editar el cliente

      id: null,

      nombre: "",
      apellido: "",
      ciudad: "",
      empresa: "",
    };
  },
  methods: {
    getClients() {
      var self = this;
      axios
        .get("http://localhost:3050/clientes")
        //si sale bien
        .then(function(response) {
          console.log(response);
          self.clientes = response.data;
          self.loading = false;
        })
        //si sale mal
        .catch((error) => console.log(error));
    },

    deleteClient(data) {
      axios
        .delete("http://localhost:3050/clientes/del/" + data)
        //si sale bien
        .then(function(response) {
          location.reload();
          console.log(response);
        })
        //si sale mal
        .catch((error) => console.log(error));
    },

    editClient(index) {
      let data = this.id;
      let self = this;

      axios
        .put("http://localhost:3050/clientes/edit/" + data, {
          nombre: self.nombre,
          apellido: self.apellido,
          ciudad: self.ciudad,
          empresa: self.empresa,
        })
        //si sale bien
        .then(function(response) {
          location.reload();
          console.log(response);
          closeModal();
        })
        //si sale mal
        .catch((error) => console.log(error));
    },

    openModal(index) {
      let cliente = this.clientes[index];

      this.id = cliente.id;

      this.nombre = cliente.nombre;
      this.apellido = cliente.apellido;
      this.ciudad = cliente.ciudad;
      this.empresa = cliente.empresa;
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },
  },
  created() {
    this.getClients();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);

  width: 100%;
}

/* formulario */
.modalBox {
  padding: 2rem 1rem;
  width: 80%;
  max-width: 30rem;
  margin: 10rem auto;
  border-radius: 1rem;
  border: 1px solid #888888;
  background: #efefef;
  color: #070707;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  width: 80%;
  max-width: 15rem;
  height: 2rem;
  margin-bottom: 1rem;
}

.buttons {
  widows: 100%;
  display: flex;
  justify-content: space-around;
}

button {
  margin: 2rem 1rem;
  margin-bottom: 0;
}
</style>
