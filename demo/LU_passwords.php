<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt ce edition js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<?php include('includes/tableviews/LU_tableview_passwords_contextual_menu.php'); ?>
<?php include('includes/nav/LU_nav_tags_filter_contextual_menu.php'); ?>
<div id="container" class="page password">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
    <?php include('includes/LU_loadingbar.php'); ?>
    <?php include('includes/LU_notifications.php'); ?>
    <?php include('includes/workspace/LU_passwords_workspace.php'); ?>
	</div>
</div>
<?php include('includes/LU_footer.php'); ?>
</body>
</html>