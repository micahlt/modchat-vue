<template>
<div class="message">
  <a :href="`https://scratch.mit.edu/users/${msg.username}`" class="username" :title="`Visit ${msg.username} on Scratch`">
    <img :src="msg.profilePicture" class="pic" :alt="msg.username">
  </a>
  <div class="gridcol-2">
    <a :href="`https://scratch.mit.edu/users/${msg.username}`" class="username" :title="`Visit ${msg.username} on Scratch`">{{ msg.username }}</a>
    <div v-if="msg.type == 'text'" class="message-content">{{ msg.content }}</div>
    <img v-else src="#" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  display: grid;
  grid-template-columns: auto auto;
  width: max-content;
  max-width: 95%;
  margin-right: auto;
  margin-bottom: 10px;
}

.pic {
  grid-column: 1 / 1;
  height: 35px;
  width: 35px;
  border-radius: 100%;
  background: white;
  border: solid 2px var(--outline);
}

.username {
  color: var(--text-secondary);
  font-weight: bolder;
  line-height: 1.5em;
  text-decoration: none;
}

.message-content {
  color: var(--text-primary);
  word-wrap: break-word;
}

.gridcol-2 {
  margin-left: 15px;
  grid-column: 2 / 2;
  text-align: left;
}
</style>
