<template>
<div class="user-popup">
  <img :src="image" class="pfp">
  <h1>{{ name }}</h1>
  <div class="ocular-title">OCULAR STATUS</div>
  <div class="user-status">
    {{ status }}
  </div>
</div>
</template>

<script>
export default {
  name: 'UserPopup',
  props: {
    name: String,
    status: String,
    image: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-popup {
  z-index: 2;
  position: absolute;
  width: 200px;
  height: max-content;
  background: var(--bg-tertiary);
  top: 4.2em;
  right: 0;
  border-radius: 0.3em;
  box-shadow: var(--shadow);
  padding: 1em;
}

h1 {
  margin-top: .5em;
  color: var(--text-primary);
  font-size: 1.25em;
}

.pfp {
  border-radius: 60px;
  height: 60px;
  width: 60px;
}

.user-status {
  margin: 0.5em;
  font-size: 0.8em;
  color: var(--text-secondary);
  border-radius: 0.4em;
  background: var(--bg-secondary);
  padding: 0.6em;
  word-wrap: break-word;
}

.ocular-title {
  padding-top: 1em;
  color: var(--light-accent);
  font-size: 0.6em;
}
</style>
