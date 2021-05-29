<template>
  <div>
    <tw-client-card :client="client" v-if="client !== null" />
    <tw-posts visible="CLIENT" :profileId="$route.params.id" />
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  data() {
    return {
      client: null,
    };
  },
  mounted: function () {
    axios.get("/user/" + this.$route.params.id).then(({ data }) => {
      if (data && data.id) {
        this.client = data;
      }
    });
    this.$store.commit("SET_VISIBLE_POSTS", "CLIENT");
  },
};
</script>
