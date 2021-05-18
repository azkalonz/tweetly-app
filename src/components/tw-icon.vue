<template>
  <span>
    <img :src="`/src/assets/icon/${icon}.svg`" width="auto" height="20" />
  </span>
</template>

<script>
export default {
  props: ["icon"],
};
</script>
