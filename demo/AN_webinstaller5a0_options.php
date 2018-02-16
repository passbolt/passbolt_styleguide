<!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/devel.css" />
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_web_installer.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>Choose your preferences</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Options';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>Options</h3>
						<div class="input text required">
							<label for="FullBaseUrl">Full base url</label>
							<input name="data[Options][full_base_url]" class="required fluid" id="FullBaseUrl" required="required" type="text" placeholder="Full Base Url" value="https://the-host-from-the-url.com">
							<div class="message">This url will be used for places where the passbolt url cannot be guessed, such as links in emails.</div>
						</div>
						<div class="input text required">
							<label for="PublicRegistration">Allow public registration?</label>
							<select name="data[Options][public_registration]" class="required fluid" id="PublicRegistration" required="required">
								<option value="1">Yes</option>
								<option value="0" selected="selected">No</option>
							</select>
							<div class="message">Allowing public registration means that any visitor can create himself an account on your passbolt. Unless your instance of passbolt is not reachable by the outside world, it is usually a bad idea.</div>
						</div>
						<div class="input text required">
							<label for="PublicRegistration">Force SSL?</label>
							<select name="data[Options][public_registration]" class="required fluid" id="PublicRegistration" required="required">
								<option value="1" selected="selected">Yes</option>
								<option value="0">No</option>
							</select>
							<div class="message">Forcing SSL means that passbolt will not accept connections coming from a non secure protocol. This means that your server have to be configured for HTTPS, and it is highly recommended that you do so.</div>
						</div>

						<div class="submit-input-wrapper">
							<a href="../demo/AN_webinstaller3a0_server_keys.php" class="button big">cancel</a>
							<a href="../demo/AN_webinstaller6a0_installingwait.php" class="button big primary">next</a>
						</div>
					</div>
					<div class="col5 last">
						<h2>Need more options?</h2>
						<p>Passbolt implements more configuration options. You can see them all by checking the default configuration file (default.php), and then add them manually in your passbolt configuration file (passbolt.php) after the installation is finished.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>