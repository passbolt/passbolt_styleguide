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
    });
</script>
