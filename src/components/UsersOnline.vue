(i<template>
<div class="sidebar">
  <UserStatus v-for="user in userList" :name="user.name" :pfp="user.scratch_picture" :key="user.name" online="true"></UserStatus>
</div>
</template>

<script>
import UserStatus from './UserStatus.vue';
export default {
  name: 'UsersOnline',
  props: {
    room: String
  }, 
  components: {
    UserStatus
  },
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.update();
    window.setInterval(this.update, 10000);
  }, 
  methods: {
    update() {
      fetch(`${window.serverHost}/api/onlineusers`).then((res) => {
        return res.json();
      }).then((data) => {
        const set = new Set(data.online.map(item => JSON.stringify(item)));
        this.userList = [...set].map(item => JSON.parse(item));
      })
    }
  }
} 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  align-items: center;
}

.user:first-of-type {
  margin-top: 90px;
}

.coming-soon {
  align-self: center;
  color: var(--text-secondary);
}

@media only screen and (max-width: 700px) {
  .sidebar {
    opacity: 0;
    display: none;
  }
}
</style>