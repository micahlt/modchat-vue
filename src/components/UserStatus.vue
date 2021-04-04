<template>
<div class="user-status">
  <img src="https://cdn2.scratch.mit.edu/get_image/user/41216777_60x60.png" alt="">
  {{ name }}
</div>
</template>

<script>
export default {
  name: 'UserStatus',
  props: {
    name: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-status {
  background: var(--bg-secondary);
  display: inline-flex;
}

.user-status img {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
