<template>
  <div
    id="tweet-input"
    class="tw-tweet-input"
    contenteditable="true"
    spellcheck="false"
    ref="tweetInputRef"
  ></div>
</template>

<script>
export default {
  mounted: function () {
    this.$refs["tweetInputRef"].focus();
  },
};
</script>
