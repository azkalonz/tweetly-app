<template>
  <div class="tw-comment-container">
    <b class="author">{{ authorName }}</b>
    <br />
    <p class="message">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["message", "author"],
  computed: {
    authorName() {
      return this.author.firstName + " " + this.author.lastName;
    },
  },
};
</script>
