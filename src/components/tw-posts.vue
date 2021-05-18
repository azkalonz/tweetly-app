<template>
  <div>
    <div class="flex w-100 jcc" v-if="!posts.length">
      <h3 class="grey">No Avaiable Posts</h3>
    </div>
    <article class="tw-post-container" v-for="post in posts" :key="post.id">
      <section class="flex jcsb w-100">
        <div>
          <a class="author">{{ post.author.name }}</a>
          <span class="date">{{ moment(post.date).format("LL") }}</span>
        </div>
        <tw-button
          v-if="post.author.id == $store.state.user.id"
          @click="$store.dispatch('DELETE_POST', post)"
          class="contained sm light"
          >Delete</tw-button
        >
        <tw-button
          v-if="post.author.id != $store.state.user.id"
          @click="alert()"
          class="contained sm light"
          >Report</tw-button
        >
      </section>
      <main>
        {{ post.message }}
      </main>
      <section class="flex aic">
        <tw-button
          v-if="post.author.id != $store.state.user.id"
          @click="alert()"
          class="outlined light f1"
          style="margin-right: 10px"
          ><tw-icon icon="likes" />&nbsp; {{ post.likes }}</tw-button
        >
        <tw-button
          v-if="post.author.id != $store.state.user.id"
          @click="alert()"
          class="outlined light f1"
          ><tw-icon icon="comments" />&nbsp;{{
            post.comments.length
          }}</tw-button
        >
      </section>
      <hr />
      <section>
        <tw-comment
          v-for="comment in post.comments"
          :key="comment.id"
          :message="comment.message"
          :author="comment.author"
        />
      </section>
    </article>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.$store.dispatch("GET_POSTS");
  },
  computed: {
    posts() {
      const {
        visiblePosts,
        user: { id },
      } = this.$store.state;
      console.log(visiblePosts, id);
      return this.$store.state.posts
        .filter((q) =>
          visiblePosts === "YOURS" ? q.author.id === id : q.author.id !== id
        )
        .map((q) => ({
          ...q,
          author: {
            ...q.author,
            name: q.author.lastName + ", " + q.author.firstName,
          },
        }));
    },
  },
};
</script>
