<!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
	<?php include('includes/meta/LU_meta.php'); ?>
	<script src="js/jquery-filestyle.js"></script>
</head>
<body>
<div id="container" class="page password">
	<div class="mad_event_event_bus"></div>
	<div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
		<!-- edit dialog -->
		<?php
            include('includes/dialogs/LU_passwords_import_result.php');
        ?>
        <?php include('includes/workspace/LU_passwords_workspace.php'); ?>
	</div>
</div>
<?php include('includes/LU_footer.php'); ?>
</body>
</html>