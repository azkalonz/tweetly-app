<template>
  <div class="login-container flex column aiss" v-if="!$store.state.isLoading">
    <img src="/src/assets/img/text-logo.svg" />
    <tw-input
      label="First Name"
      :value="firstName"
      @input="firstName = $event"
      :error="errors.firstName"
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
      label="Last Name"
      :value="lastName"
      @input="lastName = $event"
      :error="errors.lastName"
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
        style: 'margin-bottom: 13px;',
      }"
      :props="{
        class: 'f1',
        type: 'password',
        style: 'width: 100%;',
      }"
    />
    <tw-input
      label="Confirm password"
      :value="confirmPassword"
      @input="confirmPassword = $event"
      :error="errors.confirmPassword"
      :parentProps="{
        style: 'margin-bottom: 40px;',
      }"
      :props="{
        class: 'f1',
        type: 'password',
        style: 'width: 100%;',
      }"
    />
    <tw-button class="contained f1" @click="null" style="margin-bottom: 40px">
      Create Account
    </tw-button>
    <tw-button class="outlined f1" @click="$router.push('/login')">
      Login
    </tw-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.commit("TOGGLE_LOADING");
      this.errors = {};

      if (!validateEmail(user.email)) {
        this.errors.email = {
          message: "Invalid email address",
        };
      }
      if (!this.password.length) {
        this.errors.password = {
          message: "Invalid password",
        };
      }
      if (!Object.keys(this.errors).length)
        setTimeout(() => {
          this.errors = {};
          this.$store.commit("SET_USER", {
            email: this.email,
            password: this.password,
          });
          this.$router.replace("/");
          this.$store.commit("TOGGLE_LOADING");
        }, 2000);
      else {
        this.$store.commit("TOGGLE_LOADING");
      }
    },
  },
};
</script>
