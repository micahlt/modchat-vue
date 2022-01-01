<template>
<div class="login-modal">
  <div class="content pad-bottom">
    <img src="../assets/logo-darkmode.png" alt="Modchat logo">
    <transition-group name="fade">
      <div class="content" v-if="mode == 'landing'">
        <div class="subheader">Join the conversation</div>
        <a class="big-btn mc-btn" href="#" title="For existing Modchat accounts" @click="existingAccount">Log
          in with Modchat</a>
        <a class="big-btn soa-btn" :href="`https://oauth2.scratch-wiki.info/w/index.php?title=Special:ScratchOAuth2/authorize&client_id=940001774&redirect_uri=${clientURL}&scopes=identify&state=login`" title="Powered by Scratch OAuth2">Sign
          up with <span>Scratch</span></a>
      </div>
      <div class="content" v-if="mode == 'signup'">
        <div class="subheader">Sign up for a Modchat account</div>
        <br>
        <TextBox v-model="suUsr" :placeholder="username" disabled="true" @enterKey="signUp"></TextBox><br>
        <TextBox v-model="suPwd" @input="ping" placeholder="Password" @enterKey="signUp"></TextBox>
        <PrimaryButton class="primary-btn" title="Sign Up" @click="signUp">Sign Up</PrimaryButton>
      </div>
      <div class="content" v-if="mode == 'login'">
        <div class="subheader">Log in to your Modchat account</div>
        <br>
        <TextBox placeholder="Username" v-model="liUsr" @enterKey="logIn"></TextBox><br>
        <TextBox placeholder="Password" v-model="liPwd" type="password" @enterKey="logIn"></TextBox>
        <PrimaryButton class="primary-btn" title="Log In" @click="logIn">Log In</PrimaryButton>
      </div>
    </transition-group>
    <span class="footer"><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></span>
  </div>
</div>
</template>

<script>
import TextBox from './TextBox.vue';
import PrimaryButton from './PrimaryButton.vue';
export default {
  name: 'LoginModal',
  data() {
    return {
      mode: 'landing',
      username: 'Username'
    }
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('code') && urlParams.get('state')) {
      console.log('reached url general check')
      if (urlParams.get('state') == "login") {
        console.log('reached state check!');
        fetch(`${this.serverURL}/api/soa2code`, {
          method: "POST",
          body: JSON.stringify({
            "code": urlParams.get('code'),
            "state": urlParams.get('state')
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }).then((res) => {
          this.mode = 'signup'
          return res.json();
        }).then((data) => {
          console.log("Recieved session data:", data);
          if (data.user_name) {
            console.log(data);
            this.user = {
              "name": data.user_name,
              "token": data.session,
              "id": data.user_id
            }
            console.log(data.user_name)
            this.username = data.user_name
            window.localStorage.setItem('user', `{
              "name": "${data.user_name}",
              "token": "${data.session}",
              "id": ${data.user_id}
            }`);
          }
        })
      }
    }
  },
  components: {
    TextBox,
    PrimaryButton
  },
  methods: {
    existingAccount() {
      this.mode = 'login'
    },
    signUp() {
      let that = this;
      console.log(that.suPwd)
      fetch(`${this.serverURL}/api/updatepassword`, {
        method: "POST",
        body: JSON.stringify({
          "token": JSON.parse(window.localStorage.getItem('user')).token,
          "password": that.suPwd
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
        user.password = that.suPwd;
        window.localStorage.setItem('user', JSON.stringify(user));
        window.location.href = window.location.href.split('?')[0];
      });
    },
    logIn() {
      let that = this;
      let user = JSON.parse(window.localStorage.getItem('user'));
      console.log(that.suPwd)
      fetch(`${this.serverURL}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            "username": that.liUsr,
            "password": that.liPwd
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }).then((response) => {
          if (response.ok) {
            user.password = that.liPwd;
            user.name = that.liUsr;
            return response.text()
          }
        })
        .then(text => {
          user.token = text;
          window.localStorage.setItem('user', JSON.stringify(user));
          window.location.reload();
        });
    }
  },
  computed: {
    clientURL() {
      // FOR DEVELOPMENT: override the window.clientHost variable in the main.js file
      let root = window.clientHost;
      return root;
    },
    serverURL() {
      // FOR DEVELOPMENT: override the window.serverHost variable in the main.js file
      let root = window.serverHost;
      return root;
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
  display: inline-block;
}

.fade-leave-active {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-110%);
}

.login-modal {
  background: var(--bg-secondary);
  width: 350px;
  height: max-content;
  border-radius: 0.3em;
  box-shadow: var(--shadow);
  text-align: center;
  min-height: 320px;
  overflow-x: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.pad-bottom {
  padding-bottom: 3.5em;
}

img {
  width: 65%;
  margin: 2em;
}

.subheader {
  color: var(--text-primary);
  padding-top: 2em;
  padding-bottom: 1em;
  border-top: 2px solid var(--bg-tertiary);
  width: max-content;
  margin: auto;
}

.big-btn {
  margin: 1em;
  width: max-content;
  padding: 1.2em;
  border-radius: 0.3em;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: filter 0.2s;
  background: var(--accent);
}

.soa-btn {
  background: #2592FF;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
}

.soa-btn span {
  color: #F7A41C;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
}

.mc-btn {
  position: relative;
}

.mc-btn::after {
  content: 'ALPHA';
  font-size: 0.7em;
  background: var(--light-accent);
  position: absolute;
  top: 3.7em;
  right: -1.5em;
  border-radius: 1em;
  padding: 0.5em;
  box-shadow: var(--shadow);
  transition: all 0.2s;
}

.mc-btn:hover::after {
  transform: scale(1.1);
  transition: all 0.2s;
  filter: brightness(1.1);
}

.big-btn:hover {
  transition: filter 0.2s;
  filter: brightness(0.9);
}

.primary-btn {
  margin-top: 1em;
}

.footer {
  font-size: 0.8em;
  color: var(--text-primary);
  opacity: 0.2;
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  padding: 1em 13% 0 13%;
}

.footer a {
  color: var(--text-primary);
  padding: 0 0.8em;
}
</style>
