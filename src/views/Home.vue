<template>
  <div class="w-100">
    <br />
    <div class="flex ais w-100">
      <tw-sidebar />
      <div class="f1">
        <tw-create-post />
        <br />
        <tw-posts
          visible="YOURS"
          v-if="$store.state.visiblePosts === 'YOURS'"
        />
        <tw-posts
          visible="FOLLOWING"
          v-if="$store.state.visiblePosts === 'FOLLOWING'"
        />
      </div>
    </div>
  </div>
</template>
