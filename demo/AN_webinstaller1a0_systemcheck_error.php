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
			<h2>Welcome to passbolt web installer!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'System check';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h2>Kindly fix the errors displayed below before you can proceed.</h2>
						<h3>Environment</h3>
						<div class="message success">PHP version 7.1.9.</div>
						<div class="message error accordion-header">PCRE has not been compiled with Unicode support.</div>
						<div class="message error accordion-header">The temporary directory and its content are not writable.</div>
						<div class="message error accordion-header">The public image directory and its content are not writable.</div>
						<div class="message success">The logs directory and its content are writable.</div>
						<div class="message success">GD or Imagick extension is installed.</div>
						<div class="message success">Intl extension is installed.</div>
						<div class="message success">Mbstring extension is installed.</div>
						<div id="url-rewriting-warning" class="message error">
							URL rewriting is not properly configured on your server. <a target="_blank" rel="noopener" href="http://book.cakephp.org/2.0/en/installation/url-rewriting.html">Learn more.</a>
						</div>
						<h3>GPG Configuration</h3>
						<div class="message success">PHP GPG Module is installed and loaded.</div>
						<div class="message success">The environment variable GNUPGHOME is set to /var/lib/nginx/.gnupg.</div>
						<div class="message success">The directory /var/lib/nginx/.gnupg containing the keyring is writable by the webserver user.</div>

						<h3>SSL</h3>
						<div class="message warning">This web page is not served with HTTPS. It is strongly recommended that you configure your web server with HTTPS before you continue.</div>

						<div class="submit-input-wrapper">
							<a href="../demo/AN_webinstaller1a1_systemcheck_success.php" class="button primary big">retry</a>
						</div>
					</div>
					<div class="col5 last">
						<h2>Help</h2>
						<p>Need help? You can find more information on how to install passbolt
							in the official online help.</p>
						<a href="https://help.passbolt.com" target="_blank" rel="noopener" class="button primary big">
							<i class="fa fa-fw fa-life-saver"></i>
							Help
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>