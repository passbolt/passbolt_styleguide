<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<?php include('includes/nav/LU_nav_tree_groups_contextual_menu.php'); ?>
<div id="container" class="page user">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">

		<?php include('includes/headers/LU_header_first.php'); ?>
		<div class="header second">
			<?php include('includes/headers/LU_header_second_logo.php'); ?>
			<?php include('includes/headers/LU_header_search_passwords.php'); ?>
			<?php include('includes/headers/LU_header_userbadge.php'); ?>
		</div>
		<div class="header third">
			<?php include('includes/headers/LU_header_third_main_action_users.php'); ?>
			<?php include('includes/headers/LU_header_third_actions_users.php'); ?>
		</div>
		<div id="js_app_panel_main" class="panel main mad_controller_component_tab_controller mad_view_component_tab js_component ready">
			<div class="js_tabs_content tabs-content">
				<div class="passbolt_controller_password_workspace_controller mad_view_view tab-content ready selected">
					<div class="js_workspace">
						<div class="panel left">
							<?php include('includes/nav/LU_nav_shortcuts_users2.php'); ?>
							<?php include('includes/nav/LU_nav_tree_groups.php'); ?>
						</div>
						<div class="panel middle">
							<?php
							$_GET['breadcrumbs'] = array(
								'all users' => '../demo/LU_users.php',
								'Search : abcde fghijk' => ''
							);
							include('includes/LU_breadcrumbs.php'); ?>
							<?php include('includes/tableviews/LU_tableview_users_empty_filter.php'); ?>
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