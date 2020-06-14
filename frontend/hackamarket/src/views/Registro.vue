<template>
  <div>
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful
      title="Registro"
      description="Página de registro de Hack-A-Market."
    />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- CONTENIDO -->
    <h2>
      Regístrate 👇
    </h2>

    <!-- FORMULARIO -->
    <div class="form">
      <p class="error" v-show="errorMessage">{{ errorMessage }}</p>

      <!-- Email -->
      <label for="email">Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Tu email..."
        v-model="email"
      />
      <br />

      <!-- Contraseña -->
      <label for="password">Contraseña:</label>
      <input
        type="password"
        name="password"
        placeholder="Contraseña..."
        v-model="password"
      />
      <br />

      <!-- Repetir contraseña -->
      <label for="repeatPassword">Repite la contraseña:</label>
      <input
        type="password"
        name="repeatPassword"
        placeholder="Contraseña..."
        v-model="repeatPassword"
      />
      <br />

      <button class="boton" @click="addClient(email, password)">
        REGISTRAR
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
import footercustom from "@/components/FooterCustom.vue";

//Importando librería
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Register",
  components: {
    footercustom,
  },
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",

      errorMessage: "",
      correctData: false,
    };
  },
  methods: {
    validatingData() {
      if (!this.email || !this.password || !this.repeatPassword) {
        this.errorMessage = "Tienes datos aún por rellenar."; //Establecer mensaje de error
        this.correctData = false; //NO ENVIAR
      } else if (this.password !== this.repeatPassword) {
        this.errorMessage = "Las contraseñas no coinciden."; //Establecer mensaje de error
        this.correctData = false; //NO ENVIAR
      } else {
        this.correctData = true; //ENVIAR
        this.errorMessage = ""; //NO SE MUESTRA EL MENSAJE
      }
    },

    addClient(email, password) {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData) {
        var self = this;
        axios
          .post("http://localhost:3050/usuarios/add", {
            email: self.email,
            password: self.password,
          })
          .then(function(response) {
            self.emptyFields();
            console.log(response);

            //Lanzar modal de confirmación
            Swal.fire({
              icon: "success",
              title: "Usuario registrado",
              confirmButtonText: "Ir al login",
            }).then(
              //Ir a la página de login
              (result) => self.$router.push("/")
            );
          })
          .catch((error) => console.log(error));
      }
    },

    emptyFields() {
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
    },
  },
};
</script>

<style scoped>
h2 {
  padding: 2rem;
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
