<script>
  import ScoresHelpers from '../../utils/ScoresHelper';
  import Helpers from '../../utils/Helpers';
  import Card from '../ui/Card.vue';
  import Timer from '../Timer.vue';
  import FuzzySet from 'fuzzyset'

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
      },
      answers() {
        let answers = this.question.answers.map(a => Helpers.canonizeAnswer(a));
        return FuzzySet(answers);
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

        // Use fuzzy search to add a (verry little) tolerance towards typos
        let answer = Helpers.canonizeAnswer(message);
        if(this.answers.get(answer, null, .9)) {
          console.log(`good answer from ${user}: ${answer}`);
          this.winners.push(user);
          if(this.winners.length >= this.question.winners) {
            this.$emit('onForceNextStep');
          }
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
          // If there are 3 winners, first one gets 3 points, 2nd gets 2, etc.
          this.winners.forEach((username, i) => {
            let points = this.winners.length - i;
            ScoresHelpers.incrementUserScore(username, points);
          });

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
