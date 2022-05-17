<template>
  <div class="settings">
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="Toggle theme"
        @click.prevent="changeTheme"
        ><i data-eva="moon-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>
        Theme: <span>{{ currentTheme }}</span>
      </p>
    </div>
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="Toggle notifications"
        @click.prevent="changeNotifs"
        ><i data-eva="bell-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>
        Notifications: <span>{{ notifStatus }}</span>
      </p>
    </div>
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="Toggle message grouping"
        @click.prevent="changeFrame"
        ><i data-eva="menu-2-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>
        Message grouping:
        <span>{{ frameStatus == "true" ? "off" : "on" }}</span>
      </p>
    </div>
    <div class="opt">
      <a
        href="#"
        target="_self"
        title="View changelog"
        @click.prevent="viewChanges"
        ><i data-eva="clock-outline" :data-eva-fill="textColor"></i
      ></a>
      <p>Show changelog</p>
    </div>
  </div>
</template>

<script>
import * as eva from "eva-icons"
export default {
  emits: ["changeTheme", "changeNotifs", "changeFrame", "viewChanges", "close"],
  mounted() {
    eva.replace()
  },
  data() {
    let textColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--text-primary"
    )
    if (!window.localStorage.getItem("notifs"))
      window.localStorage.setItem("notifs", "off")
    if (!window.localStorage.getItem("showFrame"))
      window.localStorage.setItem("showFrame", "false")
    return {
      textColor,
      notifStatus: window.localStorage.getItem("notifs"),
      currentTheme: window.localStorage.getItem("theme"),
      frameStatus: window.localStorage.getItem("showFrame"),
    }
  },
  methods: {
    changeTheme() {
      this.$emit("changeTheme")
      this.$emit("close")
    },
    changeNotifs() {
      this.$emit("changeNotifs")
      this.$emit("close")
    },
    changeFrame() {
      this.$emit("changeFrame")
      this.$emit("close")
    },
    viewChanges() {
      this.$emit("viewChanges")
      this.$emit("close")
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
  width: max-content;
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

.opt p > span {
  opacity: 0.75;
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