<script>
  // Steps:
  // 0: show the question
  // 1: show the proposed answers
  // 2: show the right answer
  // 3: And next, go to next question
  const MAX_STEP = 3;

  export default {
    props: [
      'question',
      'step'
    ],

    mounted() {

    },

    watch: {
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
          this.$emit('onFinished');
        }
      },
    },

    computed: {
      computedAnswers() {
        return this.question.answers
          .map((answer, index) => ({
            label: answer, 
            is_right: !!(index === this.question.right_answer) 
          }))
          .sort((a, b) => 0.5 - Math.random());
      }
    }
  }
</script>

<template>
  <div>
    <h2>{{ question.label }}</h2>
    <ul v-if="step>=1">
      <li v-for="({ label, is_right }, index) in computedAnswers">
        {{ label }}
        <strong v-show="step>= 2 && is_right">(correct)</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
