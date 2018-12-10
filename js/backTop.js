$(function() {        
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }        
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {        
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });     
})