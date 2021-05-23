<template>
<div>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :placeholder="placeholder" :disabled="disabled" @keyup.enter="$emit('enterKey')">
  <span></span>
</div>
</template>

<script>
export default {
  name: 'TextBox',
  model: {
    props: 'title',
    event: 'change'
  },
  emits: ['enterKey'],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
}

input {
  width: max-width;
  color: white;
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom-color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
  padding: 0.3em;
}

input:focus {
  outline: none;
}

input:disabled {
  color: var(--text-primary);
}

input::placeholder {
  color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
}

span {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 1px;
  opacity: 0;
  background-color: var(--accent);
  transform-origin: center;
  transform: translate(-50%, 0) scaleX(0);
  transition: all 0.3s ease;
}

input:focus~span {
  transform: translate(-50%, 0) scaleX(1);
  opacity: 1;
}
</style>
