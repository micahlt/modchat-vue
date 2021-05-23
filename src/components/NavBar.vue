<template>
<div class="nav">
  <div class="room-name">
    <div class="letter">
      {{ room.toUpperCase().charAt(0) }}
    </div>
    <span class="full-name">
      {{ room.toLowerCase() }}
    </span>
  </div>
  <NavSearch class="search" @roomSearch="roomSearch" @logOut="logOut" />
  <div class="logo"></div>
  <div class="nav-options">
    <a href="#" title="Notifications"><i data-eva="bell-outline" :data-eva-fill="textColor"></i></a>
    <a href="#" title="Change Theme" @click="changeTheme"><i data-eva="brush-outline" :data-eva-fill="textColor"></i></a>
    <a href="#" title="Log Out" @click="logOut"><i data-eva="log-out" :data-eva-fill="textColor"></i></a>
  </div>
</div>
</template>

<script>
import NavSearch from './NavSearch.vue';
import * as eva from 'eva-icons';
export default {
  name: 'NavBar',
  emits: ["roomSearch"],
  components: {
    NavSearch
  },
  props: {
    room: String
  },
  mounted() {
    eva.replace();
  },
  data() {
    let textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    return {
      textColor
    }
  },
  methods: {
    roomSearch(name) {
      this.$emit("roomSearch", name);
    },
    logOut() {
      window.localStorage.setItem('user', `{
        "name": "Unauthed User",
        "token": 0
      }`);
      window.location.reload();
    },
    changeTheme() {
      switch (window.localStorage.getItem('theme')) {
        case ('default'): {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            window.localStorage.setItem('theme', 'light');
          } else {
            window.localStorage.setItem('theme', 'dark');
          }
          window.location.reload();
          break;
        }
        case ('light'): {
          window.localStorage.setItem('theme', 'dark');
          window.location.reload();
          break;
        }
        case ('dark'): {
          window.localStorage.setItem('theme', 'light');
          window.location.reload();
          break;
        }
      }
      eva.replace();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-options {
  position: absolute;
  right: 230px;
  height: 25px;
  top: 50%;
  transform: translateY(-50%);
  border-right: solid 2px var(--outline);
  padding-right: 30px;
}

.nav-options a {
  padding: 10px;
}

.nav-options svg {
  transition: fill 0.1s;
}

.nav-options svg:hover {
  fill: var(--text-secondary);
  transition: fill 0.1s;
}

i {
  color: var(--text-primary);
}

.nav {
  position: relative;
  background: var(--bg-secondary);
  display: flex;
}

.logo {
  background-image: var(--logo);
  background-size: contain;
  position: absolute;
  right: 32px;
  height: 25px;
  width: 175px;
  top: 50%;
  transform: translateY(-50%);
}

.room-name {
  display: flex;
  position: relative;
}

.letter {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
  padding: 10px;
  margin: 12px;
  border: solid var(--accent) 2px;
  border-radius: 0.4em;
  height: 20px;
  width: 20px;
  user-select: none;
}

.letter::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: 11px;
  left: 40px;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 9px solid var(--accent);
}

.full-name {
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.3em;
  margin-top: 20px;
  margin-left: 10px;
}

.search {
  margin-top: 15px;
  margin-left: 40px;
}
</style>
