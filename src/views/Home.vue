<template>
  <div>
    <tw-nav />
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.$store.dispatch("GET_POSTS");
  },
};
</script>
