<script>
  import MCQ from './components/questions/MCQ.vue';
  import Timer from './components/Timer.vue';
  import Settings from './components/Settings.vue';
  import Chat from './utils/Chat.js';
  import JSON5 from 'json5';
  
  export default {
    components: {
      MCQ,
      Timer,
      Settings
    },

    data() {
      return {
        settings: {},
        question: null,
        questionIndex: 0,
        questionStep: 0,
        timerStarted: false,
        chat: Chat,
        showSettings: false,
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
        this.question = this.settings.questions[index];
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
        var hasErrors = false;
        try {
          var questions = JSON5.parse(localStorage.getItem('questions'));
        } catch {
          var questions = [];
          hasErrors= true;
          alert('Formattage questions invalide!');
        }

        this.settings = {
          channel: localStorage.getItem('channel'),
          timer: localStorage.getItem('timer'),
          questions: questions,
        };
        console.log("settings", this.settings);
        // Chat
        this.chat.init(this.settings.channel);
        // Close settings
        if(!hasErrors) {
          this.showSettings = false;
        }
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
  <button @click="showSettings = !showSettings">Settings</button>
  <Settings v-if="showSettings" @onSaved="updateSettings" />
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
