<template>
  <div class="login-container flex column aiss" v-if="!$store.state.isLoading">
    <img src="/src/assets/img/text-logo.svg" />
    <tw-input
      label="Email"
      :value="email"
      @input="email = $event"
      :error="errors.email"
      :parentProps="{
        style: 'margin-bottom: 13px;',
      }"
      :props="{
        class: 'f1',
        type: 'text',
        style: 'width: 100%;',
      }"
    />
    <tw-input
      label="Password"
      :value="password"
      @input="password = $event"
      :error="errors.password"
      :parentProps="{
        style: 'margin-bottom: 40px;',
      }"
      :props="{
        class: 'f1',
        type: 'password',
        style: 'width: 100%;',
      }"
    />
    <tw-button class="contained f1" @click="login" style="margin-bottom: 40px">
      Login
    </tw-button>
    <tw-button class="outlined f1" @click="$router.push('/register')">
      Create an Account
    </tw-button>
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  mounted: function () {
    axios.get("/posts");
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.errors = {};
      this.$store.dispatch("LOGIN", user).then(({ errors = null }) => {
        if (errors) {
          this.errors = errors;
          return;
        } else {
          this.$router.replace("/");
        }
      });
    },
  },
};
</script>
