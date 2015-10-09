<?php
/**
 * LOGIN: the user did not register or does not have a configured plugin
 */
?>
<!doctype html>
<html class="no-js passboltplugin no-passboltplugin-config version alpha" lang="en">
<head>
	<title>Login</title>
	<?php include('includes/ALL_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/login.css" />
<body>
<div id="container" class="login page">
<?php include('includes/ALL_top_warning_messages.php'); ?>
<?php include('includes/AN_header_first.php'); ?>

	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>Almost there, please register!</h2>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox warning">
						<p class="message">Firefox plugin is installed but is not configured. <a href="../demo/AN_register.php">Please register</a>!</p>
					</div>
				</div>
				<p>
					Passbolt is a simple password manager that allows you to easily share secrets with your team without making compromises on security!
					<a href="#">learn more</a>.
				</p>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="users login form">
					<div class="feedback">
						<i class="icon huge rocket" ></i>
						<p>You need an account to login.</p>
					</div>
					<div class="actions-wrapper center">
						<a class="button primary big" href="../demo/AN_login_stage0.php">Register</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<?php include('includes/AN_promoblock_github.php'); ?>
			<?php include('includes/AN_promoblock_chromeplugin.php'); ?>
			<?php include('includes/AN_promoblock_donate.php'); ?>
		</div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
