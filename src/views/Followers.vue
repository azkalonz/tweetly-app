<template>
  <div>
    <h3>Followers</h3>
    <br />
    <br />
    <tw-client-card
      v-for="client in following"
      :key="client.id"
      :client="client"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      following: [],
    };
  },
  mounted: function () {
    this.following = [...this.$store.state.user.followers];
  },
};
</script>
