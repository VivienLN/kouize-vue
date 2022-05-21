<script>
  import MCQ from './components/questions/MCQ.vue';
  import Timer from './components/Timer.vue';
  import CONFIG from './config';
  
  export default {
    components: {
      MCQ,
      Timer
    },

    data() {
      return {
        CONFIG: Object.freeze(CONFIG),
        question: null,
        questionIndex: 0,
        questionStep: 0,
        timerStarted: false,
      }
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
      }

    },
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <button @click="nextStep">Next</button>
  </div>
  <Timer :isStarted="timerStarted" :totalTime="CONFIG.timer" />
  <MCQ 
    v-if="question" 
    :question="question" 
    :step="questionStep" 
    @onStart="startTimer" 
    @onShowRightAnswer="stopTimer" 
    @onFinished="nextQuestion"
  />
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
