<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings keys">
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
			<?php include('includes/headers/LU_header_third_actions_profile_keyinspector.php'); ?>
		</div>
		<div class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready" id="js_app_panel_main">
			<div class="js_tabs_content tabs-content">
				<div id="js_passbolt_preferenceWorkspace_controller" class="passbolt_controller_preference_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_preference_workspace">
						<div class="panel left">
							<?php
							$_GET['shortcuts'] = 'keyinspector';
							include('includes/nav/LU_nav_shortcuts_profile.php'); ?>
						</div>
						<div class="panel middle">
						<?php
							$_GET['breadcrumbs'] = array(
								'all users' => '../demo/LU_users.php',
								'test user' => '../demo/LU_users_profile.php',
								'key inspector' => '../demo/LU_users_profile_keyinspector.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<div id="js_wk_preference_main"
									 class="mad_controller_component_tab_controller mad_view_component_tab js_component ready">
								<div class="js_tabs_content tabs-content">
									<div id="js_preference_wk_profile_controller"
											 class="passbolt_controller_component_profile_controller mad_view_view tab-content ready selected">
										<div class="grid grid-responsive-12">
											<div class="row">

												<!-- left column -->
												<div class="col6 key-info">
													<h3>Information for public and secret key</h3>
													<table class="table-info">
														<tr>
															<td>Key Id</td>
															<td>
																<div class="input select tooltip-top"
																		 data-tooltip="sorry you can only have one key set at the moment">
																	<select name="data[Key][0]" id="KeyType" disabled="disabled" class="">
																		<option value="292F8400D09A70DB">292F8400D09A70DB</option>
																	</select>
																</div>
															</td>
														</tr>
														<tr>
															<td>Owner Name</td>
															<td>Mr. Testy Test</td>
														</tr>
														<tr>
															<td>Owner Email</td>
															<td>test@passbolt.com</td>
														</tr>
														<tr>
															<td>Fingerprint</td>
															<td>B9F3 86B6 0BD2 46C4 1A07 975C 292F 8400 D09A 70DB</td>
														</tr>
														<tr>
															<td>Creatred</td>
															<td>18 march 2013 21:00</td>
														</tr>
														<tr>
															<td>Expires</td>
															<td>18 march 2019 21:00</td>
														</tr>
														<tr>
															<td>Key Length</td>
															<td>2048</td>
														</tr>
														<tr>
															<td>Algorithm</td>
															<td>RSA</td>
														</tr>
													</table>
												</div>

												<div class="col6 last key-export">
													<ul class="actions duo-wrapper">
														<li>
															<a href="#" class="button selected toggle duo">
																<span>public</span>
															</a>
															<a href="#" class="button toggle duo">
																<span>both</span>
															</a>
														</li>
														<li>
															<a href="#" class="button">
																<i class="fa fa-fw fa-download"></i>
																<span>download</span></a>
														</li>
													</ul>
													<div class="input textarea gpgkey">
														<textarea class="fluid code" name="data[Key][ascii]" placeholder="">
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

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
oqk6oA==
=9+qA
-----END PGP PUBLIC KEY BLOCK-----

														</textarea>
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