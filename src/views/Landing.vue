<template>
  <div style="text-align: center">
    <div>
      <img src="/src/assets/img/logo.svg" />
    </div>
    <div>
      <h1>Share your words today</h1>
    </div>
    <div class="flex" style="min-width: 470px; margin-top: 80px">
      <tw-button
        class="contained lg f1"
        style="margin-right: 10px"
        @click="$router.push('/register')"
      >
        Create an Account
      </tw-button>
      <tw-button class="outlined lg f1" @click="$router.push('/login')">
        Login
      </tw-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
