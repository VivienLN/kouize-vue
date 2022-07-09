<script>
  import ScoresHelpers from '../../utils/ScoresHelper';
  import Helpers from '../../utils/Helpers';
  import Card from '../ui/Card.vue';
  import Timer from '../Timer.vue';
  import FuzzySet from 'fuzzyset'
  import PrizeIcon from '../ui/icons/PrizeIcon.vue';
  import QuestionNumber from '../ui/QuestionNumber.vue';

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
      'number',
      'totalQuestions'
    ],

    components: {
      Card,
      Timer,
      PrizeIcon,
      QuestionNumber,
    },

    data() {      
      return {
        timerStarted: false,
        winners: [],
        letters: this.question.answers[0].split('').map(letter => ({
          letter: letter,
          blanked: !!letter.match(/[a-z]/i),
        })),
        revealedLettersIndexes: []
      }
    },

    computed: {
      timerDuration() {
        return this.question?.timer ?? this.settings.timer;
      },
      answers() {
        let answers = this.question.answers.map(a => Helpers.canonizeAnswer(a));
        return FuzzySet(answers);
      },
    },

    methods: {
      startTimer() {
        this.timerStarted = true;
      },
      stopTimer() {
        this.timerStarted = false;
      },
      onTimerTick(time) {
        // Not the time to reveal a letter yet
        let halfTime = this.timerDuration / 2;
        let delay = Math.ceil(halfTime / 3); // Roughly 2 or 3 letters revealed in total
        if(time > halfTime || time == 0 || time%delay != 0) {
          return;
        }

        console.log('reveal', time);

        // All leters have been revelead
        if(this.revealedLettersIndexes.length >= this.letters.length) {
          return;
        }
        let index = null;
        do {
          index = Math.floor(Math.random() * this.letters.length);
        } while(this.revealedLettersIndexes.includes(index));
        this.revealedLettersIndexes.push(index);
        this.letters[index].blanked = false;
        console.log('reveal letter', index, this.letters[index].letter);
      }
    },

    mounted() {
      // Question starts immediatly
      this.startTimer();
      this.$emit('onStart');

      // Some letters are revealed at the start (punctuation, etc.)
      // Add them to the revealedLetters array now
      this.letters.forEach((letter, index) => {
        if(!letter.blanked) {
          this.revealedLettersIndexes.push(index);
        }
      });

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
      step(newStep, oldStep) {
        // Show right answer
        if(newStep == 1) {
          // Save Scores
          // If there are 3 winners, first one gets 3 points, 2nd gets 2, etc.
          this.winners.forEach((username, i) => {
            let multiplier = this.question?.points ?? 1;
            let points = (this.winners.length - i) * multiplier;
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
    <Timer 
      :isStarted="timerStarted" 
      :totalTime="timerDuration" 
      @onTick="onTimerTick"
      class="timer" 
    />
    <div>
      <Card class="label">
        <h2>
          <QuestionNumber :number="number" :total="totalQuestions" />
          {{ question.label }}
        </h2>
        <p class="answer" v-if="step>=1">
          {{ question.answers[0] }}
        </p>
        <p class="answer" v-if="step==0 && question.show_letters">
          <template v-for="{letter, blanked} in letters">
            <span class="letter" :class="{'blanked': blanked}">
              <span class="inside">
                {{ letter }}
              </span>
            </span>
          </template>
        </p>
      </Card>
      <div class="winners" v-if="(step>=1) && winners.length > 0">
        <Card v-for="(username, index) in winners.slice(0, 3)" class="winner-card">
          <div>
            <PrizeIcon :class="`rank-${(index+1)}`" />
          </div>
          {{ username }}
        </Card>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
  .timer {
    margin-bottom: -1.5rem;
    position: relative;
    z-index: 10;
  }

  .label {
    position: relative;
    border-radius: var(--bradius-lg);
    font-size: var(--fs-xl);
    color: var(--title-color);
    padding: 2rem;
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

  .letter {
    display: inline-block;
    line-height: 1em;
    height: 1em;
    min-width: .4em;
    margin: 0 .1rem;
    vertical-align: bottom;
  }

  .blanked {
    border-bottom: 4px solid var(--font-color);
    opacity: .7;
  }

  .blanked .inside {
    display: none;
  }

  .winners {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns:repeat(auto-fit, minmax(30% , 1fr));
  }

  .winner-card {
    border-radius: var(--bradius-lg);
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .winner-card svg {
    margin: 0 auto;
    height: 2rem;
    margin-right: .5rem;
  }
  .rank-1 {
    color: #ecc741;
  }
  .rank-2 {
    color: #a2b2c9;
  }
  .rank-3 {
    color: #d89475;
  }
  

</style>
