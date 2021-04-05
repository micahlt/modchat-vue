<template>
<div class="sidebar">
  <UserStatus class="user" name="-Archon-" :online="false" />
</div>
</template>

<script>
import UserStatus from './UserStatus.vue';

export default {
  name: 'UsersOnline',
  components: {
    UserStatus
  },
  props: {
    room: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  background: var(--bg-secondary);
}

.user:first-of-type {
  margin-top: 90px;
}
</style>
