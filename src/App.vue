<template>
  <div id="app">
    <tw-loader />
    <component :is="layout">
      <transition
        :name="transition.name"
        :duration="transition.duration || 500"
      >
        <router-view />
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.changePageTitle();
    if (_.isNil(this.$store.state.user)) {
      if (this.$route.path !== "/landing") this.$router.replace("/landing");
      this.$store.commit("SET_LOADING", false);
    } else if (this.$route.path !== "/") {
      this.$router.replace("/");
    }
  },
  watch: {
    "$route.path": function () {
      this.changePageTitle();
    },
  },
  methods: {
    changePageTitle() {
      document.title = "Tweetly | " + this.$route.name;
    },
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
    transition() {
      return this.$route.meta.transition || { duration: 0, name: "" };
    },
  },
};
</script>


