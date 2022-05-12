<template>
  <div class="settings">
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="Toggle theme"
        @click.prevent="$emit('changeTheme')"
        ><i data-eva="moon-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>Theme</p>
    </div>
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="Toggle notifications"
        @click.prevent="$emit('changeNotifs')"
        ><i data-eva="bell-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>Notifications are {{ notifStatus }}</p>
    </div>
  </div>
</template>

<script>
import * as eva from "eva-icons"
export default {
  emits: ["changeTheme", "changeNotifs"],
  mounted() {
    eva.replace()
  },
  data() {
    let textColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--text-primary"
    )
    return {
      textColor,
      notifStatus: JSON.parse(window.localStorage.getItem("notifs")) || "off",
    }
  },
}
</script>

<style scoped>
.settings {
  position: absolute;
  background: var(--bg-tertiary);
  right: 5rem;
  top: 2rem;
  z-index: 3;
  box-shadow: 0 5px 10px rgb(0 0 0 / 50%);
  border-radius: 0.3rem;
  padding: 1rem;
}

.opt {
  display: flex;
  color: var(--text-primary);
  align-items: center;
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}

.opt:last-of-type {
  margin-bottom: 0;
}

svg.eva {
  display: inline-block;
  fill: var(--text-primary);
  height: 1em;
  width: 1em;
  transform: translateY(2px);
  margin-right: 1rem;
}
</style>