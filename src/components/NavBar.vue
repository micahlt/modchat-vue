<template>
  <div class="nav">
    <div class="grid-1">
      <div class="room-name">
        <div class="letter">
          {{ room.toUpperCase().charAt(0) }}
        </div>
        <span class="full-name">
          {{ room.toLowerCase() }}
        </span>
      </div>
      <NavSearch class="search" @roomSearch="roomSearch" @logOut="logOut" />
    </div>
    <div class="grid-2">
      <div class="nav-options">
        <a href="#" target="_self" title="Notifications"
          ><i data-eva="bell-outline" data-eva-fill="#ddd"></i
        ></a>
        <a href="#" target="_self" title="Change Theme" @click="changeTheme"
          ><i data-eva="moon-outline" :data-eva-fill="textColor"></i
        ></a>
        <a href="#" target="_self" title="Log Out" @click="logOut"
          ><i data-eva="log-out" :data-eva-fill="textColor"></i
        ></a>
      </div>
      <div class="logo"></div>
    </div>
  </div>
</template>

<script>
import NavSearch from "./NavSearch.vue"
import * as eva from "eva-icons"
export default {
  name: "NavBar",
  emits: ["roomSearch"],
  components: {
    NavSearch,
  },
  props: {
    room: String,
  },
  mounted() {
    eva.replace()
  },
  data() {
    let textColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--text-primary"
    )
    return {
      textColor,
    }
  },
  methods: {
    roomSearch(name) {
      this.$emit("roomSearch", name)
    },
    logOut() {
      fetch(`${process.env.VUE_APP_SERVER}/api/logout`, {
        method: "POST",
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("user")).name,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      }).then(() => {
        window.localStorage.setItem(
          "user",
          `{
        "name": "Unauthed User",
        "token": 0
      }`
        )
        window.location.reload()
      })
    },
    changeTheme() {
      switch (window.localStorage.getItem("theme")) {
        case "default": {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            window.localStorage.setItem("theme", "light")
            document.documentElement.classList.replace("dark", "light")
          } else {
            window.localStorage.setItem("theme", "dark")
            document.documentElement.classList.replace("light", "dark")
          }
          break
        }
        case "light": {
          window.localStorage.setItem("theme", "dark")
          document.documentElement.classList.replace("light", "dark")
          break
        }
        case "dark": {
          window.localStorage.setItem("theme", "light")
          document.documentElement.classList.replace("dark", "light")
          break
        }
      }
      eva.replace()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-1 {
  display: flex;
  align-content: left;
}
.grid-2 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.nav-options {
  border-right: solid 2px var(--outline);
  padding-right: 30px;
}
.nav-options a {
  padding: 10px;
}
.nav-options svg {
  transition: fill 0.1s;
}
.nav-options svg:hover {
  fill: var(--text-secondary);
  transition: fill 0.1s;
}
i {
  color: var(--text-primary);
}
.nav {
  position: relative;
  background: var(--bg-secondary);
  display: grid;
  grid-template-columns: auto auto;
}
.logo {
  --height: 25px;
  background-image: var(--logo);
  background-size: contain;
  height: var(--height);
  width: calc(var(--height) * 7.1);
  margin: 0 1.2em;
  background-repeat: no-repeat;
  padding-top: 2px;
}
.room-name {
  display: flex;
  position: relative;
}
.letter {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
  padding: 10px;
  margin: 12px;
  border: solid var(--accent) 2px;
  border-radius: 0.4em;
  height: 20px;
  width: 20px;
  user-select: none;
  line-height: 1em;
}
.letter::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 11px;
  left: 40px;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 9px solid var(--accent);
}
.full-name {
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.3em;
  margin-top: 20px;
  margin-left: 10px;
}
.search {
  margin-top: 15px;
  margin-left: 40px;
}
@media only screen and (max-width: 700px) {
  .search,
  .logo {
    display: none;
  }
  .nav-options {
    border-right: none;
    padding-right: 8px;
  }
}

.eva {
  fill: var(--text-primary);
}
</style>