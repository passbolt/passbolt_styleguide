<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Share<span class="dialog-header-subtitle">Inkscape2</span></h2>
            <a href="../demo/LU_passwords.php" class="dialog-close"><i class="fa fa-fw fa-close"></i><span class="visuallyhidden">close</span></a>
        </div>
        <div class="js_dialog_content dialog-content"><div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
                <ul id="084bf580-cd05-5742-10ec-b5ad4cea08a1" class="js_tabs_nav tabs-nav mad_component_menu menu mad_view_component_tree ready">
                    <li id="js_tab_nav_js_rs_edit" class="ready" data-view-id="370">
                        <div class="row">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a class="" href="../demo/LU_passwords_edit.php"><span>Edit</span></a>
                                </div>
                            </div>
                        </div>
                    </li><li id="js_tab_nav_js_rs_permission" class="ready" data-view-id="374">
                        <div class="row selected">
                            <div class="main-cell-wrapper">
                                <div class="main-cell">
                                    <a class="selected" href="../demo/LU_passwords_share.php"><span>Share</span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="js_tabs_content tabs-content">
                    <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
                    <div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
                        <div class="form-content permission-edit">
                            <ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
                                <?php include('includes/permissions/permissions_list.php'); ?>
                            </ul>
                        </div>
                        <div id="js_permissions_changes" class="warning message hidden">
                            <span>You need to save to apply the changes.</span>
                        </div>
                        <div class="permission-add">
							<iframe src="../demo/LU_iframe_permissioninput.php" id="passbolt-iframe-password-share" frameborder="0"></iframe>
							<div id="passbolt-password-share-autocomplete-wrapper">
								<iframe src="../demo/LU_iframe_permissioninput_autocomplete.php" id="passbolt-iframe-password-share-autocomplete" frameborder="0"></iframe>
							</div>
                        </div>
                        <div class="submit-wrapper clearfix">
                            <input id="js_rs_share_save" class="button primary" value="save" data-view-id="375" type="submit">
                            <a href="../demo/LU_passwords.php" class="js-dialog-cancel cancel">cancel</a>
                        </div>
                    </div></div>
            </div></div>
    </div>
</div>