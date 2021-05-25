<template>
  <div
    :id="`comment-input-${id}`"
    contenteditable="true"
    class="tw-comment-input"
    ref="createCommentRef"
    spellcheck="false"
  ></div>
</template>

<script>
export default {
  props: ["id"],
  mounted: function () {
    this.$refs["createCommentRef"].focus();
  },
};
</script>
