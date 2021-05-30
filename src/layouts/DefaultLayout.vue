<template>
  <div style="margin: 0 auto; width: 1100px; max-width: 80%">
    <tw-nav />
    <div class="w-100">
      <br />
      <div class="flex ais w-100">
        <tw-sidebar />
        <div class="f1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
