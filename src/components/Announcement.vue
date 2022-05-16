<template>
  <div class="announcement-parent">
    <div class="announcement">
      <h1>New updates</h1>
      <h2>v{{ version }}</h2>
      <p class="notes">
        Welcome to Modchat version {{ version }}! We've got some great new
        features for you, including:<br/>
        <ul>
          <li><b>🧭 Safari support:</b> Safari and all Webkit browsers are now supported</li>
          <li><b>📃 Multi-line messages:</b> Use the shift and enter keys to create new lines</li>
          <li><b>🎭 Roleplay room:</b> Visit the roleplay room if you're up for some RP</li>
          <li><b>⚙️ Settings improvements:</b> It's now clear which settings are in which states</li>
          <li><b>💬 Filter fixes:</b> You can now say the words "you'd" and "god" without being warned</li>
        </ul>
        Do you have a feature request?  Email <a href="mailto:hi@micahlindley.com" target="_blank">hi@micahlindley.com</a>!
      </p>
      <PrimaryButton @click.prevent="close" title="Close modal">Start chatting</PrimaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "./PrimaryButton.vue"
export default {
  emits: ["close"],
  components: {
    PrimaryButton,
  },
  props: {
    version: String,
  },
  methods: {
    close() {
      window.localStorage.setItem("v", this.version)
      this.$emit("close")
    },
  },
}
</script>

<style scoped>
.announcement-parent {
  height: 100vh;
  width: 100%;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 3;
  background: rgba(60, 48, 255, 0.4);
  display: grid;
  place-items: center;
  backdrop-filter: blur(3px);
}

.announcement-parent:active .announcement {
  transform: scale(1.02);
}

.announcement {
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 5px;
  padding: 1rem 1.5rem;
  padding-bottom: 1.75rem;
  text-align: left;
  width: 670px;
  max-width: 85vw;
  transition: transform 0.1s;
}

h2 {
  font-size: 0.9em;
  margin-bottom: 0.5rem;
}

ul {
  margin-top: 0.5em;
  margin-left: 1rem;
  margin-bottom: 0.5em;
  list-style-position: inside;
}

a {
  color: var(--text-primary);
}

p {
  margin-bottom: 1rem;
}
</style>