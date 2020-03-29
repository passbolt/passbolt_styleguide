<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
	<script type="application/javascript">
		$(function() {
			$("#ConnectionProtocol").chosen({width: '100%', disable_search: true});
			$("#DefaultGroupAdminUser").chosen();
			$("#DefaultUser").chosen();
			$('.section-sync-options').addClass('closed');
            $('.section-directory-configuration').addClass('closed');
		});
	</script>
</head>
<body>
<div id="container" class="page administration ldap-configuration-edit">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<!-- LU_passwords -->
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
            <?php include('includes/headers/AD_header_third_actions_admin_ldap_edit.php'); ?>
			<!-- no action on login history -->
		</div>
		<div class="panel main ready">
			<div id="js_administration_workspace">
				<div class="panel left">
					<?php
						$_GET['shortcuts'] = 'ldap_configuration';
						include('includes/nav/AD_nav_administration.php');
					?>
				</div>
				<div class="panel middle">
					<?php
					$_GET['breadcrumbs'] = array(
						'Administration' => 'demo/AD_admin_ldap_configuration.php',
						'Users Directory' => 'demo/AD_admin_ldap_configuration.php',
						'Settings' => 'demo/AD_admin_ldap_configuration.php',
						'Edit' => 'demo/AD_admin_ldap_configuration_edit.php'
					);
					include('includes/LU_breadcrumbs.php'); ?>
					<div id="js_wk_administration_main" class="workspace-main">
						<div class="grid grid-responsive-12">
							<div class="row">
								<div class="ldap-settings enabled col8">
									<?php
									$_GET['ldap_settings']['edit'] = 1;
									$_GET['ldap_settings']['enabled'] = 1;
									include('includes/form/AD_ldap_settings.php') ?>
									<p>&nbsp;</p>
								</div>

								<div class="col4 last">
									<h2>Need help?</h2>
									<p>Check out our ldap configuration guide</p>
									<a class="button" href="https://help.passbolt.com/configure/ldap" target="_blank">
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
<script type="application/javascript">
	var disabled = true;
	$('.toggle-switch-button').on('click', () => {
		disabled = !disabled;
	$('.ldap-settings').toggleClass('enabled');
	$('.toggle-switch-checkbox').attr('checked', !disabled);
	});
</script>