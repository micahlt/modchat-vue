<template>
<div id="renderDiv" class="render-messages">
  <transition-group name="list"  @enter="scroll()">
    <Message v-for="m in messageList" :msg="m" :key="m.id" />
  </transition-group>
  <Message v-for="m in oldMessageList" :msg="m" :key="m.id" />
</div>
<MessageInput @sendMessage="sendMessage" @typing="$emit('typing')" :typingList="typingList" />
</template>

<script>
import MessageInput from './MessageInput.vue';
import Message from './Message.vue';
export default {
  name: 'MessageRender',
  emits: ["sendMessage", "typing"],
  components: {
    MessageInput,
    Message
  },
  props: {
    oldMessageList: Array,
    messageList: Array,
    typingList: Array
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
  transition: all 0.2s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

@media only screen and (max-width: 700px) {
  .render-messages {
    grid-column: 1 / 3;
  }
}
</style>
