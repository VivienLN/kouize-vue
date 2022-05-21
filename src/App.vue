<script>
  import MCQ from './components/questions/mcq.vue'
  import CONFIG from './config'
  
  export default {
    components: {
      MCQ
    },

    data() {
      return {
        config: {},
        question: null,
        questionIndex: 0,
        questionStep: 0,
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
      nextQuestion() {
        this.setQuestion(this.questionIndex + 1);
      },
      setQuestion(index) {
        this.questionStep = 0;
        this.questionIndex = index;
        this.question = CONFIG.questions[index];
      }

    },
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <button @click="nextStep">Next</button>
  </div>
  <MCQ v-if="question" :question="question" :step="questionStep" @onFinished="nextQuestion" />
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
