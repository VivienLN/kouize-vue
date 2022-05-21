<script>
  import LeaderboardHelpers from '../utils/LeaderboardHelpers';

  export default {
    props: [
      'name'
    ],
    data() {
      return {
        data: {}
      }
    },

    created() {
      let board = LeaderboardHelpers.getLeaderboard(this.name);
      let computed = [];
      for(let user in board) {
        computed.push({
          user: user,
          score: board[user]
        });
      }
      this.data = computed.sort((a, b) => b.score - a.score);
    },

    methods: {
      reset() {
        LeaderboardHelpers.resetLeaderboard(this.name);
        this.data = {};
      }
    }
  }
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <table>
      <tr>
        <th>Position</th>
        <th>Joueur</th>
        <th>Score</th>
      </tr>
      <tr v-for="({user, score}, index) in data">
        <td>{{ index + 1 }}</td>
        <td>{{ user }}</td>
        <td>{{ score }}</td>
      </tr>
    </table>
    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>

</style>
