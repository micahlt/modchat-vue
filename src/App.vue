<template :class="theme">
  <Banned class="banned" v-if="isBanned"/>
  <NavBar :room="currentRoom" class="navbar" @roomSearch="roomChange" v-if="!isBanned"/>
  <MessageRender
    class="messages"
    @sendMessage="sendMessage"
    :messageList="messageList"
    :oldMessageList="oldMessageList"
    @typing="typing"
    :typingList="typingList"
    v-if="!isBanned"
  />
  <UsersOnline class="users" v-if="!isBanned"/>
  <transition-group name="fade">
    <LoginModal class="modal" @logIn="logIn($event)" @signUp="signUp($event)" v-if="!isLoggedIn" :error="loginErr" />
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
import Banned from "./components/Banned.vue"
const socket = io(window.serverHost, {
  withCredentials: true,
  autoConnect: false
});

if (Notification.permission == "default") {
  Notification.requestPermission();
}
export default {
  name: "App",
  components: {
    NavBar,
    MessageRender,
    UsersOnline,
    LoginModal,
    Banned
  },
  methods: {
    roomChange(name) {
      let that = this;
      socket.emit("leaveRoom", this.currentRoom);
      that.currentRoom = name.substring(1);
      that.messageList = [];
      socket.emit("joinRoom", {
        username: that.user.name,
        roomname: that.currentRoom,
        access_token: this.access_token
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
        username: that.user.name,
        access_token: this.access_token
      });
    },
    typing() {
      let that = this;
      socket.emit("userTyping", {
        username: that.user.name,
        room: that.currentRoom
      });
    },
    logIn(event) {
      this.loginErr = "";
      console.log("event:", event);
      let that = this;
      let user = JSON.parse(window.localStorage.getItem('user'));
      fetch(`${this.serverURL}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          "username": event.username,
          "password": event.password
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        credentials: 'include'
        }).then((response) => {
          if (response.ok) {
            user.name = event.username;
          }
          return response.json();
        })
        .then((data) => {
          if (!data.reason) {
            that.access_token = data.access_token;
            window.localStorage.setItem('user', JSON.stringify(user));
            window.location.href = window.location.href.split('?')[0];
            window.location.reload();
          } else if (data.reason == "wrongPassword") {
            this.loginErr = "Please double check your password.";
          } else if (data.reason == "missingData") {
            this.loginErr = "You must provide a username and password.";
          } else if (data.reason == "notSignedUp") {
            this.loginErr = "Please make sure you've signed up with Scratch."
          }
        })
        .then((data) => {
          that.access_token = data.access_token;
          window.localStorage.setItem('user', JSON.stringify(user));
          window.location.href = window.location.href.split('?')[0];
          window.location.reload();
        });
    },
    signUp(event) {
      fetch(`${this.serverURL}/api/updatepassword`, {
        method: "POST",
        body: JSON.stringify({
          "username": JSON.parse(window.localStorage.getItem('user')).name,
          "password": event.password
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then((response) => {
        if (response.ok) {
          return response;
        }
      }).then(() => {
        let user = JSON.parse(window.localStorage.getItem('user'));
        window.localStorage.setItem('user', JSON.stringify(user));
        this.logIn({
          username: user.name,
          password: event.password
        })
      });
    }
  },
  data() {
    if (!window.localStorage.getItem("user")) {
      window.localStorage.setItem(
        "user",
        `{
        "name": "Unauthed User"
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
      blurred: false,
      access_token: null,
      loginErr: ""
    };
  },
  mounted() {
    let that = this;
    fetch(`${process.env.VUE_APP_SERVER}/api/refresh`, {
      method: "POST",
      body: JSON.stringify({
        "username": that.user.name
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: 'include'
      }).then((res) => {
        if (res.status == 200) {
          return res.json();
        } else if (res.status == 403) {
          window.localStorage.setItem("user", `{"name": "Unauthed User"}`);
          window.location.reload();
        }
      }).then((data) => {
        that.access_token = data.access_token;
        socket.connect();
      
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
        socket.emit("joinRoom", {
          username: that.user.name,
          roomname: that.currentRoom,
          access_token: that.access_token
        });
      });
      socket.on("bannedUser", function(data) {
          console.log(data);
                  window.localStorage.setItem(
        "user",
        `{
        "name": "Banned User",
        "reason": "${data.reason}",
        "expiry": "${data.expiry}"
      }`
        );
        window.location.reload();
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
              }/* else {
                new Notification("Modchat", {
                  body: obj.username + ": '" + obj.content + "'",
                  icon: "/img/512x512.png"
                }); this is commented out because ATM notifications get spammy */
              }
            }
          that.messageList.unshift(obj);
          }
      });

    socket.on("refresh", (object) => {
      fetch(`${process.env.VUE_APP_SERVER}/api/refresh`, {
      method: "POST",
      body: JSON.stringify({
        "username": that.user.name
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: 'include'
      }).then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
        window.localStorage.setItem(
        "user", `{"name": "Unauthed User"}`
        );
        window.location.reload();
        }
      }).then((data) => {
        object.args.access_token = data.access_token;
        this.access_token = data.access_token;
        socket.emit(object.name, object.args, data.access_token);
      })
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
    socket.on("disconnect", () => {
      socket.off("isTyping");
      socket.off("message");
      socket.off("authenticated");
    });
  })
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
    },
    clientURL() {
      let root = window.clientHost;
      return root;
    },
    serverURL() {
      let root = window.serverHost;
      return root;
    },
    isBanned() {
      const storage = JSON.parse(window.localStorage.getItem("user"));
      if(storage.name == "Banned User")  {
        return true;
      } else {
        if(JSON.parse(window.localStorage.getItem("user")).name == "Banned User") {
        window.localStorage.setItem(
          "user",
          `{
          "name": "Unauthed User"
        }`);
        }
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
  grid-column: 1 / 4;
}
</style>
