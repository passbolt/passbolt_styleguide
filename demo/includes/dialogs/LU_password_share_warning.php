<div id="49ef6f0e-9ee8-ee74-1261-80191e19c8ff" class="mad_component_dialog edit-password-dialog dialog-wrapper mad_view_component_dialog ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Share<span class="dialog-header-subtitle">Inkscape2</span></h2>
            <a href="#" class="dialog-close">
                <i class="fa fa-fw fa-close"></i><span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content"><div class="passbolt_component_resource_actions_tab tabs mad_view_component_tab ready" id="daaba01d-a85c-0b23-c896-86ec393f8d11">
				<?php include('includes/dialogs/navigation/LU_password_share_tabs.php'); ?>

				<div class="js_tabs_content tabs-content">
                    <form style="display: none;" class="passbolt_form_resource_create tab-content mad_view_form hidden" id="js_rs_edit"></form>
					<div class="passbolt_component_permissions share-tab tab-content passbolt_view_component_permissions ready selected" id="js_rs_permission">
						<div class="form-content permission-edit">
							<ul id="js_permissions_list" class="permissions scroll mad_component_tree mad_view_component_tree ready">
								<?php include('includes/dialogs/permissions/permissions_list.php'); ?>
								<li id="603fb13a-6bcf-04b9-8795-d52565808650" class="row direct-permission permission-updated" data-view-id="400">
									<div class="avatar">
										<img src="img/avatar/user.png"  data-view-id="401">
									</div>
									<div class="group">
										<span class="name">Frances Allen</span>
										<span class="details"><a href="#">frances@passbolt.com</a></span>
									</div>
									<div class="select rights">
										<form id="js_share_rs_perm_603fb13a-6bcf-04b9-8795-d52565808650" class="js_perm_edit_form" data-view-id="402">
											<select id="js_share_perm_type_603fb13a-6bcf-04b9-8795-d52565808650" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown ready">
												<option value="1" data-view-id="376">can read</option>
												<option value="7" data-view-id="377">can update</option>
												<option value="15" data-view-id="378">is owner</option>
											</select>
										</form>
									</div>
									<div class="actions">
										<a id="js_share_perm_delete_603fb13a-6bcf-04b9-8795-d52565808650" href="#" class="js_perm_delete close mad_component_button js_component mad_view ready" title="remove" data-view-id="403">
											<i class="fa fa-times-circle"></i>
											<span class="visuallyhidden">remove</span>
										</a>
									</div>
								</li><li id="1792c272-fa47-4961-78b0-f5fffc4de27c" class="row direct-permission permission-updated" data-view-id="407">
									<div class="avatar">
										<img src="img/avatar/user.png"  data-view-id="408">
									</div>
									<div class="group">
										<span class="name">Kathleen Antonelli</span>
										<span class="details"><a href="#">kathleen@passbolt.com</a></span>
									</div>
									<div class="select rights">
										<form id="js_share_rs_perm_1792c272-fa47-4961-78b0-f5fffc4de27c" class="js_perm_edit_form" data-view-id="409">
											<select id="js_share_perm_type_1792c272-fa47-4961-78b0-f5fffc4de27c" class="js_share_rs_perm_type permission mad_form_dropdown form-element mad_view_form_dropdown ready">
												<option value="1" data-view-id="376">can read</option>
												<option value="7" data-view-id="377">can update</option>
												<option value="15" data-view-id="378">is owner</option>
											</select>
										</form>
									</div>
									<div class="actions">
										<a id="js_share_perm_delete_1792c272-fa47-4961-78b0-f5fffc4de27c" href="#" class="js_perm_delete close mad_component_button js_component mad_view ready" title="remove" data-view-id="410">
											<i class="fa fa-times-circle"></i>
											<span class="visuallyhidden">remove</span>
										</a>
									</div>
								</li>
							</ul>
						</div>
						<div id="js_permissions_changes" class="warning message ">
							<span>You need to save to apply the changes.</span>
						</div>
						<div class="permission-add">
							<iframe src="../demo/LU_iframe_permissioninput.php" id="passbolt-iframe-password-share" frameborder="0"></iframe>
							<div id="passbolt-password-share-autocomplete-wrapper">
								<iframe src="../demo/LU_iframe_permissioninput_autocomplete.php" id="passbolt-iframe-password-share-autocomplete" frameborder="0" class="hidden"></iframe>
							</div>
						</div>
						<div class="submit-wrapper clearfix">
							<input id="js_rs_share_save" class="button primary" value="save" data-view-id="375" type="submit">
							<a href="#" class="js-dialog-cancel cancel">cancel</a>
						</div>
					</div>
				</div>
            </div></div>
    </div>
</div>

