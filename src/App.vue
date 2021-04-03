<template>
<NavBar room="general" class="navbar" />
<MessageRender class="messages" msg="Welcome to Your Vue.js App" />
</template>

<script>
import MessageRender from './components/MessageRender.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    MessageRender
  }
}
</script>

<style>
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #000;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 70px 1fr 100px;
}

.messages {
  grid-row: 2 / 3;
}

.navbar {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
}
</style>
