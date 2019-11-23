<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog share-folder-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
      <div class="dialog-header">
          <h2>
            <span>Share 2 folders</span>
            <div class="more_details tooltip-alt">
                <i class="fa fa-info-circle"></i>
                <div class="tooltip-text right">
                    Plants, books
                </div>
            </div>
          </h2>
          <a href="demo/LU_passwords_folders.php" class="dialog-close">
          <?php include('includes/svg-icons/close.php'); ?>
          <span class="visuallyhidden">close</span></a>
      </div>
      <div class="js_dialog_content dialog-content">
          <div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
            <div class="js_tabs_content tabs-content">
                <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
                <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                <?php include('includes/dialogs/share/LU_permissions_list_share_folder.php'); ?>
                <?php include('includes/dialogs/share/LU_permission_add.php'); ?>
                <div class="permission-add">
                  <div class="input checkbox">
                    <input id="permissions-for-folders"type="checkbox">
                    <label for="permissions-for-folders">Override existing children permissions.</label>
                  </div>
                </div>
                <?php include('includes/dialogs/share/LU_permission_dialog_buttons.php'); ?>
                </div>
            </div>
          </div>
        </div>
    </div>
</div>