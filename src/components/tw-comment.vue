<template>
  <div class="tw-comment-container">
    <b class="author" @click="visitProfile">{{ authorName }}</b
    >&nbsp;<a class="date">{{ moment(comment.date).fromNow() }}</a>
    <tw-button
      v-if="comment.author.id == $store.state.user.id"
      @click="
        $store.dispatch('DELETE_COMMENT', {
          comment,
          postId,
        })
      "
      class="contained sm light"
      >Delete</tw-button
    >
    <br />
    <p class="message">
      {{ comment.message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["comment", "postId"],
  computed: {
    authorName() {
      return this.comment.author.firstName + " " + this.comment.author.lastName;
    },
  },
  methods: {
    visitProfile() {
      this.$router.push("/profile/" + this.comment.author.id);
    },
  },
};
</script>
