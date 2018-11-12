function hover(element, src) {
    element.attr('src', src);
}

function unhover(element, src) {
    element.attr('src', src);
}

$(document).ready(function(){
    let path = window.location.pathname;
    console.log(path);

    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        if($('#nav-menu').css('display') == 'none') {
            $('#nav-menu').slideDown(600);
            $('.slider').animate({ marginTop: '76vw' }, 600);
        } else {
            $('#nav-menu').slideUp(600);
            $('.slider').animate({ marginTop: '0' }, 600);
        }                 
    });
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
});

$(window).resize(function() {
    if ($(window).width() > 720) {
        if($('#nav-menu').css('display') != 'none') {
            $('#nav-icon').toggleClass('open');
        }
        $('#nav-menu').hide();
        $('.slider').css('margin-top', '0');
    }
});