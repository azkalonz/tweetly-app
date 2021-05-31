<template>
  <div class="account-page-container">
    <h3>Account Settings</h3>
    <br />
    <input type="file" ref="profilepic" />
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
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
      const file = this.$refs["profilepic"].files[0];
      toBase64(file).then((image) => {
        this.data.image = image;
        this.$store.dispatch("SAVE_USER", this.data);
      });
    },
  },
};
</script>
