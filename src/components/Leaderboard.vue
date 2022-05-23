<script>
  import ScoresHelpers from '../utils/ScoresHelper';
  import PrizeIcon from './ui/icons/PrizeIcon.vue';

  export default {
    props: [
      'scoreList',
      'resets',
      'display',
    ],

    components: {
      PrizeIcon,
    },

    data() {
      return {
        data: ScoresHelpers.getLeaderboard(this.scoreList),
      }
    },

    methods: {
      reset() {
        ScoresHelpers.resetScores(this.scoreList);
        // Also reset leaderboards specified in the resets (array) prop
        if(Array.isArray(this.resets))    {
          this.resets.forEach(listName => ScoresHelpers.resetScores(listName));
        }
        this.data = {};
      },
      getRankColor(rank) {
        let colors = [];
        colors[1] = 'amber-300';
        colors[2] = 'slate-300';
        colors[3] = 'orange-300';
        return colors[rank];
      }

    }
  }
</script>

<template>
  <div class="rounded-md border-b-4 bordexr-gray-200 bg-white drop-shadow-lg p-8">
    <h2 class="text-3xl font-bold text-indigo-700 mb-6">{{ display }}</h2>
    <ul>
      <li 
        v-for="({userName, score, rank}, index) in data" 
        class="p-6 grid grid-cols-12 gap-x-4 bg-white mb-6 rounded-md border-2 bordexr-gray-200 text-xl items-center"
        :class="`border-${getRankColor(rank)}`"
      >
        <div class="col-span-1 text-center text-3xl font-bold">
          <div v-if="rank<=3">
            <PrizeIcon :class="`text-${getRankColor(rank)}`" class="h-12 mx-auto" />
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
    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>

</style>
