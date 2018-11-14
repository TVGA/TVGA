let slideCount = $('#slider ul li').length;
let slideWidth = $('#slider ul li').width();
let slideHeight = $('#slider ul li').height();
let sliderUlWidth = slideCount * slideWidth;

$('#slider').css({ width: slideWidth, height: slideHeight });

$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

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
    let path = window.location.pathname;

    if(path != '/') {
        $('body > header > nav > ul > li:nth-child(3) > a').attr('href', '/#canais');
        $('#nav-menu > ul > li:nth-child(2) > a').attr('href', '/#canais');
    }
    
    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        if($('#nav-menu').css('display') == 'none') {
            $('#nav-menu').slideDown(600);
            $('.slider').animate({ marginTop: '76vw' }, 600);
            $('#slider').animate({ margin: '90vw auto 15vw auto'}, 600)
        } else {
            $('#nav-menu').slideUp(600);
            $('.slider').animate({ marginTop: '0' }, 600);
            $('#slider').animate({ margin: '20vw auto 8vw auto'}, 600)
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
    
    if($(window).width() > 1280 && $(window).width() < 1600) {
        $('#slider').css('margin', '12vw auto 3vw auto');
    } else if ($(window).width() < 1280) {
        $('#slider').css('margin', '20vw auto 8vw auto');
    } else {
        $('#slider').css('margin', '10vw auto 3vw auto');
    }

    slideCount = $('#slider ul li').length;
    slideWidth = $('#slider ul li').width();
    slideHeight = $('#slider ul li').height();
    sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({ width: slideWidth, height: slideHeight });
    
    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
});