<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
<body>
<div id="container" class="page settings login-history">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<?php
		$role='admin';
		include('includes/headers/LU_header_first.php');
		?>
		<div class="header second">
			<?php include('includes/headers/LU_header_second_logo.php'); ?>
			<?php include('includes/headers/LU_header_search_users.php'); ?>
			<?php include('includes/headers/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
			<?php include('includes/headers/LU_header_third_title_profile.php'); ?>
            <div class="col2_3 actions-wrapper">
                <ul id="js_wsp_primary_menu"
                    class="actions mad_controller_component_tab_controller mad_view_component_tab js_component ready">
                    <div class="js_tabs_content tabs-content">
                        <div id="js_passbolt_passwordWorkspaceMenu_controller"
                             class="passbolt_controller_component_password_workspace_menu_controller mad_view_view tab-content selected selection">
                            <li>
                                <a id="js_wk_menu_edition_button" class="button mad_controller_component_button_controller mad_view_view js_component"
                                   href="demo/AD_admin_email_notifications.php">
                                    <i class="fa fa-fw fa-save"></i>
                                    <span>save settings</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
			<!-- no action on login history -->
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php
								$_GET['shortcuts'] = 'email_notifications';
								include('includes/nav/AD_nav_administration.php');
							?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'administration' => '#',
								'email notifications settings' => 'demo/AD_email_notifications.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">
										<div class="grid grid-responsive-12">
											<div class="row">

                                                <div class="ldap-configuration-credentials col8">
                                                    <h3>Email delivery</h3>
                                                    <p>
                                                        In this section you can adjust which emails will be delivered
                                                        and which notifications will be ignored.
                                                    </p>
                                                    <div class="col6">
                                                        <label>Passwords</label>
                                                        <div class="input toggle-switch">
                                                            <label for="send_password_create">When you create a password</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_password_create" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_password_create"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_password_update">When a password is updated</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_password_update" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_password_update"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_password_delete">When a password is deleted</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_password_delete" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_password_delete"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_password_share">When a password is shared with you</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_password_share" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_password_share"></label>
                                                        </div>
                                                        <label>Registration & recovery</label>
                                                        <div class="input toggle-switch">
                                                            <label for="send_user_create">when you are invited to passbolt</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_user_create" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_user_create"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_user_recover">when you try to recover an account</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_user_recover" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_user_recover"></label>
                                                        </div>
                                                        <label>Comments</label>
                                                        <div class="input toggle-switch">
                                                            <label for="send_comment_add">When somebody post a comment</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_comment_add" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_comment_add"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col6 last">

                                                        <label>Group membership</label>
                                                        <div class="input toggle-switch">
                                                            <label for="send_group_delete">When a group you belong to is deleted</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_group_delete" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_group_delete"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_group_user_add">When you are added to a group</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_group_user_add" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_group_user_add"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_group_user_delete">When you are removed from a group</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_group_user_delete" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_group_user_delete"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="send_group_user_update">When your permissions changed in a group</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_group_user_update" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_group_user_update"></label>
                                                        </div>
                                                        <label>Group manager</label>
                                                        <div class="input toggle-switch">
                                                            <label for="send_group_manager_update">When members change in a group you manage</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="send_group_manager_update" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="send_group_manager_update"></label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col4 last">
                                                    <h3>Need some help?</h3>
                                                    <div class="notice message">
                                                        <p>For more information about email notification, checkout the
                                                            dedicated page on the help website.</p>
                                                        <a class="button" href="https://help.passbolt.com/configure/" target="_blank">
                                                            <i class="fa fa-fw fa-life-ring"></i>
                                                            <span>Read the documentation</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">

                                                <div class="ldap-configuration-credentials col8">
													<h3>Email content visibility</h3>
                                                    <p>
                                                        In this section you can adjust the composition of the emails, e.g. which information will be included in the notification.
                                                    </p>
                                                    <div class="col6">
                                                        <label>Resources</label>
                                                        <div class="input toggle-switch">
                                                            <label for="content_username">Username</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="content_username" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="content_username"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="content_uri">URI</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="content_uri" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="content_uri"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="content_secrets">Encrypted secret</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="content_secrets" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="content_secrets"></label>
                                                        </div>
                                                        <div class="input toggle-switch">
                                                            <label for="content_description">Description</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="content_description" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="content_description"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col6 last">
                                                        <label>Comments</label>
                                                        <div class="input toggle-switch">
                                                            <label for="content_comment">Comment content</label>
                                                            <input class="toggle-switch-checkbox checkbox" id="content_comment" type="checkbox" checked="checked">
                                                            <label class="toggle-switch-button" for="content_comment"></label>
                                                        </div>
                                                    </div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/LU_footer.php'); ?>
</body>
</html>