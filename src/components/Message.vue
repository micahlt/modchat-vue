 <template>
  <div
    :class="{ message: true, descendant: !showFrame && frameShow == 'false' }"
    :data-id="msg.id"
  >
    <a
      :href="`https://scratch.mit.edu/users/${msg.username}`"
      class="username"
      :title="`Visit ${msg.username} on Scratch`"
      v-if="showFrame || frameShow === 'true'"
    >
      <img :src="msg.profilePicture" class="pic" :alt="msg.username" />
    </a>
    <div class="gridcol-2">
      <a
        :href="`https://scratch.mit.edu/users/${msg.username}`"
        class="username"
        :title="`Visit ${msg.username} on Scratch`"
        v-if="showFrame || frameShow === 'true'"
        >{{ msg.username }}
        <span class="badge b-purple" v-if="isYou" title="This is your account."
          >YOU</span
        ><span
          class="badge b-gray"
          v-if="msg.username == 'Modchat Bot'"
          title="This is a Modchat-verfied robot."
          >BOT</span
        ><span
          class="badge b-red"
          v-if="mods.includes(msg.username)"
          title="This person is a moderator."
          >MOD</span
        ><span
          class="badge b-green"
          v-if="devs.includes(msg.username)"
          title="This person is an active contributor to Modchat's code."
          >DEV</span
        ></a
      >
      <div v-if="msg.type == 'text'" class="message-content">
        <div
          class="reply-preview"
          v-if="msg.reply_id != null && replyData != null"
        >
          <span class="username"
            ><strong>{{ replyData.username }}</strong>
            <br />
          </span>
          <span class="message">{{ replyData.message }}</span>
        </div>
        <div class="msg-actions">
          <Markdown
            class="md"
            :source="filteredContent"
            :linkify="true"
            data-balloon-pos="up"
            :aria-label="
              new Date(msg.time).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            "
          />
          <a
            class="msglink link-reply"
            href="#"
            @click.prevent="$emit('reply', msg.id)"
            ><i
              data-eva="corner-up-left-outline"
              :data-eva-fill="textSecondary"
              :data-eva-height="fontSize"
              :data-eva-width="fontSize"
            ></i></a
          ><a
            class="msglink link-report"
            @click.prevent="$emit('report', msg.id)"
            href="#"
            ><i
              data-eva="flag-outline"
              :data-eva-fill="textSecondary"
              :data-eva-height="fontSize"
              :data-eva-width="fontSize"
            ></i
          ></a>
        </div>
      </div>
      <img v-else :src="msg.imgsrc" alt="" />
    </div>
  </div>
</template>

<script>
window.serverHost = process.env.VUE_APP_SERVER
window.clientHost = process.env.VUE_APP_CLIENT
import * as eva from "eva-icons"
import Markdown from "vue3-markdown-it"
export default {
  name: "Message",
  props: {
    msg: Object,
    room: String,
    showFrame: Boolean,
  },
  emits: ["reply", "report"],
  components: {
    Markdown,
  },
  mounted() {
    eva.replace()
    if (this.msg.reply_id) {
      this.getReply(this.msg.reply_id)
    }
  },
  methods: {
    alert() {
      alert("HEy")
    },
    getReply(e) {
      fetch(`${window.serverHost}/api/messages/${this.room}/${e}`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          this.replyData = data
        })
    },
  },
  data() {
    let fontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) + 2
    let textSecondary = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--text-secondary")
    return {
      textSecondary,
      fontSize,
      devs: ["-Archon-", "b1048546", "AmazingMech2418"],
      mods: ["-Archon-", "b1048546", "da-ta", "Biker2000", "peytonvilot"],
      replyData: null,
      frameShow: window.localStorage.getItem("showFrame"),
    }
  },
  computed: {
    isYou() {
      if (
        JSON.parse(window.localStorage.getItem("user")).name ==
        this.msg.username
      ) {
        return true
      } else {
        return false
      }
    },
    filteredContent() {
      let mentionsMessage = ""
      let originalMessage = this.msg.content
      originalMessage.split(" ").forEach((word) => {
        if (word[0] == "@") {
          const USERNAME_CHARS =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"
          let mentionName = ""
          let i = 1
          while (USERNAME_CHARS.includes(word[i])) {
            mentionName += word[i]
            i++
          }
          let afterName = word.slice(i)
          const link = `[@${mentionName}](https://scratch.mit.edu/users/${mentionName})` // creates a link relevant to the user
          mentionsMessage = mentionsMessage + link + afterName + " "
        } else {
          mentionsMessage = mentionsMessage + word + " "
        }
      })
      if (!mentionsMessage) {
        return originalMessage
      } else {
        return mentionsMessage
      }
    },
  },
}
</script>

<style scoped>
.descendant {
  margin-top: 0 !important;
  margin-bottom: 6px;
}
.message {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  margin-right: auto;
  margin-top: 10px;
  text-align: left;
  justify-content: flex-start;
  margin-bottom: 6px;
}
.pic {
  grid-column: 1 / 1;
  height: 35px;
  width: 35px;
  border-radius: 100%;
  background: white;
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
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  width: 100%;
  --balloon-color: var(--outline);
  --balloon-text-color: var(--text-primary);
}
.message-content:hover .msglink {
  transform: translateY(0);
  opacity: 1;
  transition: 0.2s;
}

.msglink:hover svg {
  fill: var(--text-primary);
}

.msglink svg {
  fill: var(--light-accent);
  transition: 0.2s fill;
}

.md,
.md >>> p {
  word-break: break-word;
  cursor: initial;
}

.md >>> a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: bold;
}

.md >>> code {
  background: var(--bg-tertiary);
  padding: 3px;
  border-radius: 4px;
}

.md >>> ol,
.md >>> ul {
  list-style-position: inside;
}

.msglink {
  opacity: 0;
  transition: 0.2s;
  transform: translateY(4px);
  margin-top: auto;
}
.msglink:first-of-type {
  margin-left: 5px;
}
.msglink svg {
  transform: translateY(0px);
  height: 1.2em;
  width: 1.2em;
}

.descendant .message-content {
  margin-left: 35px;
}

.gridcol-2 {
  margin-left: 15px;
  margin-top: -2px;
  grid-column: 2 / 2;
  text-align: left;
  word-break: break-all;
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

.b-gray {
  color: white;
  background: var(--bg-tertiary);
}

.b-red {
  color: white;
  background: var(--bad);
}

.b-green {
  color: black;
  background: var(--good);
}

.reply-preview {
  background: var(--bg-secondary);
  text-align: left;
  color: var(--text-primary);
  padding: 5px 10px;
  border-left: 2px solid var(--light-accent);
  border-radius: 0.4rem;
  font-size: 0.9em;
  margin: 0.4em 0;
  max-width: max-content;
}

.reply-preview .username {
  font-weight: initial;
}

.reply-preview .message {
  color: var(--text-secondary);
  margin-top: 0;
}

.report-preview {
  position: absolute;
  top: 0;
  right: 20px;
  max-width: 30vw;
  background: var(--bg-secondary);
  text-align: left;
  color: var(--text-primary);
  max-height: 30vw;
  transform: translateY(-90%);
  padding: 20px;
  border: 2px solid var(--accent);
  border-radius: 0.4rem;
  font-size: 0.8em;
}

.report-preview .username {
  font-weight: bold;
}

.report-preview .message {
  color: var(--text-secondary);
}

.msg-actions {
  display: flex;
}

[aria-label][data-balloon-pos][data-balloon-pos="up"]:before {
  left: 0;
}

[aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
  left: 60px;
}
</style>