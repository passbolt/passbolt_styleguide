<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings notifications">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<!-- LU_passwords -->


		<?php include('includes/headers/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/headers/LU_header_second_logo.php'); ?>
			<?php include('includes/headers/LU_header_search_users.php'); ?>
			<?php include('includes/headers/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
			<?php include('includes/headers/LU_header_third_title_profile.php'); ?>
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php
							$_GET['shortcuts'] = 'notifications';
							include('includes/nav/LU_nav_shortcuts_profile.php'); ?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'all users' => 'demo/LU_users.php',
								'test user' => 'demo/LU_users_profile.php',
								'Notification settings' => 'demo/LU_notifications.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">
										<div class="grid grid-responsive-12">
											<div class="row">
                                                <div class="col12 last">
												<h2>Email Notifications</h2>
                                                <p>Too many emails? On this screen you can select which email notifications you would like to receive.</p>
                                                </div>
											</div>
                                            <div class="row">
                                                <div class="col6 last">
                                                <h3>On password changes</h3>
                                                <div class="input toggle-switch">
                                                    <label for="cb1">When somebody share a password with you</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb1" type="checkbox">
                                                    <label class="toggle-switch-button" for="cb1"></label>
                                                </div>
                                                <div class="input toggle-switch">
                                                    <label for="cb2">When somebody delete a password you can see.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb2" type="checkbox" checked>
                                                    <label class="toggle-switch-button" for="cb2"></label>
                                                </div>
                                                <div class="input toggle-switch">
                                                    <label for="cb3">When you create a password.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb3" type="checkbox" checked>
                                                    <label class="toggle-switch-button" for="cb3"></label>
                                                </div>
                                                <div class="input toggle-switch">
                                                    <label for="cb4">When somebody comment on an item you can see.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb4" type="checkbox">
                                                    <label class="toggle-switch-button" for="cb4"></label>
                                                </div>
                                                <h3>On group membership changes</h3>
                                                <div class="input toggle-switch">
                                                    <label for="cb5">When a group you are a member of is deleted.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb5" type="checkbox" checked>
                                                    <label class="toggle-switch-button" for="cb5"></label>
                                                </div>
                                                <div class="input toggle-switch">
                                                    <label for="cb6">When somebody is adding you to a group.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb6" type="checkbox">
                                                    <label class="toggle-switch-button" for="cb6"></label>
                                                </div>
                                                <div class="input toggle-switch">
                                                    <label for="cb7">When somebody changed your role in a group.</label>
                                                    <input class="toggle-switch-checkbox checkbox" id="cb7" type="checkbox">
                                                    <label class="toggle-switch-button" for="cb7"></label>
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