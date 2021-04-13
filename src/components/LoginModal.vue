<template>
<div class="login-modal">
  <div class="content">
    <img src="../assets/logo.png" alt="Modchat logo">
    <div class="subheader">Join the conversation</div>
    <a class="soa-btn" href="https://oauth2.scratch-wiki.info/w/index.php?title=Special:ScratchOAuth2/authorize&client_id=940001774&redirect_uri=http://localhost:8080&scopes=identify&state=login" title="Powered by Scratch OAuth2" @click="logIn">Log in with <span>Scratch</span></a>
  </div>
</div>
</template>

<script>
export default {
  name: 'LoginModal'
}
</script>

<style scoped>
.login-modal {
  background: var(--bg-secondary);
  width: 350px;
  height: max-content;
  border-radius: 0.3em;
  box-shadow: var(--shadow);
  text-align: center;
}

.content {
  padding-bottom: 3.5em;
}

img {
  width: 65%;
  margin: 2em;
}

.subheader {
  color: var(--text-primary);
  padding-top: 2em;
  padding-bottom: 3em;
  border-top: 2px solid var(--bg-tertiary);
  width: max-content;
  margin: auto;
}

.soa-btn {
  background: #2592FF;
  color: white;
  padding: 1.2em;
  border-radius: 0.3em;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  position: relative;
}

.soa-btn span {
  color: #F7A41C;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
}

.soa-btn::after {
  content: 'ALPHA';
  font-size: 0.7em;
  background: #3C30FF;
  position: absolute;
  top: 3.5em;
  right: -1.5em;
  border-radius: 1em;
  padding: 0.5em;
}

.soa-btn:hover {
  transition: background-color 0.2s;
  background: #2388ec;
}
</style>
