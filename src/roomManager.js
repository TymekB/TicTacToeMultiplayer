let roomManager = {

    rooms: [],

    createRoom(roomId) {

        let room = {
            id: roomId,
            users: [],

            join(socket) {
                this.users.push(socket);
                socket.join(roomId);

                return true;
            },

            leave(socket) {

                let socketPos = this.users.map(function(socket) {
                    return socket.id;
                }).indexOf(socket.id);

                if(socket === -1) return;

                this.users.splice(socketPos, 1);
                socket.leave(roomId);

                return true;
            }
        };

        this.rooms.push(room);

        return room;
    },

    getFreeRooms() {

        let freeRooms = [];

        this.rooms.forEach(function(room) {
            if(room.users.length < 2) {
                freeRooms.push(room);
            }
        });

        return freeRooms;
    }
};

module.exports = roomManager;