<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
      <div class="dialog-header">
          <h2>Create a folder</h2>
          <a href="demo/LU_passwords_folders.php" class="dialog-close">
          <span class="svg-icon">
              <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
          </span>
          <span class="visuallyhidden">close</span></a>
      </div>
      <div class="js_dialog_content dialog-content">
          <div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
            <ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
                <li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
                    <div class="row">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a class="" href="demo/LU_folders_create.php"><span>Create</span></a>
                            </div>
                        </div>
                    </div>
                </li><li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
                    <div class="row selected">
                        <div class="main-cell-wrapper">
                            <div class="main-cell">
                                <a class="selected" href="demo/LU_folders_edit_share.php"><span>Share</span></a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="js_tabs_content tabs-content">
                <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
                <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                <?php include('includes/dialogs/share/LU_permissions_list_create_folder.php'); ?>
                <?php include('includes/dialogs/share/LU_permission_add.php'); ?>
                <div class="submit-wrapper clearfix">
                  <input id="js_rs_share_save" class="button primary" value="Create" data-view-id="375" type="submit">
                  <a href="demo/LU_passwords_folders.php" class="js-dialog-cancel cancel">Cancel</a>
                </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</div>