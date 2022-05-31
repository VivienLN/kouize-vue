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
          {{ score }} {{ score > 1 ? 'points' : 'point' }}
        </div>
      </li>
    </ul>
    <Button color="secondary" @click="reset"><RefreshIcon /> Reset</Button>
  </div>
</template>

<style scoped>
  ul {
    color: var(--neutral-900);
  }
  li {
    padding: 1rem 2rem;
    border-radius: var(--bradius-lg);
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1rem;
    background-color: var(--neutral-100); /* neutral-900 */
  }
  li svg {
    margin: 0 auto;
    height: 3rem;
  }
  .rank-1 {
    color: #e9b040;
  }
  .rank-2 {
    color: #94a3b8;
  }
  .rank-3 {
    color: #da9155;
  }
  li > :nth-child(1) {
    grid-column: span 1;
  }
  li > :nth-child(2) {
    grid-column: span 9;
  }
  li > :nth-child(3) {
    grid-column: span 2;
    text-align: right;
  }
</style>