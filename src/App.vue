<script>
  import HelloWorld from './components/HelloWorld.vue'
  import MCQ from './components/questions/mcq.vue'
  import CONFIG from './config'
  
  export default {
    components: {
      HelloWorld,
      MCQ
    },

    data() {
      return {
        config: {},
        currentQuestion: CONFIG.questions[0],
      }
    },
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld />
  <MCQ :question="currentQuestion" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
