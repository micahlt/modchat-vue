<template>
  <div class="wrapper">
    <div class="typing lightgray">{{ typingMessage }}</div>
    <div
      contenteditable
      class="input"
      @keydown.enter.prevent="sendMessage($event)"
      enterkeyhint="send"
      @keydown="sendTyping"
      @paste="handlePaste($event)"
    ></div>
    <div class="action-btns">
      <a href="#" title="Attach" @click="attachFile"
        ><i data-eva="attach-2-outline" :data-eva-fill="accent"></i
      ></a>
      <a href="#" title="Send" @click="manualSend"
        ><i data-eva="paper-plane-outline" :data-eva-fill="accent"></i
      ></a>
    </div>
  </div>
</template>

<script>
import * as eva from 'eva-icons';
export default {
  name: 'MessageInput',
  components: {},
  props: {
    typingList: Array
  },
  emits: ["sendMessage",
         "typing"],
  data() {
    let accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    return {
      accent,
      typingMessage: ""
    }
  },
  methods: {
    sendTyping() {
      this.$emit("typing");
    },
    sendMessage(e) {
      this.$emit("sendMessage", e.target.innerText);
      e.target.innerText = "";
    },
    manualSend(e) {
      let inputBox = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild;
      console.log(inputBox);
      this.$emit("sendMessage", inputBox.innerText);
      inputBox.innerText = "";
    },
    constructTypingMessage() {
      if (this.typingList.length > 0 && this.typingList.length < 2) {
        let message = "";
        this.typingList.forEach((item) => {
          message = message + item;
        });
        return `${message} is typing...`;
      } else if (this.typingList.length > 1) {
        let message = "";
        this.typingList.forEach((item) => {
          message = message + item;
        });
        return `${message} and ${this.typingList.length - 1} more are typing`;
      } else {
        return "";
      }
    }
  },
  mounted() {
    eva.replace();
    setInterval(() => {
        this.typingMessage = this.constructTypingMessage();
    }, 600);
  },
  handlePaste(e) {
    if (e.clipboardData) {
      content = e.clipboardData.getData('Text');        
      if (window.getSelection) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(content));
      }
    }
  }
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
</style>
