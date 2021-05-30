<template>
  <div class="account-page-container">
    <h3>Account Settings</h3>
    <br />
    <tw-input
      v-for="(field, index) in Object.keys(data)"
      :key="index"
      :label="field"
      :value="data[field]"
      @input="data[field] = $event"
      :error="errors[field]"
      :parentProps="{ style: 'margin-bottom: 18px;' }"
      :props="{
        class: 'f1',
        type: field === 'password' ? 'password' : 'text',
        style: 'width: 100%;',
      }"
    />
    <br />
    <br />
    <tw-button class="contained" @click="save">Save</tw-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  mounted: function () {
    Object.keys(this.data).forEach((key) => {
      this.data[key] = this.$store.state.user[key];
    });
  },
  methods: {
    save() {
      this.$store.dispatch("SAVE_USER", this.data);
    },
  },
};
</script>
