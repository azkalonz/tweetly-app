import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      transition: {
        name: "slide"
      }
    }
  },
  {
    path: "/landing",
    name: "Landing",
    component: Landing,
    meta: {
      layout: "login",
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "login",
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      layout: "login",
      transition: {
        name: "slide",
        duration: 1000
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
