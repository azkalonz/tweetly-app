<template>
  <header>
    <img
      src="/src/assets/img/text-logo.svg"
      width="230"
      @click="$router.push('/')"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

