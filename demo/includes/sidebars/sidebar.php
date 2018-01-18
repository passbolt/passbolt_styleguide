<script type="application/javascript">
    // demo only
    $(function() {
        $('#js_wsp_pwd_sidebar_close').click(function() {
            $('#js_pwd_details').toggleClass('hidden');
            $('#js_wk_secondary_menu_view_sidebar_button').toggleClass('selected');
            return false;
        });

        $('#js_wk_secondary_menu_view_sidebar_button').click(function() {
            $('#js_pwd_details').toggleClass('hidden');
            $('#js_wk_secondary_menu_view_sidebar_button').toggleClass('selected');
            return false;
        });

        $('#js_wk_secondary_menu_view_sidebar_button').toggleClass('selected');

        // Accordion
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
    });
</script>
