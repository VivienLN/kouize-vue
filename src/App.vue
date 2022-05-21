<script>
  import MCQ from './components/questions/MCQ.vue';
  import Timer from './components/Timer.vue';
  import Settings from './components/Settings.vue';
  import CONFIG from './config';
  import Chat from './components/utils/Chat.js';
  
  export default {
    components: {
      MCQ,
      Timer,
      Settings
    },

    data() {
      return {
        CONFIG: Object.freeze(CONFIG),
        settings: {},
        question: null,
        questionIndex: 0,
        questionStep: 0,
        timerStarted: false,
        chat: Chat
      }
    },

    created() {
      // Settings
      this.updateSettings();
    },

    methods: {
      nextStep() {
        if(this.question === null) {
          this.setQuestion(0);
        } else {
          this.questionStep++;
        }
      },
      setQuestion(index) {
        this.questionStep = 0;
        this.questionIndex = index;
        this.question = CONFIG.questions[index];
      },
      nextQuestion() {
        this.setQuestion(this.questionIndex + 1);
      },
      startTimer() {
        this.timerStarted = true;
      },
      stopTimer() {
        this.timerStarted = false;
      },
      updateSettings() {
        this.settings = {
          channel: localStorage.getItem('channel'),
          timer: localStorage.getItem('timer'),
        };
        console.log("settings", this.settings);
        console.log("settings.timer", this.settings.timer);
        // Chat
        this.chat.init(this.settings.channel);
      }
    },
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <button @click="nextStep">Next</button>
  </div>
  <Timer :isStarted="timerStarted" :totalTime="settings.timer" />
  <MCQ 
    v-if="question" 
    :question="question" 
    :step="questionStep" 
    :chat="chat"
    @onStart="startTimer" 
    @onShowRightAnswer="stopTimer" 
    @onFinished="nextQuestion"
  />
  <Settings @onSaved="updateSettings" />
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
