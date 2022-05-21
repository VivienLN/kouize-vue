<script>
  import Helpers from '../../utils/Helpers';

  // Steps:
  // 0: show the question
  // 1: show the proposed answers
  // 2: show the right answer
  // 3: And next, go to next question
  const MAX_STEP = 3;

  export default {
    props: [
      'question',
      'step',
      'chat'
    ],

    mounted() {
      this.chat.onSingleLetter((user, letter) => {
        if(this.step != 1) {
          return;
        }
        console.log('onSingleLetterCallback, letter: ' + letter);
        this.computedAnswers.forEach(answer => {
          if(answer.letter == letter.toUpperCase()) {
            answer.users.push(Helpers.sanitizeUser(user));
          }
        });
      });
    },

    data() {      
      return {
        computedAnswers: {}
      }
    },

    watch: {
      question: {
        handler() {
          // Only keep the 4 first answers, and shuffle them
          // Also restructure the array a little
          let letters = ['A', 'B', 'C', 'D'];
          this.computedAnswers = this.question.answers
            .slice(0, 4)
            .map((answer, index) => ({
              label: answer, 
              is_right: !!(index === this.question.right_answer),
              users: [],
            }))
            .sort((a, b) => 0.5 - Math.random())
            .map((answer, index) => ({
              ...answer,
              letter: letters[index],
            }));
        },
        immediate: true
      },
      step(newStep, oldStep) {
        // Start question (usually to start a timer)
        if(newStep == 1) {
          this.$emit('onStart');
        }
        // Show right answer
        if(newStep == 2) {
          this.$emit('onShowRightAnswer');
        }
        // Finish question
        if(newStep >= MAX_STEP) {
          // Event
          this.$emit('onFinished');
        }
      },
    },
  }
</script>

<template>
  <div>
    <h2>{{ question.label }}</h2>
    <ul v-if="step>=1">
      <li v-for="({ users, letter, label, is_right }, index) in computedAnswers">
        {{ letter }} - {{ label }} ({{ users.length }})
        <strong v-show="step>= 2 && is_right">(correct)</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
