<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Welcome to passbolt! Let's take 5 min to setup your system.</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="selected">
						<a href="#">1. Get the plugin</a>
					</li>
					<li class="disabled">
						2. Define your keys
					</li>
					<li class="disabled">
						3. Set a passphrase
					</li>
					<li class="disabled">
						4. Set a security token
					</li>
					<li class="disabled">
						5. Login!
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>Browser check</h3>
						<div class="plugin-check-wrapper">
							<div class="plugin-check firefox error">
								<p class="message">
									Passbolt is not available for your browser. Try with <a href="https://www.mozilla.org/firefox">Mozilla Firefox</a>.
								</p>
							</div>
						</div>
						<p>
							<h3>Other browsers support coming up</h3>
							Don't worry, we aim at enabling more browsers in the future. Thanks to consider supporting us
							financially to this feature move a bit more quickly.
							<a href="#">Support us</a>.
						</p>
					</div>
					<div class="col5 last">
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>