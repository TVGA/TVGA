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
            $('#nav-menu').slideDown(600);
            $('#content').animate({ marginTop: '73vw' }, 600);
        } else {
            $('#nav-menu').slideUp(600);
            $('#content').animate({ marginTop: '0' }, 600);
        }                 
    });

    $(window).resize(function() {
        if ($(window).width() > 720) {
           console.log('ff')
        }

    });
});