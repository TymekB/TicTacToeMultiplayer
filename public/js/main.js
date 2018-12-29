function createBoard(element) {
    for(let i = 0; i < 9; i++) {
        $(element).append('<div class="square" data-id="'+i+'"></div>');
    }
}

$(document).ready(function() {
    createBoard('#board');


    $('.square').click(function(){
        console.log($(this).data('id'));
    });
});