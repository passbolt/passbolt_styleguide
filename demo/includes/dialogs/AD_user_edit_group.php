<div class="mad_component_dialog edit-profile-dialog dialog-wrapper mad_view_component_dialog ready" id="67f567ec-fe4c-ae9b-6b9d-eae9d13b3656">
    <div class="dialog">
        <div class="dialog-header">
            <h2>
                Edit User
                <span class="dialog-header-subtitle">Ada Lovelace</span>
            </h2>
            <a class="dialog-close" href="demo/AD_users.php">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
                <ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
                    <li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
                        <div class="row">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a href="demo/AD_users_edit_user.php"><span>Account</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
                        <div class="row selected">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a class="selected" href="demo/AD_users_edit_user_group.php"><span>Groups</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="js_tabs_content tabs-content">
                    <form id="c5c77b2a-dee0-2362-8e1b-9256e49bc0bd" class="passbolt_form_user_create form mad_view_form ready"></form>
                    <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                        <?php include('includes/dialogs/share/LU_permissions_list_group.php'); ?>
                        <?php include('includes/dialogs/share/LU_permission_warning_group.php'); ?>
                        <?php include('includes/dialogs/share/LU_permission_add_group.php'); ?>
                        <div class="submit-wrapper clearfix">
                            <a class="button primary" href="demo/AD_users.php">save</a>
                            <a class="js-dialog-cancel cancel" href="demo/AD_users.php">cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
