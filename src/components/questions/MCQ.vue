<script>
  import ScoresHelpers from '../../utils/ScoresHelper';
  import Card from '../ui/Card.vue';
  import Timer from '../Timer.vue';

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
        computedAnswers: [],
        answeredUsers: [],
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
      this.chat.onSingleLetter((user, letter) => {
        // Not the time to answer
        if(this.step != 1) {
          return;
        }
        // User already gave an answer for this question
        if(this.answeredUsers.includes(user)) {
          return;
        }
        // Save user name in the answer they chose
        console.log('onSingleLetterCallback, letter: ' + letter);
        this.computedAnswers.forEach(answer => {
          if(answer.letter == letter.toUpperCase()) {
            answer.users.push(user);
            this.answeredUsers.push(user);
          }
        });
      });
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
              is_right: !!(index === 0),
              users: [],
            }))
            .sort((a, b) => 0.5 - Math.random())
            .map((answer, index) => ({
              ...answer,
              letter: letters[index],
            }));
          // Reset users having answered
          this.answeredUsers = [];
        },
        immediate: true
      },
      step(newStep, oldStep) {
        // Start question (usually to start a timer)
        if(newStep == 1) {
          this.startTimer();
          this.$emit('onStart');
        }
        // Show right answer
        if(newStep == 2) {
          // Save Scores
          // Update even user that has not answered right, but with 0 points
          // to ensure they are saved in leaderboard
          this.computedAnswers.forEach(answer => {
            let points = answer.is_right ? 1 : 0;
            ScoresHelpers.incrementUsersScores(answer.users, points);
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
      </Card>
      <ul v-if="step>=1">
        <li v-for="({ users, letter, label, is_right }, index) in computedAnswers">
          <Card
            class="answer"
            :class="{
              right: (step>= 2 && is_right),
              wrong: (step >= 2 && !is_right)
            }"
          >
            <div class="letter">
              {{ letter }}
            </div>
            <div class="answer-text">
              {{ label }} 
              <span v-if="step>=2">
                ({{ answeredUsers.length > 0 ? Math.round(100 * (users.length / answeredUsers.length)) : 0 }}%)
              </span>
            </div>
          </Card>
        </li>
      </ul>
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

  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    text-align: center;
  }

  .answer {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: .5rem;
    align-items: center;
    height: 100%;
    transition: 1s;
    border-radius: var(--bradius-lg);
    padding: 1rem;
  }

  .letter {
    background-color: var(--alt-bg);
    border-radius: var(--bradius-lg);
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    font-weight: var(--fw-bold);
  }

  .answer-text {
    grid-column: span 4;
  }

  .answer.right {
    background-color: var(--answer-right-bg);
  }

  .answer.right .letter {
    color: var(--answer-right-bg);
  }

  .answer.wrong {
    opacity: .6;
  }
  

</style>
