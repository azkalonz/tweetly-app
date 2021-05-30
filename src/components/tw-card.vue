<template>
  <div class="tw-card flex aic jcc f1">
    <div style="text-align: center">
      <h2>{{ count }}</h2>
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "count"],
};
</script>
