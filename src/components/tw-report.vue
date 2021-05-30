<template>
  <div class="tw-report">
    <div class="header flex jcsb ais">
      <div>
        <h3>Report ID: {{ report.id }}</h3>
        <b>{{ moment(report.date).format("hh:mm A LL") }}</b>
      </div>
      <div>
        <tw-button class="contained light" @click="deletePost"
          >Delete post</tw-button
        >
        <tw-button class="contained light" @click="deleteReport"
          >Disregard</tw-button
        >
      </div>
    </div>

    <div class="post">
      <a
        class="name"
        @click="$router.push('/profile/' + report.post.author.id)"
      >
        {{ report.post.author.firstName + " " + report.post.author.lastName }}
      </a>
      <b>{{ moment(report.post.date).format("hh:mm A LL") }}</b>
      <p v-html="report.post.message" />
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  props: ["report"],
  methods: {
    deleteReport() {
      this.$store.commit("OPEN_MODAL", {
        title: "Are you sure you want to disregard this report?",
        action: {
          label: "Disregard",
          onClick: ({ close }) => {
            axios.post("/delete-report/" + this.report.id).then(({ data }) => {
              alert(data);
              this.$emit("onremove", this.report);
              close();
            });
          },
        },
      });
    },
    deletePost() {
      this.$store.commit("OPEN_MODAL", {
        title: "Are you sure you want to delete this post?",
        action: {
          label: "Delete",
          onClick: ({ close }) => {
            axios.post("/delete-report/" + this.report.id);
            axios
              .delete("/delete-post/" + this.report.post.id)
              .then(({ data }) => {
                alert(data);
                this.$store.dispatch("DELETE_POST", this.report.post);
                this.$emit("onremove", this.report);
                close();
              });
          },
        },
      });
    },
  },
};
</script>
