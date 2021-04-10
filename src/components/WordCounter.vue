<template>
<div class="wrapper">
  <div contenteditable class="input"></div>
</div>
</template>

<script>
export default {
  name: 'MessageInput',
  components: {},
  emits: ["sendMessage"],
  data() {
    return {

    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
}

.lightgray {
  color: var(--text-secondary)
}

.active {
  height: 8em !important;
  opacity: 1 !important;
  transition: height 0.2s 0.5s, opacity 0.3s 0.5s;
}

.suggestion {
  color: var(--text-primary);
  text-align: left;
  margin: 0;
  padding: 10px;
}

a {
  color: white;
  text-decoration: none;
}

.suggestion:hover {
  border-radius: 0.4em;
  background: var(--bg-tertiary);
}

.input {
  text-align: left;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1;
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  width: calc(100vw - 310px);
  padding: 0.8em;
  padding-left: 0.7em;
  background-color: var(--bg-secondary);
  border-style: solid;
  border-color: var(--outline);
  border-width: 2px;
  border-radius: 0.4em;
  color: var(--text-primary);
  transition: width 0.4s 0.4s, box-shadow 0.3s, border-color 0.4s,
    background-color 0.4s;
}

.input:focus {
  outline: none;
  transition: width 0.2s, box-shadow 0.2s, border-color 0.2s, background-color 0.2s;
  width: 20em;
  background-color: var(--bg-tertiary);
  box-shadow: var(--shadow);
  border-bottom-color: var(--accent);
}

input::placeholder {
  color: var(--outline);
  font-size: 0.9em;
  padding-left: 0.5em;
}
</style>
