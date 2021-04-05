<template>
<div class="user-status" @click="openProfile" :title="titleAttribute">
  <img src="https://cdn2.scratch.mit.edu/get_image/user/41216777_60x60.png" alt="">
  <span v-if="online" class="status active">
  </span>
  <span v-if="!online" class="status inactive">
  </span>
  <span class="username">{{ name }}</span>
</div>
</template>

<script>
export default {
  name: 'UserStatus',
  props: {
    name: String,
    online: Boolean
  },
  methods: {
    openProfile() {
      window.open(`https://scratch.mit.edu/users/${this.name}`)
    }
  },
  data() {
    return {
      titleAttribute: `Visit ${this.name} on Scratch`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-status {
  cursor: pointer;
  position: relative;
  background: var(--bg-secondary);
  display: inline-flex;
  background: var(--bg-tertiary);
  padding: 12px;
  width: 70%;
  border-radius: 0.5em;
}

.user-status img {
  height: 30px;
  width: 30px;
  border-radius: 100%;
}

.username {
  color: var(--text-primary);
  margin-left: 7px;
  margin-top: 7px;
  font-size: 0.8em;
  font-weight: bold;
}

.status {
  height: 10px;
  width: 10px;
  border-radius: 100%;
  transform: translate(-9px, 23px);
}

.active {
  background: var(--good);
  box-shadow: 0 0 10px var(--good);
}

.inactive {
  background: var(--bad);
  box-shadow: 0 0 10px var(--bad);
}
</style>
