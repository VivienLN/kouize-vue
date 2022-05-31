<script>
  import Helpers from '../../utils/Helpers';
  import ScoresHelpers from '../../utils/ScoresHelper';

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
    <h2 class="rounded-md text-xl text-primary-700 p-4 pt-6 drop-shadow-lg bg-gray-50 mb-4 font-bold border-b-6 border-gray-200 dark:text-primary-300 dark:bg-gray-800 dark:border-gray-900">
      {{ question.label }}
    </h2>
    <ul v-if="step>=1" class="grid grid-cols-2 gap-3">
      <li v-for="({ users, letter, label, is_right }, index) in computedAnswers">
        <div
          class="transition duration-1000 rounded-md p-2 drop-shadow-lg grid grid-cols-6 items-center gap-1 border-b-6 h-full"
          :class="{
            ['bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-900']: (step < 2 || !is_right),
            ['bg-correct-400 border-correct-500 dark:bg-correct-600 dark:border-correct-700 font-bold']: (step>= 2 && is_right),
            'opacity-40': (step>= 2 && !is_right)
          }"
        >
          <div class="letter bg-gray-200 font-bold rounded-md dark:bg-gray-900" :class="{'text-correct-600 dark:text-correct-500':(step>= 2 && is_right)}">
            {{ letter }}
          </div>
          <div class="answer-text col-span-4">
            {{ label }} 
            <span v-if="step>=2">
              ({{ answeredUsers.length > 0 ? Math.round(100 * (users.length / answeredUsers.length)) : 0 }}%)
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .letter {
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
  }
</style>
