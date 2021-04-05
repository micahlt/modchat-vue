<template>
<div class="message">
  <img :src="msg.profilePicture" alt="">
</div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
