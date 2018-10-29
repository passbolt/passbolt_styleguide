<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page administration mfa login-history">
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
			<?php include('includes/headers/AD_header_third_actions_admin_mfa.php'); ?>
			<!-- no action on login history -->
		</div>
		<div class="panel main ready">
			<div id="js_administration_workspace">
				<div class="panel left">
					<?php
					$_GET['shortcuts'] = 'mfa_configuration';
					include('includes/nav/AD_nav_administration.php');
					?>
				</div>
				<div class="panel middle">
					<?php
					$_GET['breadcrumbs'] = array(
						'Administration' => 'demo/AD_admin_mda_configuration.php',
						'Multi factor authentication' => 'demo/AD_admin_mda_configuration.php',
						'Settings' => 'demo/AD_admin_mda_configuration.php'
					);
					include('includes/LU_breadcrumbs.php'); ?>
					<div id="js_wk_administration_main" class="workspace-main">
						<div class="grid grid-responsive-12">
							<div class="row">
								<div class="mfa-settings col8">
									<? include('includes/form/AD_mfa_settings.php') ?>
									<p>&nbsp;</p>
								</div>

								<div class="col4 last">
									<h2>Need help?</h2>
									<p>Check out our multi factor authentication configuration guide</p>
									<a class="button" href="https://help.passbolt.com/configure/mfa" target="_blank">
										<i class="fa fa-fw fa-life-ring"></i>
										<span>Read documentation</span>
									</a>
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