<div class="panel aside js_wsp_pwd_sidebar_second passbolt_component_resource_sidebar js_component passbolt_view_component_resource_sidebar ready"
     id="js_pwd_details" >
    <div class="sidebar resource">
        <div class="sidebar-header">
            <h3>Inkscape</h3>
            <a id="js_wsp_pwd_sidebar_close" class="js_sidebar_close dialog-close" href="#">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <?php include('includes/sidebars/sections/password_info.php'); ?>
        <?php include('includes/sidebars/sections/password_description.php'); ?>
        <?php include('includes/sidebars/sections/password_tags.php'); ?>
        <?php include('includes/sidebars/sections/password_shared.php'); ?>
        <?php include('includes/sidebars/sections/password_comments.php'); ?>
    </div>
</div>
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
