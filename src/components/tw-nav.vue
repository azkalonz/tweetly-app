<template>
  <header class="flex jcsb aic">
    <img
      src="/src/assets/img/text-logo.svg"
      width="230"
      @click="$router.push('/')"
    />
    <tw-input
      label="Search"
      :value="$store.state.search"
      @input="$store.commit('SET_SEARCH', $event)"
      :error="null"
      :parentProps="{
        style: 'margin-bottom: 40px;',
      }"
      :props="{
        class: 'f1',
        type: 'text',
        style: 'width: 100%;',
      }"
    />
  </header>
</template>

<script>
export default {
  watch: {
    "$store.state.search": function (val) {
      if (val.length) {
        this.$store.commit("SET_VISIBLE_POSTS", "ALL");
      }
    },
  },
};
</script>

