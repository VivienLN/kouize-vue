<script>
  import ScoresHelpers from '../utils/ScoresHelper';
  import PrizeIcon from './ui/icons/PrizeIcon.vue';
  import Button from './ui/Button.vue';
  import { RefreshIcon } from '@heroicons/vue/solid';

  export default {
    props: [
      'scoreList',
      'resets',
    ],

    components: {
      PrizeIcon,
      Button,
      RefreshIcon,
    },

    data() {
      return {
        data: ScoresHelpers.getLeaderboard(this.scoreList, 50),
      }
    },

    methods: {
      reset() {
        ScoresHelpers.resetScores(this.scoreList);
        // Also reset leaderboards specified in the resets (array) prop
        if(Array.isArray(this.resets)) {
          this.resets.forEach(listName => ScoresHelpers.resetScores(listName));
        }
        this.data = {};
      }
    }
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="({userName, score, rank}, index) in data">
        <div>
          <div v-if="rank<=3">
            <PrizeIcon :class="'rank-'+rank" />
          </div>
          <div v-else>
            {{ rank }}
          </div>
        </div>
        <div>
          {{ userName }}
        </div>
        <div>
          {{ score }}
        </div>
      </li>
    </ul>
    <Button color="secondary" @click="reset"><RefreshIcon /> Reset</Button>
  </div>
</template>

<style scoped>
  li {
    font-size: var(--fs-small);
    padding: 1rem 2rem;
    border-radius: var(--bradius-lg);
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1rem;
    align-items: center;
    background-color: var(--alt-bg);
  }
  li svg {
    margin: 0 auto;
    height: 4rem;
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
  li > :nth-child(1) {
    grid-column: span 1;
    text-align: center;
    font-weight: var(--fw-bold);
  }
  li > :nth-child(2) {
    grid-column: span 9;
  }
  li > :nth-child(3) {
    grid-column: span 2;
    text-align: right;
    opacity: .7;
  }
</style>