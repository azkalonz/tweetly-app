<template>
  <button
    class="tw-button aic jcc"
    style="display: inline-flex; justify-content: center"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

