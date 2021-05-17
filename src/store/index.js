import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "../utils/axios";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {},
  state: {
    user: null,
    isLoading: false,
    posts: []
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    GET_POSTS({ state }, callback = data => {}) {
      axios.get("/posts").then(({ data }) => {
        if (data && data.length) state.posts = data;
        callback(data);
      });
    },
    LOGIN({ commit }, user) {
      commit("SET_LOADING", true);
      const errors = {};

      if (!validateEmail(user.email)) {
        errors.email = {
          message: "Invalid email address"
        };
      }
      if (!user.password.length) {
        errors.password = {
          message: "Invalid password"
        };
      }
      if (!Object.keys(errors).length) {
        return axios
          .get(`/login?email=${user.email}&password=${user.password}`)
          .then(({ data = {} }) => {
            if (!data.id) {
              commit("SET_LOADING", false);
              return {
                errors: {
                  email: {
                    message: "Invalid email/password"
                  }
                }
              };
            } else {
              commit("SET_LOADING", false);
              commit("SET_USER", data);
              return data;
            }
          });
      } else {
        commit("SET_LOADING", false);
        return {
          errors
        };
      }
    }
  }
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default store;
