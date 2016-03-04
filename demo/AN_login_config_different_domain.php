<?php
/**
 * LOGIN: the user did not register or does not have a configured plugin
 */
?>
<!doctype html>
<html class="passbolt no-js passboltplugin passboltplugin-config version alpha" lang="en">
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
				<h2>This domain is not known!</h2>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox warning">
						<p class="message">
							Firefox plugin is installed but is already configured for another domain :<br>
							<a href="#" class="trusteddomain">https://www.passbolt.com</a><br>
							You can <a href="../demo/AN_register.php">register again</a> for this domain,
							but you will lose your account on the existing domain. Proceed with caution.</p>
					</div>
				</div>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="users login form">
					<div class="feedback">
						<i class="fa huge fa-globe" ></i>
						<p>Firefox plugin is not configured to work with this domain</p>
					</div>
					<div class="actions-wrapper center">
						<a class="button primary big" href="../demo/AN_login_stage0.php">Register for this domain</a>
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
