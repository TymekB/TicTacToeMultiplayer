let ticTacToe = {

    board: ['n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n'],
    players: [],
    turn: 'X',

    putPlayerSignOnBoard(playerSign, position) {
        this.board[position] = playerSign;

        if(playerSign === 'X') this.turn = 'O';
        else this.turn = 'X';

        return true;

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

    getPlayer(name) {
        let playerPos = this.players.map(function(player) {
            return player.name;
        }).indexOf(name);

        return this.players[playerPos];
    }

};

module.exports = ticTacToe;