function createBoard(element) {
    for(let i = 0; i < 9; i++) {
        $(element).append('<div class="square" data-id="'+i+'"></div>');
    }
}

$(document).ready(function() {

    let socket = io();

    createBoard('#board');

    $('.square').click(function(){
        console.log($(this).data('id'));
    });

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
});