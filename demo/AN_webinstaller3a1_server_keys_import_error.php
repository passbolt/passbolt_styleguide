<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha no-passboltplugin no-firefox chrome">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_web_installer.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>D'oh, this is not going to work!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Server keys';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="grid grid-responsive-12">
						<form>
							<div class="row">
								<!-- left column -->
								<div class="col7">
									<h3>Information about public and private key</h3>
									<table class="table-info">
										<tbody><tr>
											<td>Name</td>
											<td>
												Mr. Testy Test
											</td>
										</tr>
										<tr>
											<td>Email</td>
											<td>test@passbolt</td>
										</tr>
										<tr>
											<td>Key Id</td>
											<td>292F8400D09A70DB</td>
										</tr>
										<tr>
											<td>Fingerprint</td>
											<td>B9F3 86B6 0BD2 46C4 1A07 975C 292F 8400 D09A 70DB</td>
										</tr>
										<tr>
											<td>Created</td>
											<td>18 march 2013 21:00</td>
										</tr>
										<tr>
											<td>Expires</td>
											<td class="error">18 march 2014 21:00</td>
										</tr>
										<tr>
											<td>Key Length</td>
											<td>2048</td>
										</tr>
										<tr>
											<td>Algorithm</td>
											<td>DSA</td>
										</tr>
										<tr>
											<td>Master password</td>
											<td class="error">Yes</td>
										</tr>
										</tbody></table>
								</div>

								<!-- right column -->
								<div class="col5 last">
									<div class="message error side-message">
										<p>
											<strong>Error:</strong> There is a problem with this key.
											Here are the issues you need fix before continuing:
										</p>
										<ul>
											<li>1. Your key has an expiry date. It is not supported by passbolt yet.</li>
											<li>2. Your key is encrypted with a passphrase. It is not supported by passbolt.</li>
										</ul>
										<p>
											You need to fix that by either
											<a href="../demo/AN_webinstaller3a1_server_keys_import.php">importing another key</a> or
											<a href="../demo/AN_webinstaller3a0_server_keys.php">generating a new one</a>.
										</p>
									</div>
								</div>

							</div>

							<div class="row last">
								<div class="input-wrapper">
									<a href="../demo/AN_webinstaller3a1_server_keys_import.php" class="button cancel big">cancel</a>
									<a href="#" class="button primary next big disabled">next</a>
								</div>
							</div>

						</form>

					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>