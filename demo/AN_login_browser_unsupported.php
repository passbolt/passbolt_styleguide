<?php
/**
 * LOGIN: the user uses chrome instead of firefox
 */
?>
<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin no-firefox version alpha" lang="en">
<head>
	<title>Login</title>
	<?php include('includes/meta/AN_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/themes/default/api_login.css" />
<body>
<div id="container" class="login page">
<?php include('includes/ALL_top_warning_messages.php'); ?>
<?php include('includes/headers/AN_header_first.php'); ?>

	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<div class="plugin-check-wrapper">
					<h2>Download firefox!</h2>
					<div class="plugin-check firefox error">
						<p class="message">
							Passbolt is not available for your browser. Try with <a href="https://www.mozilla.org/firefox">Mozilla Firefox</a>.
						</p>
					</div>
				</div>
				<p>
					Don't worry, we aim at enabling more browsers in the future. Thanks to consider supporting us
					financially to this feature move a bit more quickly.
					<a href="#">Support us</a>.
				</p>
			</div>
			<div class="col4 push1 last">
				<div class="logo"><h1><span>Passbolt</span></h1></div>
				<div class="users login form">
					<div class="feedback">
						<i class="fa huge fa-download" ></i>
					</div>
					<div class="actions-wrapper center">
						<a class="button primary" href="https://www.mozilla.org/firefox">Download firefox</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<?php include('includes/promoblocks/AN_promoblock_cloud.php'); ?>
			<?php include('includes/promoblocks/AN_promoblock_passboltpro.php'); ?>
			<?php include('includes/promoblocks/AN_promoblock_github.php'); ?>
		</div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
