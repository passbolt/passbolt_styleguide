<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page settings mfa">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<?php include('includes/headers/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/headers/LU_header_second_logo.php'); ?>
			<?php include('includes/headers/LU_header_search_users.php'); ?>
			<?php include('includes/headers/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
            <!-- no actions -->
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
								'profile' => 'demo/LU_users_profile.php',
								'multi-factor authentication' => 'demo/LU_users_profile_mfa01.php'
							);
							include('includes/LU_breadcrumbs.php'); ?>
                            <div id="js_wk_settings_main" class="mad.component.Tab mad.view.component.Tab js_component ready">
                                <div class="js_tabs_content tabs-content">
                                    <div id="js_settings_mfa_tab" class="passbolt.component.settings.mfa mad.View tab-content selected ready">
                                        <iframe id="js_mfa_iframe" src="demo/iframes/LU_iframe_mfa_select.php"></iframe>
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