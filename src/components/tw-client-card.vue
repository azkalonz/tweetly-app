<template>
  <div class="tw-client-card flex aic jcc">
    <div class="name flex column aic jcc w-100">
      <h3>{{ client.lastName + ", " + client.firstName }}</h3>
      <div class="flex jcsb">
        <span
          >{{ _.uniqBy(client.followers, (e) => e.id).length }} followers</span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          >{{ _.uniqBy(client.following, (e) => e.id).length }} following</span
        >
      </div>
    </div>
    <div class="follow-btn">
      <tw-button
        :class="followed ? 'contained light' : 'contained'"
        @click="followed ? unfollow() : follow()"
      >
        {{ followed ? "following" : "follow" }}
      </tw-button>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  data() {
    return {
      followed: false,
    };
  },
  props: {
    client: {
      required: false,
      default: {
        name: "Client Name",
        following: 0,
        followers: 0,
      },
    },
  },
  mounted: function () {
    this.updateFollowingStatus();
  },
  watch: {
    "$store.state.user.following": function () {
      this.updateFollowingStatus();
    },
  },
  methods: {
    updateFollowingStatus() {
      this.followed =
        this.$store.state.user.following.findIndex(
          (q) => q.id === this.$route.params.id
        ) >= 0;
    },
    unfollow() {
      axios
        .post(`/unfollow/${this.$route.params.id}/${this.$store.state.user.id}`)
        .then(({ data }) => {
          if (data && data.id) {
            this.client.followers -= 1;
            this.$store.commit("UNFOLLOW", data);
          }
        });
    },
    follow() {
      axios
        .post(`/follow/${this.$route.params.id}/${this.$store.state.user.id}`)
        .then(({ data }) => {
          if (data && data.id) {
            this.client.followers += 1;
            this.$store.commit("FOLLOW", data);
          }
        });
    },
  },
};
</script>
