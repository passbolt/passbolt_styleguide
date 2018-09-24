<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <?php include('includes/dialogs/share/LU_share_dialog_header.php'); ?>
        <div class="js_dialog_content dialog-content">
            <div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
                <?php include('includes/dialogs/navigation/LU_password_share_tabs.php'); ?>
                <div class="js_tabs_content tabs-content">
                    <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
                    <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                        <?php include('includes/dialogs/share/LU_permissions_list.php'); ?>
                        <?php include('includes/dialogs/share/LU_permission_warning.php'); ?>
                        <div class="permission-add">
							<iframe src="../demo/LU_iframe_permissioninput.php" id="passbolt-iframe-password-share" frameborder="0"></iframe>
							<div id="passbolt-password-share-autocomplete-wrapper">
								<iframe src="../demo/LU_iframe_permissioninput_autocomplete.php" id="passbolt-iframe-password-share-autocomplete" frameborder="0"></iframe>
							</div>
                        </div>
                        <?php include('includes/dialogs/share/LU_permission_dialog_buttons.php'); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
