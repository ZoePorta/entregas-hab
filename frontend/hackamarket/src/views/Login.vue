<template>
  <div>
    <!-- CAMBIAR TITULO DE LA PÁGINA -->
    <vue-headful title="Login" description="Formulario de acceso." />
    <!-- /CAMBIAR TITULO DE LA PAGINA -->

    <!-- CONTENIDO -->
    <h2>
      Haz login 👇
    </h2>

    <div class="form">
      <input type="text" placeholder="Escribe tu email" v-model="email" />
      <input
        type="password"
        placeholder="Escribe tu contraseña"
        v-model="password"
      />
      <button class="boton" @click="login()">
        ENTRAR
      </button>

      <p>
        ¿Aún no tienes cuenta?
        <router-link :to="{ name: 'Registro' }">¡Regístrate!</router-link>
      </p>
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

//Importando funciones
import { loginUser } from "../api/utils";

export default {
  name: "Login",
  components: {
    footercustom,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        //INTENTO HACER LOGIN
        await loginUser(this.email, this.password);
        //SI HAY LOGIN, QUE ME LLEVE A LA PÁGINA DE PRODUCTOS
        this.$router.push("/productos");
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
  },
};
</script>

<style scooped>
h2 {
  padding: 2rem;
}

.form {
  padding: 2rem;
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

p {
  margin-top: 1rem;
}
</style>
