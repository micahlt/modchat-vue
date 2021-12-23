<template :class="theme">
  <NavBar :room="currentRoom" class="navbar" @roomSearch="roomChange" />
  <MessageRender
    class="messages"
    @sendMessage="sendMessage"
    :messageList="messageList"
    :oldMessageList="oldMessageList"
    @typing="typing"
    :typingList="typingList"
  />
  <UsersOnline class="users" />
  <transition-group name="fade">
    <LoginModal class="modal" @logIn="logIn" v-if="!isLoggedIn" />
    <div class="modal-blocker" v-if="!isLoggedIn"></div>
  </transition-group>
</template>

<script>
// These global variables are used to provide API and redirect routes.  You can change these by changing your environment variables.  There's a good tutorial here: https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html
window.serverHost = process.env.VUE_APP_SERVER;
window.clientHost = process.env.VUE_APP_CLIENT;
import { io } from "socket.io-client";
import MessageRender from "./components/MessageRender.vue";
import NavBar from "./components/NavBar.vue";
import UsersOnline from "./components/UsersOnline.vue";
import LoginModal from "./components/LoginModal.vue";
const socket = io(window.serverHost);

if (Notification.permission == "default") {
  Notification.requestPermission();
}

export default {
  name: "App",
  components: {
    NavBar,
    MessageRender,
    UsersOnline,
    LoginModal
  },
  methods: {
    roomChange(name) {
      let that = this;
      socket.emit("leaveRoom", this.currentRoom);
      that.currentRoom = name.substring(1);
      that.messageList = [];
      socket.emit("joinRoom", {
        username: that.user.name,
        roomname: that.currentRoom
      });
    },
    enableModal() {
      this.modalEnabled = true;
    },
    sendMessage(msg) {
      let that = this;
      socket.emit("chat", {
        type: "text",
        content: msg,
        username: that.user.name
      });
    },
    typing() {
      let that = this;
      socket.emit("userTyping", {
        username: that.user.name,
        room: that.currentRoom
      });
    }
  },
  data() {
    if (!window.localStorage.getItem("user")) {
      window.localStorage.setItem(
        "user",
        `{
        "name": "Unauthed User",
        "token": 0,
        "password": ""
      }`
      );
      window.location.reload();
    }
    return {
      currentRoom: "general",
      user: JSON.parse(window.localStorage.getItem("user")),
      messageList: [],
      oldMessageList: [],
      typingList: [],
      blurred: false
    };
  },
  mounted() {
    let that = this;
    window.addEventListener("blur", () => {
      that.blurred = true;
    });
    window.addEventListener("focus", () => {
      that.blurred = false;
    });
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == "visible") document.getElementById("favicon").href = "/favicon.ico";
    });
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("authentication", {
        username: that.user.name,
        password: that.user.password
      });
      console.log("Submitted auth");
      socket.on("authenticated", function() {
        console.log("Successfully authed");
        socket.emit("joinRoom", {
          username: that.user.name,
          roomname: that.currentRoom
        });
      });
      socket.on("message", obj => {
          if (document.hidden) {
              document.getElementById("favicon").href = "/favicon-unread.ico"
          }
      if (obj.profilePicture.includes("?v=")) {
        obj.profilePicture = obj.profilePicture.slice(0, -3);
      }
      if (obj.old) {
        that.oldMessageList.unshift(obj);
      } else {
        if (that.blurred) {
        if(obj.content.includes('@'+that.user.name)) {
                new Notification("Modchat", {
                  body: obj.username + " mentioned you: '" + obj.content + "'",
                  icon: "/img/512x512.png"
                });
                that.messageList.unshift(obj);
                return false;
              } else {
                new Notification("Modchat", {
                body: obj.username + ": '" + obj.content + "'",
                icon: "/img/512x512.png"
              });
              }
            }
          that.messageList.unshift(obj);
          }
      });
    socket.on("isTyping", obj => {
      if (!that.typingList.includes(obj.username)) {
        if (that.user.name != obj.username) {
          that.typingList.push(obj.username);
        }
      }
      window.setTimeout(() => {
        that.typingList.splice(that.typingList.indexOf(obj.username));
      }, 600);
    });
    });
    socket.on("disconnect", () => {
      socket.off("isTyping");
      socket.off("message");
      socket.off("authenticated");
    });
  },
  computed: {
    isLoggedIn() {
      if (window.localStorage.getItem("user")) {
        if (
          JSON.parse(window.localStorage.getItem("user")).name ==
          "Unauthed User"
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--bg-primary);
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 240px;
  grid-template-rows: 70px 1fr 100px;
  overflow: hidden;
}

.messages {
  grid-row: 2 / 3;
}

.navbar {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  box-shadow: var(--shadow);
}

.users {
  grid-row: 1 / 4;
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
</style>
