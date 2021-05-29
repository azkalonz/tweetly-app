<template>
  <div>
    <div class="flex w-100 jcc" v-if="!posts.length">
      <h3 class="grey">No Avaiable Posts</h3>
    </div>
    <article class="tw-post-container" v-for="post in posts" :key="post.id">
      <section class="flex jcsb w-100">
        <div>
          <a class="author">{{ post.author.name }}</a>
          <span class="date">{{ moment(post.date).fromNow() }}</span>
        </div>
        <tw-button
          v-if="post.author.id == $store.state.user.id"
          @click="deletePost(post)"
          class="contained sm light"
          >Delete</tw-button
        >
        <tw-button
          v-if="post.author.id != $store.state.user.id"
          class="contained sm light"
          >Report</tw-button
        >
      </section>
      <main v-html="post.message" />
      <section class="flex aic">
        <tw-button
          @click="likePost(post.id)"
          class="outlined light f1"
          style="margin-right: 10px"
          ><tw-icon icon="likes" />&nbsp; {{ post.likes }}</tw-button
        >
        <tw-button class="outlined light f1"
          ><tw-icon icon="comments" />&nbsp;{{
            post.comments.length
          }}</tw-button
        >
      </section>
      <hr />
      <section style="max-height: 300px; overflow-y: auto">
        <tw-comment
          v-for="comment in post.comments.reverse()"
          :key="comment.id"
          :comment="comment"
          :postId="post.id"
        />
      </section>
      <div class="flex aic">
        <tw-comment-input style="width: 100%" :id="post.id" />
        &nbsp;&nbsp;
        <tw-button class="contained" @click="comment(post.id)"
          >Comment</tw-button
        >
      </div>
    </article>
  </div>
</template>

<script>
import axios from "../utils/axios";
import moment from "moment";

export default {
  props: ["visible"],
  data() {
    return {
      postFetched: false,
      posts: [],
      originalPosts: [],
    };
  },
  mounted: function () {
    this.$store.dispatch("GET_POSTS");
  },
  watch: {
    "$store.state.posts": function (posts) {
      this.originalPosts = posts;
    },
    visible: function (val) {
      this.posts = this.originalPosts.filter((q) =>
        val === "YOURS"
          ? q.author.id === this.$store.state.user.id
          : this.$store.state.user.following.findIndex(
              (qq) => qq.id === q.author.id
            ) >= 0
      );
    },
  },
  methods: {
    deletePost(post) {
      this.$store.dispatch("DELETE_POST", post);
    },
    likePost(post_id) {
      axios.post("/like-post/" + post_id).then(({ data }) => {
        if (data === "Success") {
          this.$store.commit("INCREMENT_LIKES", post_id);
        }
      });
    },
    comment(post_id) {
      const input = document.querySelector(`#comment-input-${post_id}`);
      if (input) {
        const message = input.innerHTML;
        axios
          .post(
            "/add-comment",
            {
              client_id: this.$store.state.user.id,
              message,
              post_id,
              date: moment(),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(({ data }) => {
            this.$store.commit("ADD_COMMENT", {
              post_id,
              comment: data,
            });
            input.innerHTML = "";
            input.unfocus();
          });
      }
    },
  },
};
</script>
