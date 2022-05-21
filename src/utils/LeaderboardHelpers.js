import JSON5 from 'json5';

export default {
    incrementUsersScores(users, amount = 1) {
        let leaderboards = ['leaderboard_global', 'leaderboard_session'];
        leaderboards.forEach(name => {
            let board = this.getLeaderboard(name);
            users.forEach(user => {
                board[user] = parseInt(board[user] ?? 0) + amount;
            });
            // Save in localStorage
            this.saveLeaderboard(name, board);
        });
    },

    getLeaderboard(name) {
        let storageValue = localStorage.getItem(name);
        if(!storageValue) {
            this.resetLeaderboard(name);
            return {};
        }
        return JSON5.parse(storageValue);
    },

    saveLeaderboard(name, data) {
        localStorage.setItem(name, JSON5.stringify(data));
    },

    resetLeaderboard(name) {
        this.saveLeaderboard(name, {});
    }
}