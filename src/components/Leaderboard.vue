<script>
  import LeaderboardHelpers from '../utils/LeaderboardHelpers';

  export default {
    props: [
      'name'
    ],
    data() {
      return {

      }
    },

    computed: {
      data() {
        let board = LeaderboardHelpers.getLeaderboard(this.name);
        let computed = [];
        for(let user in board) {
          computed.push({
            user: user,
            score: board[user]
          });
        }
        return computed.sort((a, b) => b.score - a.score);
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
  </div>
</template>

<style scoped>

</style>
