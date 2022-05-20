<script>
  import CONFIG from '../config'
  import Chat from '../utils/chat'

  export default {
    data() {
      return {
        config: {},
        messages: [],
      }
    },

    mounted() {
      this.config = CONFIG;
      Chat.onAnswer((user, message) => {
        this.messages.push({user: user, message: message});
        console.log('chat callback, message: ' + message);
      });
    }
  }
</script>

<template>
  <h1>Kouize</h1>

  <h2>Last message from {{ config.channel }}:</h2>
  <ul>
    <li v-for="{user, message} in messages">
        <strong>{{ user }}: </strong>
        {{ message }}
    </li>
  </ul>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
