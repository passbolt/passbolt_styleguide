<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings login-history">
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
			<!-- no action on login history -->
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php
								$_GET['shortcuts'] = 'loginhistory';
								include('includes/nav/LU_nav_shortcuts_profile.php');
							?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'all users' => '../demo/LU_users.php',
								'test user' => '../demo/LU_users_profile.php',
								'login history' => '../demo/LU_users_profile_loginhistory.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">
										<div class="grid grid-responsive-12">
											<div class="row">

												<div class="login-history col8">
													<h3>Login history</h3>
													<table class="table-info horizontal ">
														<thead>
															<tr>
																<th><span class="hidden">status icon</span></th>
																<th>status</th>
																<th>IP</th>
																<th>When</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<i class="fa fa-check-square"></i>
																	<span class="visuallyhidden">success</span>
																</td>
																<td>success</td>
																<td>192.168.102.120</td>
																<td>22 Mar 2015 @ 12:31</td>
															</tr>
															<tr>
																<td>
																	<i class="fa fa-warning"></i>
																	<span class="visuallyhidden">warning</span>
																</td>
																<td>warning</td>
																<td>192.168.102.122</td>
																<td>22 Mar 2015 @ 12:31</td>
															</tr>
															<tr>
																<td>
																	<i class="fa fa-ban"></i>
																	<span class="visuallyhidden">error</span>
																</td>
																<td>error</td>
																<td>192.168.102.120</td>
																<td>22 Mar 2015 @ 12:31</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div class="col4 last">
													<h3>What is this?</h3>
													<div class="side-message">
														<p>
															You can use this screen to check if there was any malicious attempt to access your data.
														</p>
														<p>
															Warnings will be triggered when a someone is trying to connect to your account from a new
															IP address e.g. from a new device or different connection than your usual one.
														</p>
														<p>
															Errors will be triggered when a someone fail to provide the right login credentials.
														</p>
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