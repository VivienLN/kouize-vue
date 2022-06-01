<script>
  import Helpers from '../../utils/Helpers';
  import ScoresHelpers from '../../utils/ScoresHelper';
  import Card from '../ui/Card.vue';

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

    components: {
      Card,
    },

    data() {      
      return {
        computedAnswers: [],
        answeredUsers: [],
      }
    },

    mounted() {
      this.chat.onSingleLetter((user, letter) => {
        // Not the time to answer
        if(this.step != 1) {
          return;
        }
        // User already gave an answer for this question
        let username = Helpers.sanitizeUser(user);
        if(this.answeredUsers.includes(username)) {
          return;
        }
        // Save user name in the answer they chose
        console.log('onSingleLetterCallback, letter: ' + letter);
        this.computedAnswers.forEach(answer => {
          if(answer.letter == letter.toUpperCase()) {
            answer.users.push(username);
            this.answeredUsers.push(username);
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
  <div class="text-center">
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
          <div class="answer-text col-span-4">
            {{ label }} 
            <span v-if="step>=2">
              ({{ answeredUsers.length > 0 ? Math.round(100 * (users.length / answeredUsers.length)) : 0 }}%)
            </span>
          </div>
        </Card>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .label {
    border-radius: var(--bradius-lg);
    font-size: var(--fs-xl);
    color: var(--primary-700); /* Dark: 300 */
    background-color: var(--neutral-50); /* Dark: 800 */
    margin-bottom: 2rem;
    padding: 3rem 2rem 2rem;
    font-weight: var(--fw-bold);
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
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
    background-color: var(--neutral-50); /* Dark: 800 */
  }

  .letter {
    background-color: var(--neutral-100);
    border-radius: var(--bradius-lg);
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    font-weight: var(--fw-bold);
  }

  .answer.right {
    background-color: #34d399;
  }

  .answer.right .letter {
    color: #10b981;
  }

  .answer.wrong {
    opacity: .4;
  }
  

</style>
