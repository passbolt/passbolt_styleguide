<!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings profile">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<!-- LU_passwords -->
		<?php include('includes/LU_loadingbar.php'); ?>
		<?php include('includes/LU_notifications.php'); ?>
		<?php include('includes/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/LU_header_second_logo.php'); ?>
			<?php include('includes/LU_header_search_users.php'); ?>
			<?php include('includes/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
			<?php include('includes/LU_header_third_title_profile.php'); ?>
			<?php include('includes/LU_header_third_actions_profile.php'); ?>
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php include('includes/LU_nav_shortcuts_profile.php'); ?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'all users' => '../demo/LU_users.php',
								'test user' => '../demo/LU_users_profile.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">
										<div class="grid grid-responsive-12">
											<div class="row">

												<div class="profile col8">
													<h3>Profile</h3>
													<div class="section profile-detailed-information">
														<div class="avatar">
															<div class="value">
																<img src="img/avatar/user_medium.png" alt="profile picture">
															</div>
															<div class="edit">
																<a title="Change Avatar" href="#"
																	 class="edit-avatar-action">
																	<i class="icon camera"></i>
																	<span class="help-text">Click here to upload a new picture.</span>
																</a>
															</div>
														</div>
														<table class="table-info">
															<tr>
																<td>Name</td>
																<td>Mr. Testy test this is a very long test</td>
															</tr>
															<tr>
																<td>Email</td>
																<td>test@passbolt</td>
															</tr>
															<tr>
																<td>Role</td>
																<td>Admin</td>
															</tr>
															<tr>
																<td>Created</td>
																<td>18 march 2013 21:00</td>
															</tr>
															<tr>
																<td>Modified</td>
																<td>18 march 2019 21:00</td>
															</tr>
															<tr>
																<td>Public Key</td>
																<td>292F8400D09A70DB
																	<p>
																		<em>Note: Sorry it is not possible to change your key at the moment.
																			<a href="#">learn more ›</a></em>
																	</p>
																</td>
															</tr>
														</table>
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