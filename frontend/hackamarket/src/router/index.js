import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn, checkAdmin } from "../api/utils";
import Swal from "sweetalert2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/clientes",
    name: "Clientes",
    component: () => import("../views/Clientes.vue"),
    meta: {
      //Ruta privada
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "No tienes permiso para acceder...",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/productos",
    name: "Productos",
    component: () => import("../views/Productos.vue"),
    meta: {
      //Ruta privada
      allowAnonymous: false,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      //Ruta privada
      allowAnonymous: false,
    },
  },
  {
    path: "/add-client",
    name: "AddClient",
    component: () => import("../views/AddClient.vue"),
    meta: {
      //Ruta privada

      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "No tienes permiso para acceder...",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      //Ruta pública

      allowAnonymous: true,
    },
  },
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
    meta: {
      //Ruta pública

      allowAnonymous: true,
    },
  },
  {
    path: "*",
    name: "Error404",
    component: () => import("../views/Error404.vue"),
    meta: {
      //Ruta pública

      allowAnonymous: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

//COMPROBANDO CADA PÁGINA POR SI LA PERSONA ESTA LOGUEADA
router.beforeEach((to, from, next) => {
  // Si la ruta es privada y la persona no tiene token
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
