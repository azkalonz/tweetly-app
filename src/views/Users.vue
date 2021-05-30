<template>
  <div>
    <div class="flex aic jcsb">
      <tw-card title="Total Users" :count="totalUsers" />
      &nbsp;&nbsp;
      <tw-card title="Active Users" :count="activeUsers" />
    </div>
    <tw-client-card v-for="client in users" :key="client.id" :client="client" />
  </div>
</template>

<script>
import TwCard from "../components/tw-card.vue";
import twClientCard from "../components/tw-client-card.vue";
import axios from "../utils/axios";

export default {
  components: { twClientCard, TwCard },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    activeUsers() {
      return this.users.filter((q) => !q.banned).length;
    },
    totalUsers() {
      return this.users.length;
    },
  },
  mounted: function () {
    axios.get("/users").then(({ data }) => {
      this.users = data;
    });
  },
};
</script>
