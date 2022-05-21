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
