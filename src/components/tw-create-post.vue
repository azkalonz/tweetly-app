<template>
  <div class="tw-create-post-container flex column aic jcc w-100">
    <div class="flex f1 column jce" v-if="!$store.state.isTweeting">
      <h3 @click="tweet">What's in your thoughts?</h3>
    </div>
    <tw-tweet-input v-if="$store.state.isTweeting" />
    <div class="w-100 flex aie jce f1">
      <tw-button
        class="contained light"
        style="width: 221px"
        @click="cancelTweet"
        v-if="$store.state.isTweeting"
      >
        Cancel
      </tw-button>
      &nbsp;&nbsp;
      <tw-button class="contained" style="width: 221px" @click="tweet">
        Tweet
      </tw-button>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";
import moment from "moment";

export default {
  methods: {
    tweet() {
      this.$store.commit("SET_IS_TWEETING", true);
      const input = document.querySelector("#tweet-input");
      if (input) {
        const message = input.innerHTML;
        axios
          .post(
            "/add-post",
            {
              client_id: this.$store.state.user.id,
              message,
              date: moment(),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(({ data }) => {
            this.$store.commit("ADD_POST", data);
            this.$store.commit("SET_VISIBLE_POSTS", "YOURS");
            this.$store.commit("SET_IS_TWEETING", false);
          });
      }
    },
    cancelTweet() {
      this.$store.commit("SET_IS_TWEETING", false);
    },
  },
  mounted: function () {
    this.$store.commit("SET_IS_TWEETING", false);
  },
};
</script>
