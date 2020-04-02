<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Thank you</title>
	<?php include('includes/meta/AN_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="src/css/themes/default/api_login.css" />
<body>
<div id="container" class="register thank-you page">
	<?php include('includes/ALL_top_warning_messages.php'); ?>
	<?php include('includes/headers/AN_header_first.php'); ?>
	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>See you in your mailbox!</h2>
				<p>
					We just sent you an email, please follow the instructions to recover your account on this device.
				</p>
				<?php include('includes/AN_disclaimer_recovery.php');?>
			</div>
			<div class="col4 push1 last">
				<div class="logo"><h1><span>Passbolt</span></h1></div>
				<div class="register thank-you form feedback">
					<div class="graphical-feedback"><i class="fa fa-envelope-o huge"></i></div>
					<p><strong>Email sent!</strong> Please check your spam folder if you do not hear from us after a while.</p>
				</div>
			</div>
		</div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
