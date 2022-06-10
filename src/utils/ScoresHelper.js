import JSON5 from 'json5';

export default {
  incrementUsersScores(users, amount = 1) {
    users.forEach(user => {
      this.incrementUserScore(user, amount);
    });
  },

  incrementUserScore(user, amount = 1) {
    let scoreLists = ['scores_global', 'scores_session'];
    scoreLists.forEach(listName => {
      let scores = this.getScores(listName);
      scores[user] = parseInt(scores[user] ?? 0) + amount;
      // Save in localStorage
      this.saveScores(listName, scores);
    });
  },

  getScores(listName) {
    let storageValue = localStorage.getItem(listName);
    if(!storageValue) {
      this.resetScores(listName);
      return {};
    }
    return JSON5.parse(storageValue);
  },

  saveScores(listName, data) {
    localStorage.setItem(listName, JSON5.stringify(data));
  },

  resetScores(listName) {
    this.saveScores(listName, {});
  },

  getLeaderboard(listName, limit) {
    let scores = this.getScores(listName);
    let leaderboard = [];
    for(let userName in scores) {
      leaderboard.push({
        userName: userName,
        score: scores[userName]
      });
    }

    let lastRow = null;
    return leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item, index) => {
        var rank = 1;
        if(lastRow === null) {
          rank = 1;
        } else {
          rank = item.score == lastRow.score ? lastRow.rank : lastRow.rank + 1;
        }
        let row = {
          ...item,
          rank: rank
        };
        lastRow = row;
        return row;
      });
  }
}