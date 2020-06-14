<template>
  <div>
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful
      title="Añadir cliente"
      description="Formulario para añadir clientes."
    />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- MENU -->
    <menucustom></menucustom>
    <!-- /MENU -->

    <!-- CONTENIDO -->
    <h2>Añade un cliente 👇</h2>
    <!-- FORMULARIO -->
    <div class="form">
      <p v-show="required">Tienes datos aún por rellenar.</p>

      <!-- Nombre -->
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

      <button class="boton" @click="addClient()">
        CREAR
      </button>
    </div>

    <!-- /CONTENIDO -->

    <!-- FOOTER -->
    <footercustom></footercustom>
    <!-- /FOOTER -->
  </div>
</template>

<script>
//Importando componentes
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

//Importando librería
import axios from "axios";

export default {
  name: "AddClient",
  components: {
    menucustom,
    footercustom,
  },
  data() {
    return {
      nombre: "",
      apellido: "",
      ciudad: "",
      empresa: "",
      correctData: false,
      required: false,
    };
  },
  methods: {
    validatingData() {
      if (
        this.nombre === "" ||
        this.apellido === "" ||
        this.ciudad === "" ||
        this.empresa === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true; // SE MUESTRA EL MENSAJE
      } else {
        this.correctData = true; //ENVIAR
        this.required = false; //NO SE MUESTRA EL MENSAJE
      }
    },

    addClient() {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData) {
        var self = this;
        axios
          .post("http://localhost:3050/clientes/add", {
            nombre: self.nombre,
            apellido: self.apellido,
            ciudad: self.ciudad,
            empresa: self.empresa,
          })
          .then(function(response) {
            self.emptyFields();
            console.log(response);
          })
          .catch((error) => console.log(error));
      } else {
        alert("No has rellenado todos los campos.");
      }
    },

    emptyFields() {
      this.nombre = "";
      this.apellido = "";
      this.ciudad = "";
      this.empresa = "";
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

/* Mensaje de error */
p {
  color: #d1345b;
  padding-bottom: 1rem;
}

/* formulario */
.form {
  padding: 1rem;
  width: 80%;
  max-width: 30rem;
  margin: auto;
  border-radius: 1rem;
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
</style>
