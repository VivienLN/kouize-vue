<script>
  import Helpers from '../../utils/Helpers';
  import LeaderboardHelpers from '../../utils/LeaderboardHelpers';

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
              is_right: !!(index === this.question.right_answer),
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
            LeaderboardHelpers.incrementUsersScores(answer.users, points);
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
  <div class="px-8">
    <h2 class="rounded-md text-3xl text-indigo-700 py-16 px-8 drop-shadow-lg bg-white mb-12 font-bold">
      {{ question.label }}
    </h2>
    <ul v-if="step>=1" class="grid grid-cols-2 gap-6 text-2xl">
      <li v-for="({ users, letter, label, is_right }, index) in computedAnswers">
        <div
          class="rounded-md p-4 drop-shadow-lg grid grid-cols-6 items-center gap-4 h-full"
          :class="{
            'bg-white': (step < 2 || !is_right),
            ['bg-emerald-400 font-bold']: (step>= 2 && is_right),
            'opacity-50': (step>= 2 && !is_right)
          }"
        >
          <div class="letter bg-gray-100 font-bold rounded-xl" :class="{'text-emerald-600':(step>= 2 && is_right)}">
            {{ letter }}
          </div>
          <div class="answer-text col-span-4">
            {{ label }} ({{ users.length }})
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .letter {
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
  }
</style>
