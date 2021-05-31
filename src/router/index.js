import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Account from "../views/Account.vue";
import Follow from "../views/Follow.vue";
import Followers from "../views/Followers.vue";
import Reports from "../views/Reports.vue";
import Users from "../views/Users.vue";
import Requests from "../views/Requests.vue";
import Banned from "../views/Banned.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/banned",
    name: "Banned",
    component: Banned,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/follow",
    name: "Follow",
    component: Follow,
    meta: {
      transition: {
        name: "fade"
      }
    }
  },
  {
    path: "/followers",
    name: "Followers",
    component: Followers,
    meta: {
      transition: {
        name: "fade"
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
