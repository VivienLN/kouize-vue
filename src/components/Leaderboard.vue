<script>
  import ScoresHelpers from '../utils/ScoresHelper';
  import PrizeIcon from './ui/icons/PrizeIcon.vue';
  import Button from './ui/Button.vue';

  export default {
    props: [
      'scoreList',
      'resets',
    ],

    components: {
      PrizeIcon,
      Button,
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
      },
      getRankColor(rank, strength) {
        let colors = [];
        colors[1] = 'amber-' + strength;
        colors[2] = 'slate-' + strength;
        colors[3] = 'orange-' + strength;
        return colors[rank];
      },
    }
  }
</script>

<template>
  <div>
    <ul>
      <li 
        v-for="({userName, score, rank}, index) in data" 
        class="py-2 px-3 grid grid-cols-12 gap-x-2 mb-3 rounded-md items-center text-small bg-gray-100 dark:bg-gray-900"
      >
        <div class="col-span-1 text-center font-bold">
          <div v-if="rank<=3">
            <PrizeIcon :class="`text-${getRankColor(rank, 500)} dark:text-${getRankColor(rank, 400)}`" class="h-6 mx-auto" />
          </div>
          <div v-else>
            {{ rank }}
          </div>
        </div>
        <div class="col-span-9">
          {{ userName }}
        </div>
        <div class="col-span-2 text-right">
          {{ score }} {{ score > 1 ? 'points' : 'point' }}
        </div>
      </li>
    </ul>
    <Button class="text-tiny" color="secondary" @click="reset">Reset</Button>
  </div>
</template>

<style scoped>

</style>