$(function() {
    $('.dropdown #js_wk_menu_more_button', $('#js_wsp_primary_menu_wrapper')).click(function() {
        var $menuContent = $('.dropdown .dropdown-content', $('#js_wsp_primary_menu_wrapper'));
        if ($menuContent.hasClass('visible')) {
            $menuContent.removeClass('visible');
        }
        else {
            $menuContent.addClass('visible');
        }
        return false;
    });
});