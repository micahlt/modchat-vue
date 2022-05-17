<template>
  <div class="wrapper">
    <div
      class="reply-preview"
      v-if="replyId != null && replyData != null && reportId == null"
    >
      <a
        title="Remove reply"
        class="remove-reply"
        @click.prevent="removeReply"
        href="#"
        >&#215;</a
      >
      <span class="username">{{ replyData.username }}<br /></span>
      <span class="message">{{ replyData.message }}</span>
    </div>
    <div class="report-preview" v-if="reportId != null && replyData != null">
      <a
        title="Cancel report"
        class="remove-reply"
        @click.prevent="cancelReport"
        href="#"
        >&#215;</a
      >
      <a
        title="Report the message"
        class="report-message"
        @click.prevent="reportMessage"
        href="#"
        >GO
      </a>
      <span class="username"
        >Would you like to report {{ replyData.username }}? This is their
        message:<br
      /></span>
      <span class="message">{{ replyData.message }}</span>
    </div>
    <div
      contenteditable
      class="input"
      @keydown.enter.prevent="sendMessage($event)"
      enterkeyhint="send"
      @keydown="sendTyping"
      @paste="handlePaste($event)"
      ref="input"
      id="input"
    ></div>

    <div class="typing lightgray">{{ typingMessage }}</div>
    <transition name="fade">
      <EmojiPicker
        @select="onSelectEmoji"
        :native="true"
        :hide-group-icons="true"
        v-if="pickerOpen"
        v-click-outside="outsidePicker"
      />
    </transition>
    <div class="action-btns">
      <a title="Insert emoji" @click.prevent="pickerOpen = !pickerOpen"
        ><i data-eva="smiling-face-outline" :data-eva-fill="accent"></i
      ></a>
      <a title="Send" @click.prevent="manualSend($event)"
        ><i data-eva="paper-plane-outline" :data-eva-fill="accent"></i
      ></a>
    </div>
  </div>
</template>

<script>
import * as eva from "eva-icons"
window.serverHost = process.env.VUE_APP_SERVER
window.clientHost = process.env.VUE_APP_CLIENT
import EmojiPicker from "vue3-emoji-picker"
import "../../node_modules/vue3-emoji-picker/dist/style.css"

export default {
  name: "MessageInput",
  components: {
    EmojiPicker: EmojiPicker,
  },
  props: {
    typingList: Array,
    replyId: {
      required: false,
      default: null,
    },
    reportId: {
      required: false,
      default: null,
    },
    room: String,
  },
  emits: [
    "sendMessage",
    "typing",
    "removeReply",
    "cancelReport",
    "reportMessage",
  ],
  watch: {
    replyId: {
      immediate: true,
      handler() {
        if (this.replyId != null) this.getReply(this.replyId)
      },
    },
    reportId: {
      immediate: true,
      handler() {
        if (this.reportId != null) this.getReply(this.reportId)
      },
    },
  },
  data() {
    let accent = getComputedStyle(document.documentElement).getPropertyValue(
      "--accent"
    )
    return {
      accent,
      typingMessage: "",
      replyData: null,
      pickerOpen: false,
    }
  },
  methods: {
    getReply(e) {
      fetch(`${window.serverHost}/api/messages/${this.room}/${e}`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          this.replyData = data
        })
    },
    removeReply() {
      this.replyData = null
      this.$emit("removeReply")
    },
    cancelReport() {
      this.replyData = null
      this.$emit("cancelReport")
    },
    reportMessage() {
      this.replyData = null
      this.$emit("reportMessage")
    },
    handlePaste(e) {
      let clipboardData, pastedData
      e.stopPropagation()
      e.preventDefault()
      clipboardData = e.clipboardData || window.clipboardData
      pastedData = clipboardData.getData("Text")
      window.document.execCommand("insertText", false, pastedData)
    },
    sendTyping() {
      this.$emit("typing")
    },
    sendMessage(e) {
      if (e.shiftKey === true && e.key === "Enter") {
        window.document.execCommand("insertText", false, "\n")
        return
      }
      this.$emit("sendMessage", {
        content: this.$refs.input.innerText.replaceAll("\n", "\n\n\n"),
        type: "text",
        reply_id: this.replyId,
      })
      e.target.innerText = ""
      this.removeReply()
      this.$refs.input.focus()
    },
    onSelectEmoji(e) {
      this.$refs.input.focus()
      this.$refs.input.innerText += e.i
      this.pickerOpen = false
      this.moveToEnd(this.$refs.input)
    },
    outsidePicker() {
      if (this.pickerOpen) {
        this.pickerOpen = false
      }
    },
    moveToEnd(el) {
      el.focus()
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        var range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    manualSend() {
      let inputBox = this.$refs.input
      this.$emit("sendMessage", {
        content: inputBox.innerText,
        type: "text",
        reply_id: this.replyId,
      })
      inputBox.innerText = ""
      this.removeReply()
      this.$refs.input.focus()
    },
    constructTypingMessage() {
      if (this.typingList.length > 0 && this.typingList.length < 2) {
        let message = ""
        this.typingList.forEach((item) => {
          message = message + item
        })
        return `${message} is typing...`
      } else if (this.typingList.length > 1) {
        let message = ""
        this.typingList.forEach((item) => {
          message = message + item
        })
        return `${message} and ${this.typingList.length - 1} more are typing`
      } else {
        return ""
      }
    },
  },
  mounted() {
    eva.replace()
    setInterval(() => {
      this.typingMessage = this.constructTypingMessage()
    }, 600)
    document.getElementById("input").addEventListener("keydown", (e) => {
      if (e.key == "i" && e.ctrlKey) {
        e.preventDefault()
        this.$refs.input.value = this.$refs.input.value += "__"
      }
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  box-shadow: 0 -12px 13px var(--bg-primary);
  background: var(--bg-primary);
  display: block;
  grid-column: 1 / 2;
  grid-row: 3 / 3;
  position: relative;
  z-index: 2;
}

.typing {
  position: absolute;
  position: absolute;
  left: 25px;
  top: 0;
  font-size: 0.8em;
}

.lightgray {
  color: var(--text-secondary);
}

.active {
  height: 8em !important;
  opacity: 1 !important;
  transition: height 0.2s 0.5s, opacity 0.3s 0.5s;
}

.suggestion {
  color: var(--text-primary);
  text-align: left;
  margin: 0;
  padding: 10px;
}

a {
  color: white;
  text-decoration: none;
}

.suggestion:hover {
  border-radius: 0.4em;
  background: var(--bg-tertiary);
}

.input {
  text-align: left;
  margin: 20px;
  z-index: 1;
  font-family: "Inter", sans-serif;
  font-size: 0.9em;
  width: auto;
  max-height: 5em;
  padding: 0.8em;
  padding-left: 0.7em;
  background-color: var(--bg-secondary);
  border-style: solid;
  border-color: var(--outline);
  border-width: 2px;
  border-radius: 0.4em;
  color: var(--text-primary);
  transition: box-shadow 0.4s, border-color 0.4s, background-color 0.4s,
    height 0.1s;
  overflow-y: scroll;
  position: absolute;
  width: calc(100% - 40px - 2em);
  bottom: 17px;
}

.file {
  display: none;
}

.input:focus {
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s, background-color 0.2s;
  background-color: var(--bg-tertiary);
  box-shadow: var(--shadow);
  border-bottom-color: var(--accent);
}

.input::-webkit-scrollbar {
  width: 10px;
  cursor: pointer;
}

.input::-webkit-scrollbar-track {
  background: transparent;
}

.input::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border: solid 3px var(--bg-secondary);
  border-radius: 8px;
  transition: border 0.4s;
}

.input:focus::-webkit-scrollbar-thumb {
  border: solid 3px var(--bg-tertiary);
  transition: border 0.2s;
}

.input::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-btns {
  position: absolute;
  bottom: 2.7em;
  right: 2.3em;
  z-index: 1;
}

.action-btns a {
  padding-left: 0.4em;
  cursor: pointer;
}

.action-btns svg {
  transition: 0.2s;
}

.action-btns svg:hover {
  fill: var(--text-primary);
  transition: 0.2s;
}

@media only screen and (max-width: 700px) {
  .wrapper {
    grid-column: 1 / 3;
  }
}

.reply-preview {
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

.report-preview {
  position: absolute;
  top: -300px;
  right: 343px;
  max-width: 30vw;
  background: var(--bg-secondary);
  text-align: left;
  color: var(--text-primary);
  max-height: 30vw;
  transform: translateY(-90%);
  padding: 50px;
  border: 2px solid var(--accent);
  border-radius: 0.4rem;
  font-size: 0.8em;
}

.reply-preview .username {
  font-weight: bold;
}

.reply-preview .message {
  color: var(--text-secondary);
  width: 500px;
  word-wrap: break-word;
}

.report-preview .username {
  font-weight: bold;
}

.report-preview .message {
  color: var(--text-secondary);
  width: 500px;
  word-wrap: break-word;
}

.remove-reply {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 1.5em;
  line-height: 1;
  color: var(--text-secondary);
  transition: 0.2s color;
}

.report-message {
  position: absolute;
  right: 7px;
  top: 30px;
  font-size: 2.5em;
  line-height: 1;
  color: var(--text-secondary);
  transition: 0.2s color;
}

.report-message:hover {
  color: var(--text-primary);
}

.remove-reply:hover {
  color: var(--text-primary);
}

/* Other emojipicker styles can be found in ../theme/index.css */
.v3-emoji-picker {
  position: absolute;
  bottom: 92px;
  right: 25px;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
</style>
