<!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page password">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
        <?php include('includes/workspace/LU_passwords_workspace.php'); ?>
	</div>
</div>
<?php include('includes/LU_footer.php'); ?>
<iframe class="passbolt-plugin-dialog" src="../demo/LU_iframe_masterkey.php" id="passbolt-iframe-master-password" frameborder="0"></iframe>
</body>
</html>