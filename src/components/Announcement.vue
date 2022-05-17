<template>
  <div class="announcement-parent">
    <div class="announcement">
      <h1>New updates</h1>
      <h3>v{{ version }}</h3>
      <p class="notes">
        Welcome to Modchat version {{ version }}! We've got some great new
        features for you, including:<br/>
        <ul>
          <li><b>😊 Emoji picker:</b> Easily choose emojis for your messages</li>
          <li><b>🛡️ Better emoji filter:</b> We've added filters to emojis</li>
          <li><b>👤 Multiroom userpanel:</b> The Online Users panel now displays those only in the same room as you</li>
        </ul>
        Do you have a feature request?  Email <a href="mailto:hi@micahlindley.com" target="_blank">hi@micahlindley.com</a>!
      </p>
      <h2>Previous versions</h2>
      <h3 class="previous">v2.1.4</h3>
      <p class="notes previous">
        <ul class="previous">
          <li><b>🧭 Safari support:</b> Safari and all Webkit browsers are now supported</li>
          <li><b>📃 Multi-line messages:</b> Use the shift and enter keys to create new lines</li>
          <li><b>📱 Mobile users:</b> You can view online users on mobile with ease</li>
          <li><b>🎭 Roleplay room:</b> Visit the roleplay room if you're up for some RP</li>
          <li><b>⚙️ Settings improvements:</b> It's now clear which settings are in which states</li>
          <li><b>💬 Filter fixes:</b> You can now say the words "you'd" and "god" without being warned</li>
        </ul>
        <br/>
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

h3 {
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

h2,
.previous {
  color: var(--text-secondary) !important;
}

@media only screen and (max-width: 700px) {
  .announcement {
    max-width: calc(100% - 2rem);
    max-height: 100vh;
    height: 100vh;
    width: 100%;
    padding: 1em;
  }
}
</style>