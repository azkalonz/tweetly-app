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
    <div class="follow-btn flex aic">
      <tw-button
        v-if="$route.params.id !== $store.state.user.id"
        :class="followed ? 'contained light' : 'contained'"
        @click="followed ? unfollow() : follow()"
      >
        {{ followed ? "following" : "follow" }}
      </tw-button>
      &nbsp;
      <tw-button
        v-if="$store.state.user.role === 'ADMIN'"
        :class="banned ? 'contained light' : 'outlined light'"
        @click="banned ? unban() : banuser()"
      >
        {{ banned ? "Banned" : "Ban" }}
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
      banned: false,
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
    this.banned = this.client.banned;
  },
  watch: {
    "$store.state.user.following": function () {
      this.updateFollowingStatus();
    },
  },
  methods: {
    banuser() {
      axios.post("/ban/" + this.client.id).then(({ data }) => {
        this.banned = true;
      });
    },
    unban() {
      axios.post("/unban/" + this.client.id).then(({ data }) => {
        this.banned = false;
      });
    },
    updateFollowingStatus() {
      this.followed =
        this.$store.state.user.following.findIndex(
          (q) => q.id === this.client.id
        ) >= 0;
    },
    unfollow() {
      axios
        .post(`/unfollow/${this.client.id}/${this.$store.state.user.id}`)
        .then(({ data }) => {
          if (data && data.id) {
            this.client.followers -= 1;
            this.$store.commit("UNFOLLOW", data);
          }
        });
    },
    follow() {
      axios
        .post(`/follow/${this.client.id}/${this.$store.state.user.id}`)
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
