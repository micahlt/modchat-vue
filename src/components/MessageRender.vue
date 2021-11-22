<template>
<transition-group tag="div" id="renderDiv" name="list" class="render-messages" @enter="scroll()">
  <Message class="message-object" v-for="m in messageList" :msg="m" :key="m.id" />
</transition-group>
<MessageInput @sendMessage="sendMessage" />
</template>

<script>
import MessageInput from './MessageInput.vue';
import Message from './Message.vue';
export default {
  name: 'MessageRender',
  emits: ["sendMessage"],
  components: {
    MessageInput,
    Message
  },
  props: {
    messageList: Array
  },
  data() {
    console.log(this.messageList)
    return {
      msg: {
        profilePicture: 'https://cdn2.scratch.mit.edu/get_image/user/1882674_60x60.png',
        username: 'griffpatch',
        content: `Hey there y'all!`,
        type: 'text'
      }
    }
  },
  methods: {
    sendMessage(msg) {
      this.$emit("sendMessage", msg);
    },
    scroll() {
      let messageDiv = document.getElementById('renderDiv');
      if (messageDiv.scrollTop < -99) {
        messageDiv.scroll(0, 100);
        messageDiv.scrollIntoView(false);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.render-messages {
  height: calc(100vh - 170px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  display: flex;
  margin-left: 10px;
  align-items: flex-end;
  justify-content: left;
  flex-direction: column-reverse;
  background: var(--bg-primary);
}

.render-messages::-webkit-scrollbar {
  width: 10px;
}

.render-messages::-webkit-scrollbar-track {
  background: transparent;
}

.render-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border: solid 3px var(--bg-primary);
  border-radius: 8px;
}

.render-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media only screen and (max-width: 700px) {
  .render-messages {
    grid-column: 1 / 3;
  }
}
</style>
