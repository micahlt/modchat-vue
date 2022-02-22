<template>
<div class="user-status" @click="openProfile" :title="titleAttribute" @mouseenter="togglePopup(true)" @mouseleave="togglePopup(false)">
  <img :src="pfp" :alt="name">
  <span v-if="online" class="status active">
  </span>
  <span v-if="!online" class="status inactive">
  </span>
  <div class="user-content">
    <span class="username">{{ name }}</span>
    <br>
    <span class="ocular">{{ status }}</span>
  </div>
  <transition name="fade">
    <UserPopup :name="name" :image="pfp" :status="status" v-if="hovered" />
  </transition>
</div>
</template>

<script>
import UserPopup from './UserPopup.vue';
export default {
  name: 'UserStatus',
  components: {
    UserPopup
  },
  props: {
    name: String,
    online: Boolean,
    pfp: String
  },
  methods: {
    togglePopup(b) {
      this.hovered = b;
    },
    openProfile() {
      window.open(`https://scratch.mit.edu/users/${this.name}`)
    },
    loadOcular() {
      fetch(`https://my-ocular.jeffalo.net/api/user/${this.name}`)
      .then((res) => {
        return res.json();
      }).then((data) => {
        if (data.error || data.status == '') {
          this.status = 'No Ocular status';
        } else {
          this.status = data.status;
        }
      });
    }
  },
  data() {
    return {
      titleAttribute: `Visit ${this.name} on Scratch`,
      status: '',
      hovered: false
    }
  },
  mounted() {
    this.loadOcular();
    window.setInterval(this.loadOcular, 60000); // Keep this interval low so Jeffalo doesn't get spammed with API requests
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
  width: 80%;
  border-radius: 0.5em;
  height: max-content;
  justify-self: center;
  margin-bottom: 10px;
}

.user-status img {
  height: 30px;
  width: 30px;
  border-radius: 100%;
}

.username {
  color: var(--text-primary);
  margin-top: 7px;
  font-size: 0.8em;
  font-weight: bold;
}

.status {
  height: 8px;
  width: 8px;
  border-radius: 100%;
  position: absolute;
  top: 34px;
  left: 33px;
}

.active {
  background: var(--good);
  box-shadow: 0 0 10px var(--good);
}

.inactive {
  background: var(--bad);
  box-shadow: 0 0 10px var(--bad);
}

.user-content {
  display: block;
  text-align: left;
  margin-left: 10px;
  width: max-content;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1em;
}

.ocular {
  font-size: 0.8em;
  color: var(--text-secondary);
  white-space: nowrap;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
</style>
