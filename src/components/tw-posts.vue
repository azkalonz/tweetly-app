<template>
  <div>
    <div class="flex w-100 jcc" v-if="!posts.length">
      <h3 class="grey">No Avaiable Posts</h3>
    </div>
    <article class="tw-post-container" v-for="post in posts" :key="post.id">
      <section class="flex jcsb w-100">
        <div>
          <a @click="visitProfile(post.author.id)" class="author">{{
            post.author.firstName + " " + post.author.lastName
          }}</a>
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
          @click="report(post)"
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
  props: {
    visible: {
      required: true,
      default: "YOURS",
    },
    profileId: {
      required: false,
    },
  },
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
      if (!_.isNil(this.profileId)) {
        this.posts = this.filterPosts("PROFILE", posts);
      } else {
        this.posts = this.filterPosts(this.visible, posts);
      }
    },
    visible: function (visible) {
      this.posts = this.filterPosts(visible);
    },
  },
  methods: {
    report(post) {
      this.$store.commit("OPEN_MODAL", {
        title: `Report ${post.author.firstName}'s post`,
        action: {
          label: "Report",
          onClick: ({ close }) => {
            axios
              .post(`/report-post/${post.id}/${this.$store.state.user.id}`)
              .then(({ data }) => {
                alert(data);
                close();
              });
          },
        },
      });
    },
    visitProfile(id) {
      this.$router.push("/profile/" + id);
    },
    filterPosts(visible, posts) {
      if (!posts) {
        posts = this.originalPosts;
      }
      return this.originalPosts.filter((q) =>
        visible === "YOURS"
          ? q.author.id === this.$store.state.user.id
          : visible === "FOLLOWING"
          ? this.$store.state.user.following.findIndex(
              (qq) => qq.id === q.author.id
            ) >= 0
          : visible === "ALL"
          ? true
          : this.profileId === q.author.id
      );
    },
    deletePost(post) {
      this.$store.commit("OPEN_MODAL", {
        title: "Are you sure you want to delete your tweet?",
        action: {
          label: "Delete",
          onClick: ({ close }) => {
            this.$store.dispatch("DELETE_POST", post);
            close();
          },
        },
      });
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
