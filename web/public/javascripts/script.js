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
        $('a[href="#top"]').css('display', 'block');   
    } else {
        $('a[href="#top"]').css('display', 'none');
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

    $('#nav-menu > ul > li > a').click(function(){
        $('#nav-icon').click();               
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

    var centerForm = ($(window).height() - $('#registarArea > .form').height()) / 2;
    $('#registarArea > .form').css('top', centerForm + 'px');

    var centerForm = ($(window).height() - $('#entrarArea > .form').height()) / 2;
    $('#entrarArea > .form').css('top', centerForm + 'px');

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
    $('#registarArea').show();
    var centerForm = ($(window).height() - $('#registarArea > .form').height()) / 2;
    $('#registarArea > .form').css('top', centerForm + 'px');
}

function entrar() {
    $('#entrarArea').show();
    var centerForm = ($(window).height() - $('#entrarArea > .form').height()) / 2;
    $('#entrarArea > .form').css('top', centerForm + 'px');
}