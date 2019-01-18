$('.accordion-header').click(function (e) {
    var $content = $(this).next();
    if ($content.is(':hidden')) {
        $content.slideDown(50);
    } else {
        $content.slideUp(25);
    }
    $content.parent().toggleClass('closed');
    return false;
});