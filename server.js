let express = require('express');
let socket = require('socket.io');
let roomManager = require('./roomManager');

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

      console.log(socket.id + ' joned ' + room.id);

      socket.on('disconnect', function(){

            room.leave(socket);

            socket.to(room.id).emit('bot', {
                  message: socket.id + " left ",
                  users: room.users.length
            });

            console.log(socket.id + " disconnected.");
            console.log(socket.id + " left ");

      });

});
