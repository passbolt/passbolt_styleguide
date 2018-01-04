<!doctype html>
<html class=" js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
    <?php include('includes/meta/LU_meta.php'); ?>
	<script type="text/javascript" src="js/jquery-2.2.4.min.js"></script>
	<style>
		/** The following style will be applied dynamically */
		#passbolt-iframe-password-share {
			height: 5.1em;
		}
		#passbolt-iframe-password-share-autocomplete {
			height: 10em;
		}
		@media all and (max-width: 440px) {
			#passbolt-iframe-password-share-autocomplete {
				height: 17.5em;
			}
		}
	</style>
</head>
<body>
<?php include('includes/dialogs/LU_password_share_autocomplete.php'); ?>
<div id="container" class="page password">
    <div class="mad_event_event_bus"></div>
    <div id="js_app_controller" class="passbolt_controller_app_controller mad_view_view js_component ready">
        <?php include('includes/workspace/LU_passwords_workspace.php'); ?>
    </div>
</div>
<?php include('includes/LU_footer.php'); ?>
</body>
</html>