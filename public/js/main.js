var socket = io();

function createBoard(element, board = []) {

    let html = ``;

    for(let i = 0; i < 9; i++) {

        let sign = null;

        if(board && board[i] !== 'n') {

            sign = board[i];
        }

        html += `
                <div class="square" data-id="${i}">
                    ${(sign) ? sign : ''}
                </div>
        `;
    }

    $(element).html(html);
}

function initBoardListener() {
    $('.square').click(function(){

        let id = $(this).data('id');

        socket.emit('move', {
            position: id
        });
    });
}

$(document).ready(function() {

    createBoard('#board');
    initBoardListener();

    socket.on('bot', function(data) {

        let fullMessage = `
            <li>
                <div class="pull-left">${data.message}</div>
                <div class="pull-right">${moment().format('h:mm:ss a')}</div>
                <div class="clearfix"></div>
            </li> 
        `;

        $("#logs ul").append(fullMessage);
        $("#connected-users").html(data.users);
    });

    socket.on('move', function(data) {

        createBoard('#board', data.board);
        initBoardListener();

        if(data.isWon) {
            socket.emit('restart', null);
            alert(data.turn + " wins");
        }
        else if(data.draw) {
            socket.emit('restart', null);
            alert('Draw! No one wins.');
        }
    });
});