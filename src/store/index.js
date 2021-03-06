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
    visiblePosts: "FOLLOWING",
    posts: [],
    bannedUserPosts: [],
    isTweeting: false,
    modal: { isOpen: false },
    search: ""
  },
  mutations: {
    SET_SEARCH(state, search) {
      state.search = search;
    },
    OPEN_MODAL(state, meta) {
      state.modal = { ...meta, isOpen: true };
    },
    CLOSE_MODAL(state) {
      state.modal.isOpen = false;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_VISIBLE_POSTS(state, type) {
      state.visiblePosts = type;
    },
    LOGOUT(state) {
      state.user = null;
    },
    SET_IS_TWEETING(state, status) {
      state.isTweeting = status;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    ADD_COMMENT(state, { post_id, comment }) {
      const index = state.posts.findIndex(q => q.id === post_id);
      if (index >= 0) {
        state.posts[index].comments.push(comment);
      }
    },
    INCREMENT_LIKES(state, post_id) {
      const index = state.posts.findIndex(q => q.id === post_id);
      console.log(index);
      if (index >= 0) {
        state.posts[index].likes += 1;
      }
    },
    FOLLOW(state, client) {
      state.user.following.push(client);
    },
    UNFOLLOW(state, client) {
      const index = state.user.following.findIndex(q => q.id === client.id);
      if (index >= 0) {
        state.user.following.splice(index, 1);
      }
    }
  },
  actions: {
    SAVE_USER({ state, commit }, user) {
      axios
        .post(
          "/update-user",
          { ...state.user, ...user },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(({ data }) => {
          if (data.id) {
            commit("SET_USER", data);
          }
        });
    },
    DELETE_POST({ state }, post) {
      if (post && post.id) {
        axios.delete(`/delete-post/${post.id}`).then(({ data }) => {
          if (data === "Success") {
            const index = _.findIndex(state.posts, { id: post.id });
            state.posts.splice(index, 1);
          }
        });
      }
    },
    DELETE_COMMENT({ state }, { postId, comment }) {
      if (comment && comment.id) {
        axios
          .delete(`/delete-comment/${comment.id}?post_id=${postId}`)
          .then(({ data }) => {
            if (data === "Success") {
              const postIndex = _.findIndex(state.posts, { id: postId });
              const commentIndex = _.findIndex(
                state.posts[postIndex].comments,
                { id: comment.id }
              );
              if (commentIndex >= 0) {
                state.posts[postIndex].comments.splice(commentIndex, 1);
              }
            }
          });
      }
    },
    GET_POSTS({ state }, callback = data => {}) {
      axios.get("/posts").then(({ data }) => {
        state.posts = data.reverse();
        state.bannedUserPosts = data.filter(q => q.author.banned === true);
        callback(
          data.map(q => ({
            ...q,
            author: {
              ...q.author,
              name: q.author.firstName + " " + q.author.lastName
            }
          }))
        );
      });
    },
    REGISTER({ commit }, user) {
      const errors = {};
      commit("SET_LOADING", true);

      if (/\d/.test(user.firstName)) {
        errors.firstName = {
          message: "Invalid character"
        };
      }

      if (/\d/.test(user.lastName)) {
        errors.lastName = {
          message: "Invalid character"
        };
      }

      if (_.isNil(user.firstName) || _.isEmpty(user.firstName)) {
        errors.firstName = {
          message: "Invalid first name"
        };
      }
      if (_.isNil(user.lastName) || _.isEmpty(user.lastName)) {
        errors.lastName = {
          message: "Invalid last name"
        };
      }
      validateUser(user, errors);
      if (!Object.keys(errors).length) {
        return axios
          .post("/register", user, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(({ data = {} }) => {
            if (!data.id) {
              commit("SET_LOADING", false);
              return {
                errors: {
                  email: {
                    message: "Something went wrong. Try again later."
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
    },
    LOGIN({ commit }, user) {
      commit("SET_LOADING", true);
      const errors = {};
      validateUser(user, errors);

      if (!Object.keys(errors).length) {
        return axios
          .post(`/login?email=${user.email}&password=${user.password}`)
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
              return { data, errors };
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

function validateUser(user, errors) {
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
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default store;
