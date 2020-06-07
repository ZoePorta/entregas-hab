import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/artistas",
    name: "Artists",
    component: () => import("../views/Artists.vue"),
  },
  {
    path: "/temas",
    name: "Tracks",
    component: () => import("../views/Tracks.vue"),
  },
  {
    path: "*",
    name: "Error404",
    component: () => import("../views/Error404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
