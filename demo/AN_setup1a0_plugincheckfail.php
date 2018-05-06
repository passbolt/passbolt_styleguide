<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha no-passboltplugin">
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
			<div class="grid grid-responsive-12">
				<div class="row">
					<div class="col7">
						<div class="plugin-check-wrapper">
							<h3>Plugin check</h3>
							<div class="plugin-check firefox error">
								<p class="message">An add-on is required to use Passbolt. Download it at <a href="#">addons.mozilla.org</a>.</p>
							</div>
						</div>
						<div class="why-plugin-wrapper">
							<h3>Why do I need a plugin</h3>
							<p>
								Passbolt requires a browser add-on to guarantee that your secret key and your passphrase are never accessible to any website (including passbolt.com itself).
								This is also the only way to guarantee that the core cryptographic libraries cannot be tampered with.
								<a href="#">Learn more</a>
							</p>
						</div>
						<div class="submit-input-wrapper">
							<a href="../demo/AN_setup1a1_plugincheckok.php" class="button primary big">retry</a>
						</div>
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