<template>
  <div class="w-100">
    <tw-create-post />
    <br />
    <tw-posts visible="YOURS" v-if="$store.state.visiblePosts === 'YOURS'" />
    <tw-posts
      visible="FOLLOWING"
      v-if="$store.state.visiblePosts === 'FOLLOWING'"
    />
    <tw-posts visible="ALL" v-if="$store.state.visiblePosts === 'ALL'" />
  </div>
</template>
