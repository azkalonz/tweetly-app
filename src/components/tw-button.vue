<template>
  <button class="tw-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

