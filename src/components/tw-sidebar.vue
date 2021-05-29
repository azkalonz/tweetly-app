<template>
  <div class="tw-sidebar-container">
    <div class="flex jcsb aic">
      <div>
        <h3>
          {{ clientName }}
        </h3>
      </div>
      <div class="flex column aic">
        <tw-button class="contained sm light" style="margin-bottom: 13px">
          <tw-icon icon="tweet" />
        </tw-button>
        <tw-button @click="logout" class="contained sm light">
          <tw-icon icon="logout" />
        </tw-button>
      </div>
    </div>
    <br />
    <div class="flex w-100">
      <tw-button class="contained light f1" style="margin-right: 6px">
        {{ followers }}<br />
        followers
      </tw-button>
      <tw-button class="contained light f1">
        {{ following }}<br />
        following
      </tw-button>
    </div>
    <br />
    <hr />
    <br />
    <div class="flex column aiss w-100">
      <tw-button
        @click="yours"
        :class="
          ['f1', 'light']
            .concat([
              $store.state.visiblePosts === 'YOURS' ? 'contained' : 'outlined',
            ])
            .join(' ')
        "
      >
        Yours
      </tw-button>
      <br />
      <tw-button
        @click="notYours"
        :class="
          ['f1', 'light']
            .concat([
              $store.state.visiblePosts === 'FOLLOWING'
                ? 'contained'
                : 'outlined',
            ])
            .join(' ')
        "
      >
        Following
      </tw-button>
      <br />
      <tw-button
        @click="all"
        :class="
          ['f1', 'light']
            .concat([
              $store.state.visiblePosts === 'ALL' ? 'contained' : 'outlined',
            ])
            .join(' ')
        "
      >
        EVERYONE
      </tw-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.replace("/login");
    },
    yours() {
      this.$router.push("/");
      this.$store.commit("SET_VISIBLE_POSTS", "YOURS");
    },
    notYours() {
      this.$router.push("/");
      this.$store.commit("SET_VISIBLE_POSTS", "FOLLOWING");
    },
    all() {
      this.$router.push("/");
      this.$store.commit("SET_VISIBLE_POSTS", "ALL");
    },
  },
  computed: {
    clientName() {
      const { firstName, lastName } = this.$store.state.user;
      return lastName + ", " + firstName;
    },
    followers() {
      const { followers } = this.$store.state.user;
      return (
        (followers &&
          _.uniqBy(followers, function (e) {
            return e.id;
          }).length) ||
        0
      );
    },
    following() {
      const { following } = this.$store.state.user;
      return (
        (following &&
          _.uniqBy(following, function (e) {
            return e.id;
          }).length) ||
        0
      );
    },
  },
};
</script>
