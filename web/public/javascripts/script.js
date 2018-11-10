function hover(element, src) {
    element.attr('src', src);
}

function unhover(element, src) {
    element.attr('src', src);
}

$(document).ready(function(){
    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        if($('#nav-menu').css('display') == 'none') {
            $('#nav-menu' ).slideDown('slow');
        } else {
            $('#nav-menu').slideUp('slow');
        }                 
    });
});