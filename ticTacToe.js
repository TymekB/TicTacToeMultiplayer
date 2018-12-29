let ticTacToe = {

    board: ['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'],
    winningPatterns: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ],
    players: [],
    turn: 'X',

    putPlayerSignOnBoard(playerSign, position) {
        this.board[position] = playerSign;

        if(this.checkIfGameIsWon()) {
            console.log(this.turn + " wins.");
            return;
        }

        if(playerSign === 'X') this.turn = 'O';
        else this.turn = 'X';

        return true;

    },

    checkIfGameIsWon() {
        for(let i = 0; i < this.winningPatterns.length; i++) {

            let fields = [];

            for(let j = 0; j < 3; j++) {
                fields.push(this.board[this.winningPatterns[i][j]]);
            }

            if(fields[0] === fields[1] && fields[1] === fields[2] && fields[0] !== 'n') {
                return true;
            }
        }

        return false;
    },

    addPlayer(name) {

        let player = this.players[0];
        let signs = ['X', 'O'];
        let sign = null;

        if(player) {

            if(player.sign === 'X') sign = 'O';
            else sign = 'X'
        }
        else {
            let rand = Math.floor(Math.random() * signs.length);
            sign = signs[rand];
        }

        this.players.push({
            name: name,
            sign: sign
        });

        return true;
    },

    removePlayer(name) {
        let playerPos = this.players.map(function(player) {
            return player.name;
        }).indexOf(name);

        this.players.splice(playerPos, 1);

        return true;
    },

    getPlayer(name) {
        let playerPos = this.players.map(function(player) {
            return player.name;
        }).indexOf(name);

        return this.players[playerPos];
    }

};

module.exports = ticTacToe;