<template>
<input type="text" name="" value="" placeholder="create or join a room...">
</template>

<script>
export default {
  name: 'NavSearch',
  props: {
    room: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-family: 'Inter', sans-serif;
  font-size: 1em;
  height: 2em;
  width: 11em;
  padding: 0.05em;
  padding-left: 0.4em;
  background: var(--bg-secondary);
  border-style: solid;
  border-color: var(--outline);
  border-width: 3px;
  border-radius: 0.5em;
  color: var(--text-primary);
  transition: width 0.4s, box-shadow 0.4s, border-color 0.4s;
}

input:focus {
  outline: none;
  transition: width 0.2s, box-shadow 0.2s, border-color 0.2s;
  width: 20em;
  box-shadow: var(--shadow);
  border-bottom-color: var(--accent);
}

input::placeholder {
  color: var(--outline);
}
</style>
