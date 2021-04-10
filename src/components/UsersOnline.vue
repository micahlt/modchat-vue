<template>
<div class="sidebar">
  <span class="coming-soon">The online user sidebar<br>is coming soon!</span>
</div>
</template>

<script>
export default {
  name: 'UsersOnline',
  props: {
    room: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  background: var(--bg-secondary);
  display: grid;
}

.user:first-of-type {
  margin-top: 90px;
}

.coming-soon {
  align-self: center;
  color: var(--text-secondary);
}
</style>
