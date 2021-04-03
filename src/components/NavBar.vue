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
  <NavSearch class="search" />
  <img src="../assets/logo.png" alt="Modchat logo">
</div>
</template>

<script>
import NavSearch from './NavSearch.vue';

export default {
  name: 'NavBar',
  components: {
    NavSearch
  },
  props: {
    room: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  position: relative;
  background: var(--bg-secondary);
  display: flex;
}

img {
  position: absolute;
  right: 20px;
  height: 25px;
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
  border: solid var(--accent) 3px;
  border-radius: 0.5em;
  height: 20px;
  width: 20px;
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
