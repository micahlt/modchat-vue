<template>
<div class="render-messages">
  <Message :msg="msg" />
</div>
</template>

<script>
import Message from './Message.vue';
export default {
  name: 'MessageRender',
  components: {
    Message
  },
  data() {
    return {
      msg: {
        profilePicture: 'https://lh3.googleusercontent.com/ogw/ADGmqu-PCovKL7K92DUWFawERielgHjpIsduw6nULzULhVs=s32-c-mo'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.render-messages {
  padding: 10px;
}
</style>
