<script>
  import ScoresHelpers from '../../utils/ScoresHelper';
  import Helpers from '../../utils/Helpers';
  import Card from '../ui/Card.vue';
  import Timer from '../Timer.vue';

  // Steps:
  // 0: show the question
  // 1: show the right answer
  // 2: And next, go to next question
  const MAX_STEP = 2;

  export default {
    props: [
      'question',
      'step',
      'chat',
      'settings',
    ],

    components: {
      Card,
      Timer,
    },

    data() {      
      return {
        timerStarted: false,
        winners: [],
      }
    },

    computed: {
      timerDuration() {
        return this.question?.timer ?? this.settings.timer;
      }
    },

    methods: {
      startTimer() {
        this.timerStarted = true;
      },
      stopTimer() {
        this.timerStarted = false;
      },
    },

    mounted() {
      // Question starts immediatly
      this.startTimer();
      this.$emit('onStart');

      // Chat callback
      this.chat.onMessage((user, message) => {
        // Not the time to answer
        if(this.step != 0 || this.winners.includes(user)) {
          return;
        }

        // TODO: fuzzy answer
        let answer = Helpers.canonizeAnswer(message);
        let cleanedAnswers = this.question.answers.map(a => Helpers.canonizeAnswer(a));

        console.log(cleanedAnswers);

        if(cleanedAnswers.includes(answer)) {
          console.log('good answer: ' + answer);
          this.winners.push(user);
        }
      });
    },

    watch: {
      question: {
        handler() {
          // Reset users having answered
          this.answeredUsers = [];
        },
        immediate: true
      },
      step(newStep, oldStep) {
        // Show right answer
        if(newStep == 1) {
          // Save Scores
          // TODO

          // Event
          this.stopTimer();
          this.$emit('onShowRightAnswer');
        }
        // Finish question
        if(newStep >= MAX_STEP) {
          this.$emit('onFinished');
        }
      },
    },
  }
</script>

<template>
  <div>
    <Timer :isStarted="timerStarted" :totalTime="timerDuration" class="timer" />
    <div>
      <Card class="label">
        <h2>
          {{ question.label }}
        </h2>
        <p class="answer" v-if="step>=1">
          {{ question.answers[0] }}
        </p>
      </Card>
    </div>
  </div>
</template>

<style scoped>
  .timer {
    margin-bottom: -2rem;
    position: relative;
    z-index: 10;
  }

  .label {
    border-radius: var(--bradius-lg);
    font-size: var(--fs-xl);
    color: var(--title-color);
    margin-bottom: 2rem;
    padding: 3rem 2rem 2rem;
    font-weight: var(--fw-bold);
    text-align: center;
  }
  
  .answer {
    color: var(--font-color);
    border-radius: var(--bradius-lg);
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    text-align: center;
  }
  

</style>
