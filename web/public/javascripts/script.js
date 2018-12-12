let open = false;
let slideCount = $('#slider ul li').length;
let slideWidth = $('#slider ul li').width();
let slideHeight = $('#slider ul li').height();
let sliderUlWidth = slideCount * slideWidth;

$('#slider').css({ width: slideWidth, height: slideHeight });

// $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

$('#slider ul li:last-child').prependTo('#slider ul');

$('.slider').css('background', $('#slider > ul > li:nth-child(2)').css('background'));

function moveLeft() {
    $('#slider ul').animate({
        left: + slideWidth
    }, 600, function () {
        $('#slider ul li:last-child').prependTo('#slider ul');
        $('#slider ul').css('left', '');
        $('.slider').css('background', $('#slider > ul > li:nth-child(2)').css('background'));
    });
};

function moveRight() {
    $('#slider ul').animate({
        left: - slideWidth
    }, 600, function () {
        $('#slider ul li:first-child').appendTo('#slider ul');
        $('#slider ul').css('left', '');
        $('.slider').css('background', $('#slider > ul > li:nth-child(2)').css('background'));
    });
};

$('a.control_prev').click(function () {
    moveLeft();
});

$('a.control_next').click(function () {
    moveRight();
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 110) {       
        $('.top').css('display', 'block');   
    } else {
        $('.top').css('display', 'none');
    }
});

function hover(element, src) {
    element.attr('src', src);
}

function unhover(element, src) {
    element.attr('src', src);
}

$(document).ready(function(){
    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        if(open) {
            open = false;
        } else {
            open = true;
        }
        if($('#nav-menu').css('display') == 'none') {
            $('#nav-menu').slideDown(600);
            $('.slider').animate({ marginTop: '70vw' }, 600);    
            $('#slider').animate({ margin: '90vw auto 15vw auto'}, 600)
        } else {
            $('#nav-menu').slideUp(600);
            $('.slider').animate({ marginTop: '0' }, 600);
            $('#slider').animate({ margin: '20vw auto 8vw auto'}, 600)
        }                 
    });

    $('.form > i').click(function(){
        $('#registarArea').hide();
        $('#entrarArea').hide();              
    });
});

$(document).mouseup(function(e) 
{
    var container = $('.form');

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        $('#registarArea').hide();
        $('#entrarArea').hide();
    }
});

$(window).resize(function() {
    if ($(window).width() > 720) {
        if($('#nav-menu').css('display') != 'none') {
            $('#nav-icon').toggleClass('open');
        }
        $('#nav-menu').hide();
        $('.slider').css('margin-top', '0');
    }
    
    if($(window).width() > 1280 && $(window).width() < 1600) {
        $('#slider').css('margin', '12vw auto 3vw auto');
    } else if ($(window).width() < 1280) {
        $('#slider').css('margin', '20vw auto 8vw auto');
    } else {
        $('#slider').css('margin', '10vw auto 3vw auto');
    }

    if($('#registarArea > .form').height() > $(window).height()) {
        $('#registarArea > .form').css('top', '2.5%');  
        $('#registarArea > .form').css('margin-bottom', '2.5%');  
    } else {
        var centerForm = ($(window).height() - $('#registarArea > .form').height()) / 2;
        $('#registarArea > .form').css('top', centerForm + 'px'); 
        $('#registarArea > .form').css('margin-bottom', '0');   
    }

    if($('#entrarArea > .form').height() > $(window).height()) {
        $('#entrarArea > .form').css('top', '2.5%'); 
        $('#entrarArea > .form').css('margin-bottom', '2.5%'); 
    } else {
        var centerForm = ($(window).height() - $('#entrarArea > .form').height()) / 2;
        $('#entrarArea > .form').css('top', centerForm + 'px');   
        $('#entrarArea > .form').css('margin-bottom', '0');
    }

    slideCount = $('#slider ul li').length;
    slideWidth = $('#slider ul li').width();
    slideHeight = $('#slider ul li').height();
    sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({ width: slideWidth, height: slideHeight });

    if(open) {
        $('#slider').css('margin', '90vw auto 15vw auto'); 
    }
    
    // $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
});

function registar() {
    if(open) {
        $('#nav-icon').click();
    }
    $('#registarArea').show();

    if($('#registarArea > .form').height() > $(window).height()) {
        $('#registarArea > .form').css('top', '2.5%');
        $('#registarArea > .form').css('margin-bottom', '2.5%');
    } else {
        var centerForm = ($(window).height() - $('#registarArea > .form').height()) / 2;
        $('#registarArea > .form').css('top', centerForm + 'px');
        $('#registarArea > .form').css('margin-bottom', '0');
    }
}

function entrar() {
    if(open) {
        $('#nav-icon').click();
    }
    $('#entrarArea').show();

    if($('#entrarArea > .form').height() > $(window).height()) {
        $('#entrarArea > .form').css('top', '2.5%');
        $('#entrarArea > .form').css('margin-bottom', '2.5%');
    } else {
        var centerForm = ($(window).height() - $('#entrarArea > .form').height()) / 2;
        $('#entrarArea > .form').css('top', centerForm + 'px');
        $('#entrarArea > .form').css('margin-bottom', '0');
    }
}

function canais() {
    var x = 0;
    if(open) {
        $('#nav-icon').click();
        x = 600;
    }
    setTimeout(function () {
        $('html, body').animate({
            scrollTop: $('#canais').offset().top
        }, 600);
    }, x);
}

function topPage() {
    $('html, body').animate({
        scrollTop: '0'
    }, 600);
}