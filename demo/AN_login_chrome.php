<?php
/**
 * LOGIN: the user uses chrome instead of firefox
 */
?>
<!doctype html>
<html class="no-js no-passboltplugin no-firefox version alpha" lang="en">
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
				<h2>Download the plugin to get started!</h2>
				<div class="plugin-check-wrapper">
					<div class="plugin-check chrome error">
						<p class="message">
							Passbolt is not available for your browser. Try with <a href="https://firefox.mozilla.org/">firefox.mozilla.org</a>.
						</p>
					</div>
				</div>
				<p>
					The chrome plugin is currently not available. Don't worry, we aim at enabling more browsers in the future.
					Thanks to consider supporting us financially to this feature move a bit more quickly.
					<a href="#">Support us</a>.
				</p>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="users login form">
					<div class="feedback">
						<i class="icon huge download" ></i>
					</div>
					<div class="actions-wrapper center">
						<a class="button primary" href="#">Download firefox</a>
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
