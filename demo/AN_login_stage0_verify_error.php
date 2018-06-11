<?php
/**
 * LOGIN: stage 0 server key verification
 */
?>
<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js passboltplugin passboltplugin-config version alpha" lang="en">
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
		<div class="row js_main-login-section">
			<div class="col6 push1 information">
				<h2>Welcome back!</h2>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox success">
						<p class="message">Nice one! Firefox plugin is installed and configured. You are good to go!.</p>
					</div>
				</div>
				<div class="plugin-check-wrapper">
					<div class="plugin-check gpg error">
						<p class="message">There was a problem when trying to
                            communicate with the server <a href="#">(HTTP Code:400)</a></p>
					</div>
				</div>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><span>Passbolt</span></h1>
				</div>
				<div class="users login form">
					<div class="feedback">
						<i class="fa fa-cog fa-warning huge"></i>
						<p>Oops, something went wrong</p>
					</div>
					<div class="actions-wrapper center">
						<a class="button primary big" href="/auth/login">Retry</a>
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
