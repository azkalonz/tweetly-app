<template>
  <div>
    <tw-client-card v-for="client in users" :key="client.id" :client="client" />
  </div>
</template>

<script>
import twClientCard from "../components/tw-client-card.vue";
import axios from "../utils/axios";

export default {
  components: { twClientCard },
  data() {
    return {
      users: [],
    };
  },
  mounted: function () {
    axios.get("/users").then(({ data }) => {
      this.users = data;
    });
  },
};
</script>
