<template>
<a href="#" class="btn" :title="title">
  <slot></slot>
</a>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    text: {
      type: String,
      default: 'BUTTON'
    },
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>

<style scoped>
.btn {
  background: var(--accent);
  color: white;
  border-radius: 4em;
  font-size: 0.8em;
  text-decoration: none;
  padding: 0.8em 1.2em;
  transition: all 0.2s;
  box-shadow: 0 1px 0.1em rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  will-change: box-shadow, filter;
}

.btn:hover {
  filter: brightness(0.9);
  transition: all 0.2s;
  box-shadow: 0 2px 0.7em rgba(0, 0, 0, 0.4);
}
</style>
