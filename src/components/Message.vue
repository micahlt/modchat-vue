<template>
<div class="message">
  <a :href="`https://scratch.mit.edu/users/${msg.username}`" class="username" :title="`Visit ${msg.username} on Scratch`" target="_blank">
    <img :src="msg.profilePicture" class="pic" :alt="msg.username">
  </a>
  <div class="gridcol-2">
    <a :href="`https://scratch.mit.edu/users/${msg.username}`" class="username" :title="`Visit ${msg.username} on Scratch`" target="_blank">{{ msg.username }} <span class="badge b-purple" v-if="isYou">YOU</span><span class="badge" v-if="msg.username == 'Modchat Bot'">BOT</span></a>
    <div v-if="msg.type == 'text'" class="message-content">
      <span v-safe-html="filteredContent" v-linkified:options="{ attributes: { style: 'color: var(--text-primary);font-weight:bold;text-decoration:none' }, formatHref: {
    mention: (href) => 'https://scratch.mit.edu/users' + href,
    hashtag: (href) => '#' + href.substring(1)
  }}"></span> <a class=" msglink link-reply" href="#"><i data-eva="corner-up-left-outline" :data-eva-fill="textSecondary" :data-eva-height="fontSize" :data-eva-width="fontSize"></i></a><a class="msglink link-report" href="#"><i
          data-eva="flag-outline" :data-eva-fill="textSecondary" :data-eva-height="fontSize" :data-eva-width="fontSize"></i></a>
    </div>
    <img v-else :src="msg.imgsrc" alt="">
  </div>
</div>
</template>

<script>
import * as eva from 'eva-icons';
export default {
  name: 'Message',
  props: {
    msg: Object
  },
  mounted() {
    eva.replace();
  },
  data() {
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) + 2;
    let textSecondary = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    return {
      textSecondary,
      fontSize
    }
  },
  computed: {
    isYou() {
      if (JSON.parse(window.localStorage.getItem('user')).name == this.msg.username) {
        return true;
      } else {
        return false;
      }
    },
    filteredContent() {
      let mentionsMessage = '';
      let originalMessage = this.msg.content; 
    originalMessage.split(" ").forEach(word => {
    if (word[0] == "@") {
      const USERNAME_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
      let mentionName = "";
      let i = 1;
      while (USERNAME_CHARS.includes(word[i])) {
        mentionName += word[i];
        i++;
      }
      let afterName = word.slice(i);
      const link = `<a class="mention" style="font-weight: bold; color: var(--text-primary); text-decoration: none;" target="_blank" href="https://scratch.mit.edu/users/${mentionName}">@${mentionName}</a>`; // creates a link relevant to the user
      mentionsMessage = mentionsMessage + link + afterName + " ";
    } else {
      mentionsMessage = mentionsMessage + word + " ";
    }
  });
      if(!mentionsMessage) {
        return originalMessage;
      } else {
      return mentionsMessage;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  display: grid;
  grid-template-columns: auto auto;
  width: max-content;
  max-width: 95%;
  margin-right: auto;
  margin-bottom: 10px;
}

.pic {
  grid-column: 1 / 1;
  height: 35px;
  width: 35px;
  border-radius: 100%;
  background: white;
  border: solid 2px var(--outline);
}

.username {
  color: var(--text-secondary);
  font-weight: bolder;
  line-height: 1.5em;
  text-decoration: none;
  font-size: 0.8em;
}

.message-content {
  color: var(--text-primary);
  word-wrap: break-word;
  font-size: 0.85em;
}

.message-content:hover .msglink {
  opacity: 1;
  transition: 0.2s;
}
  
.msglink {
  opacity: 0;
  transition: 0.2s;
  transform: translateY(2px);
}

.msglink:first-of-type {
  margin-left: 5px;
}

.msglink svg {
  transform: translateY(4px);
}

.gridcol-2 {
  margin-left: 15px;
  margin-top: -2px;
  grid-column: 2 / 2;
  text-align: left;
}

.badge {
  background: white;
  margin-left: 4px;
  padding: 2px 8px;
  font-size: 0.7em;
  border-radius: 0.7em;
}

.b-purple {
  color: white;
  background: var(--light-accent);
}
</style>
