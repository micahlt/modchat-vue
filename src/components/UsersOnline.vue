<template>
<div class="sidebar">
  <UserStatus class="user" name="-Archon-" status="online" />
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
  padding-top: 130px;
}
</style>
