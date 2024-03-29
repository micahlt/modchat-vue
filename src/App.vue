<template :class="theme">
  <Announcement
    v-if="localVersion != version"
    :version="version"
    @close="localVersion = version"
  />
  <Banned class="banned" v-if="isBanned" />
  <Disconnected class="banned" v-if="disconnectTimes > 4" />
  <NavBar
    :room="currentRoom"
    class="navbar"
    @roomSearch="roomChange"
    v-if="!isBanned"
    @toggleUsers="usersOpen = !usersOpen"
    @openChangelog="localVersion = 0"
  />
  <MessageRender
    @sendMessage="sendMessage"
    :messageList="messageList"
    :oldMessageList="oldMessageList"
    @reportMessage="reportMessage"
    @typing="typing"
    :typingList="typingList"
    v-if="!isBanned"
    :room="currentRoom"
  />
  <transition name="fade">
    <UsersOnline
      :usersList="usersList"
      class="users"
      v-if="!isBanned && usersOpen"
      :room="currentRoom"
    />
  </transition>
  <transition-group name="fade">
    <LoginModal
      class="modal"
      @logIn="logIn($event)"
      @signUp="signUp($event)"
      v-if="!isLoggedIn && !isBanned"
      :error="loginErr"
    />
    <div
      class="modal-blocker"
      v-if="(!isLoggedIn && !isBanned) || warningShown"
    ></div>
    <div class="warning" v-if="warningShown">
      <p>
        That message is not appropriate for Modchat.<br />
        Please be aware of the messages you send in<br />
        the future or you may be banned. This is<br />
        violation #{{ violations }}.
      </p>
      <a href="#" @click.prevent="warningShown = false">Okay</a>
    </div>
  </transition-group>
</template>

<script>
// These global variables are used to provide API and redirect routes.  You can change these by changing your environment variables.  There's a good tutorial here: https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html
window.serverHost = process.env.VUE_APP_SERVER
window.clientHost = process.env.VUE_APP_CLIENT
const VERSION = "2.1.7"
import { io } from "socket.io-client"
import MessageRender from "./components/MessageRender.vue"
import NavBar from "./components/NavBar.vue"
import UsersOnline from "./components/UsersOnline.vue"
import LoginModal from "./components/LoginModal.vue"
import Banned from "./components/Banned.vue"
import Disconnected from "./components/Disconnected.vue"
import Announcement from "./components/Announcement.vue"
const socket = io(window.serverHost, {
  withCredentials: true,
  autoConnect: false,
})

if ("Notification" in window) {
  if (Notification.permission == "default") {
    Notification.requestPermission()
  }
}
export default {
  name: "App",
  components: {
    NavBar,
    MessageRender,
    UsersOnline,
    LoginModal,
    Banned,
    Disconnected,
    Announcement,
  },
  methods: {
    roomChange(name) {
      document.roomChange = true
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          name: JSON.parse(window.localStorage.getItem("user")).name,
          room: name.substring(1),
        })
      )
      window.location.reload()
    },
    enableModal() {
      this.modalEnabled = true
    },
    sendMessage(msg) {
      let that = this
      socket.emit("chat", {
        type: msg.type,
        content: msg.content,
        username: that.user.name,
        room: that.currentRoom,
        access_token: this.access_token,
        reply_id: msg.reply_id,
      })
    },
    reportMessage(e) {
      let that = this
      fetch(`${process.env.VUE_APP_SERVER}/api/messages/report`, {
        method: "POST",
        body: JSON.stringify({
          username: that.user.name,
          type: true,
          room: that.currentRoom,
          id: e,
          access_token: that.access_token,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      })
    },
    typing() {
      let that = this
      socket.emit("userTyping", {
        username: that.user.name,
        room: that.currentRoom,
      })
    },
    logIn(event) {
      this.loginErr = ""
      console.log("event:", event)
      let that = this
      let user = JSON.parse(window.localStorage.getItem("user"))
      fetch(`${this.serverURL}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          username: event.username,
          password: event.password,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            user.name = event.username
          }
          return response.json()
        })
        .then((data) => {
          if (!data.reason) {
            that.access_token = data.access_token
            window.localStorage.setItem("user", JSON.stringify(user))
            window.location.href = window.location.href.split("?")[0]
            window.location.reload()
          } else if (data.reason == "wrongPassword") {
            this.loginErr = "Please double check your password."
          } else if (data.reason == "missingData") {
            this.loginErr = "You must provide a username and password."
          } else if (data.reason == "notSignedUp") {
            this.loginErr = "Please make sure you've signed up with Scratch."
          }
        })
        .then((data) => {
          that.access_token = data.access_token
          window.localStorage.setItem("user", JSON.stringify(user))
          window.location.href = window.location.href.split("?")[0]
          window.location.reload()
        })
    },
    signUp(event) {
      fetch(`${this.serverURL}/api/updatepassword`, {
        method: "POST",
        body: JSON.stringify({
          username: JSON.parse(window.localStorage.getItem("user")).name,
          password: event.password,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response
          }
        })
        .then(() => {
          let user = JSON.parse(window.localStorage.getItem("user"))
          window.localStorage.setItem("user", JSON.stringify(user))
          this.logIn({
            username: user.name,
            password: event.password,
          })
        })
    },
    showWarning() {
      this.warningShown = true
      this.violations++
    },
  },
  data() {
    let violations, localVersion
    if (!window.localStorage.getItem("violations")) {
      window.localStorage.setItem("violations", 0)
      violations = 0
    } else {
      violations = window.localStorage.getItem("violations")
    }

    if (!window.localStorage.getItem("v")) {
      window.localStorage.setItem("v", 0)
      localVersion = 0
    } else {
      localVersion = window.localStorage.getItem("v")
    }

    if (!window.localStorage.getItem("user")) {
      window.localStorage.setItem(
        "user",
        `{
        "name": "Unauthed User", "room": "general"
      }`
      )
      window.location.reload()
    } else {
      if (!JSON.parse(window.localStorage.getItem("user")).room) {
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            name: JSON.parse(window.localStorage.getItem("user")).name,
            room: "general",
          })
        )
      }
    }
    return {
      currentRoom: JSON.parse(window.localStorage.getItem("user")).room,
      user: JSON.parse(window.localStorage.getItem("user")),
      violations,
      messageList: [],
      oldMessageList: [],
      typingList: [],
      blurred: false,
      access_token: null,
      loginErr: "",
      warningShown: false,
      isBanned: false,
      disconnectTimes: 0,
      version: VERSION,
      localVersion,
      usersOpen: true,
      usersList: []
    }
  },
  mounted() {
    let that = this
    if (window.innerWidth < 700) {
      this.usersOpen = false
    }
    const storage = JSON.parse(window.localStorage.getItem("user"))
    if (storage.secondName == "Banned User") {
      fetch(
        `${process.env.VUE_APP_SERVER}/api/session/isBanned/${storage.name}`
      )
        .then((response) => response.json())
        .then((r) => {
          if (r.banned) {
            if (Date.now() > r.expiry) {
              window.localStorage.setItem(
                "user",
                `{"name": "Unauthed User", "room": "general"}`
              )
              window.location.reload()
            }
            this.isBanned = true
          } else {
            window.localStorage.setItem(
              "user",
              `{"name": "Unauthed User", "room": "general"}`
            )
            window.location.reload()
          }
        })
    }
    if (!this.isBanned)
      fetch(`${process.env.VUE_APP_SERVER}/api/refresh`, {
        method: "POST",
        body: JSON.stringify({
          username: that.user.name,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json()
          } else if (res.status == 403 && !this.isBanned) {
            window.localStorage.setItem(
              "user",
              `{"name": "Unauthed User", "room": "general"}`
            )
            window.location.reload()
          }
        })
        .then((data) => {
          that.access_token = data.access_token
          fetch(`${process.env.VUE_APP_SERVER}/api/rooms/${that.currentRoom}`)
            .then((response) => response.json())
            .then((r) => {
              if (r.current_message_id == 0) {
                socket.connect()
                return
              }
              if (r.current_message_id < 100) {
                r.current_message_id = 101
              }
              fetch(
                `${process.env.VUE_APP_SERVER}/api/messages/${
                  that.currentRoom
                }?first=${r.current_message_id - 100}&last=${
                  r.current_message_id
                }`
              )
                .then((response) => response.json())
                .then((msgs) => {
                  msgs.forEach((msg) => {
                    msg.content = msg.message
                    msg.type = "text"
                    msg.profilePicture = msg.profile_picture
                    delete msg.message
                    delete msg.profile_picture
                    that.messageList.unshift(msg)
                  })
                  socket.connect()
                })
            })

          window.addEventListener("blur", () => {
            that.blurred = true
          })
          window.addEventListener("focus", () => {
            that.blurred = false
          })
          window.addEventListener("beforeunload", function () {
            console.log(document.roomChange)
            if (
              document.roomChange != true &&
              JSON.parse(window.localStorage.getItem("user")).secondName !==
                "Banned User"
            ) {
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  name: JSON.parse(window.localStorage.getItem("user")).name,
                  room: that.currentRoom,
                })
              )
            } else {
              document.roomChange = false
            }
          })
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState == "visible")
              document.getElementById("favicon").href = "/favicon.ico"
          })
          socket.on("connect", () => {
            console.log("Connected to server")
            socket.emit("joinRoom", {
              username: that.user.name,
              roomname: that.currentRoom,
              access_token: that.access_token,
              sameTab: false,
            })
          })
          socket.on("users", (users) => {
            that.usersList = users
          })
          socket.on("user connected", (user) => {
            that.usersList.push(user);
          })
          socket.on("bannedUser", function (data) {
            const user = JSON.parse(window.localStorage.getItem("user"))
            if (user.secondName != "Banned User") {
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  name: JSON.parse(window.localStorage.getItem("user")).name,
                  secondName: "Banned User",
                  reason: data.reason,
                  expiry: data.expiry,
                  room: "general",
                })
              )
              window.location.reload()
            }
          })
          socket.on("badMessage", that.showWarning)
          socket.on("message", (obj) => {
            if (document.hidden) {
              document.getElementById("favicon").href = "/favicon-unread.ico"
            }
            if (obj.profilePicture.includes("?v=")) {
              obj.profilePicture = obj.profilePicture.slice(0, -3)
            }
            if (obj.old) {
              that.oldMessageList.unshift(obj)
            } else {
              if (that.blurred && "Notification" in window) {
                if (
                  obj.content
                    .toLowerCase()
                    .includes("@" + that.user.name.toLowerCase()) &&
                  window.localStorage.getItem("notifs") !== "off"
                ) {
                  new Notification("Modchat", {
                    body:
                      obj.username + " mentioned you: '" + obj.content + "'",
                    icon: "/img/512x512.png",
                  })
                  that.messageList.unshift(obj)
                  return false
                } else if (window.localStorage.getItem("notifs") === "all") {
                  new Notification("Modchat", {
                    body: obj.username + ": '" + obj.content + "'",
                    icon: "/img/512x512.png",
                  })
                }
              }
              that.messageList.unshift(obj)
            }
          })

          socket.on("refresh", (object) => {
            fetch(`${process.env.VUE_APP_SERVER}/api/refresh`, {
              method: "POST",
              body: JSON.stringify({
                username: that.user.name,
              }),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              credentials: "include",
            })
              .then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                  return res.json()
                } else if (!this.isBanned) {
                  window.localStorage.setItem(
                    "user",
                    `{"name": "Unauthed User", "room": "general"}`
                  )
                  window.location.reload()
                }
              })
              .then((data) => {
                object.args.access_token = data.access_token
                this.access_token = data.access_token
                socket.emit(object.name, object.args, data.access_token)
              })
          })
          socket.on("isTyping", (obj) => {
            if (!that.typingList.includes(obj.username)) {
              if (that.user.name != obj.username) {
                that.typingList.push(obj.username)
              }
            }
            window.setTimeout(() => {
              that.typingList.splice(that.typingList.indexOf(obj.username))
            }, 600)
          })
          socket.on("disconnect", () => {
            socket.off("isTyping")
            socket.off("message")
            socket.off("authenticated")
          })
          socket.io.on("reconnect", () => {
            this.disconnectTimes++
          })

          const stopReconnects = () => {
            if (this.disconnectTimes > 4) {
              socket.disconnect()
            }
          }

          socket.io.on("reconnect", () => {
            this.disconnectTimes++
            stopReconnects()
          })
          socket.io.on("reconnect_error", () => {
            this.disconnectTimes++
            stopReconnects()
          })
        })
  },
  computed: {
    isLoggedIn() {
      if (window.localStorage.getItem("user")) {
        if (
          JSON.parse(window.localStorage.getItem("user")).name ==
            "Unauthed User" ||
          JSON.parse(window.localStorage.getItem("user")).secondName ==
            "Banned User"
        ) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    clientURL() {
      let root = window.clientHost
      return root
    },
    serverURL() {
      let root = window.serverHost
      return root
    },
  },
}
</script>

<style>
body {
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--bg-primary);
  height: calc(100% - env(safe-area-inset-bottom));
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 240px;
  grid-template-rows: 70px 1fr 100px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

MessageRender {
  grid-row: 2 / 3;
}

.navbar {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  box-shadow: var(--shadow);
}

.users {
  grid-row: 2 / 4;
  grid-column: 2 / 3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-blocker {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  backdrop-filter: blur(4px);
}

.modal {
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 700px) {
  .messages {
    grid-column: 1 / 3;
  }
}

.banned {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;
  background: black;
  display: grid;
  place-items: center;
}

.warning {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bad);
  padding: 1em 2em;
  border-radius: 0.2em;
  color: white;
  z-index: 4;
}

.warning a {
  text-decoration: none;
  line-height: 3.5em;
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.5em 1em;
  border-radius: 0.3em;
  transition: 0.15s;
}

.warning a:hover {
  filter: brightness(0.9);
}

.warning a:active {
  filter: brightness(1.05);
}
</style>
