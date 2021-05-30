<template>
  <div class="tw-modal">
    <div class="content">
      <h3>{{ $store.state.modal.title }}</h3>
      {{ $store.state.modal.message }}
      <br />
      <div class="flex aic jcsb">
        <template v-if="$store.state.modal.action !== null">
          <tw-button
            class="contained"
            @click="triggerAction($store.state.modal.action.onClick)"
          >
            {{ $store.state.modal.action.label }}
          </tw-button>
        </template>
        <tw-button class="outlined light" @click="$store.commit('CLOSE_MODAL')">
          Cancel
        </tw-button>
      </div>
    </div>
    <div class="backdrop" @click="$store.commit('CLOSE_MODAL')" />
  </div>
</template>

<script>
export default {
  methods: {
    triggerAction(action) {
      action({
        close: () => this.$store.commit("CLOSE_MODAL"),
      });
    },
  },
};
</script>
