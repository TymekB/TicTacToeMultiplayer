let express = require('express');
let socket = require('socket.io');
let roomManager = require('./roomManager');
let ticTacToe = require('./ticTacToe');

let app = express();
let port = process.env.PORT || 5000;

let server = app.listen(port, function(){
   console.log('listening on ' + port);
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', function(socket){
      console.log(socket.id + " connected.");

      let room = null;
      let freeRooms = roomManager.getFreeRooms();

      if(freeRooms.length > 0) {
            room = freeRooms[0];

            room.join(socket);

            socket.to(room.id).emit('bot', {
                  message: socket.id + " joined.",
                  users: room.users.length
            });

            socket.emit('bot', {
                  message: "you joined " + room.id,
                  users: room.users.length
            });


      } else {
            let roomId = 'room_' + new Date().valueOf();
            room = roomManager.createRoom(roomId);

            room.join(socket);

            socket.emit('bot', {
                  message: 'created '+room.id,
                  users: room.users.length
            });
      }

      console.log(socket.id + ' joined ' + room.id);

      ticTacToe.addPlayer(socket.id);

      console.log(ticTacToe.players);

      socket.on('move', function(data) {

            console.log('turn ' + ticTacToe.turn);
            console.log('sign ' + ticTacToe.getPlayer(socket.id).sign);

            let currentPlayer = ticTacToe.getPlayer(socket.id);
            if(ticTacToe.players.length < 2 || ticTacToe.turn !== currentPlayer.sign || ticTacToe.winner) return;

            ticTacToe.putPlayerSignOnBoard(currentPlayer.sign, data.position);

            console.log(ticTacToe.board);

            io.sockets.emit('move', {
                  board: ticTacToe.board,
                  turn: ticTacToe.turn,
                  isWon: ticTacToe.isWon
            });
      });

      socket.on('restart', function(data) {

           restart();
      });

      socket.on('disconnect', function(){

            room.leave(socket);
            ticTacToe.removePlayer(socket.id);

            socket.to(room.id).emit('bot', {
                  message: socket.id + " left ",
                  users: room.users.length
            });

            restart();

            console.log(socket.id + " disconnected.");
            console.log(socket.id + " left ");

      });

});

function restart() {
      if(ticTacToe.winner) {
            ticTacToe.reset();
      }

      io.sockets.emit('move', {
            board: ticTacToe.board,
            turn: ticTacToe.turn,
            isWon: ticTacToe.isWon
      });
}