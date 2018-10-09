<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha">
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
			<h2>Let's make sure you imported the right key</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="">
						<a href="demo/AN_setup1a0_plugincheckfail.php">1. Get the plugin</a>
					</li>
					<li class="selected">
						<a href="demo/AN_setup2b0_importkey.php">2. Import your keys</a>
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
					<!-- left column -->
					<div class="col7">
						<h3>Information for public and secret key</h3>
						<table class="table-info">
							<tr>
								<td>Owner Name</td>
								<td class="warning">
									Mr. Testy Test
									<span class="alt side">Testy Test</span>
								</td>
							</tr>
							<tr>
								<td>Owner Email</td>
								<td>
									test@passbolt
								</td>
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
								<td>Creatred</td>
								<td>18 march 2013 21:00</td>
							</tr>
							<tr>
								<td>Expires</td>
								<td>18 march 2019 21:00</td>
							</tr>
							<tr>
								<td>Key Length</td>
								<td>2048</td>
							</tr>
							<tr>
								<td>Algorithm</td>
								<td>RSA</td>
							</tr>
						</table>
					</div>

					<!-- right column -->
					<div class="col5 last">
						<div class="message warning side-message">
							<p>
								<strong>Warning:</strong> the name selected by your administrator do not match the name in your key. Passbolt will use the information provided by the administrator to identify yourself.
							</p>
							<p>
								While this is not a deal breaker this may lead to some confusions.
								<a href="#">Learn more.</a>
							</p>
							<p class="small">
								Note: Passbolt do not support multiple user identities at the moment.
							</p>
						</div>
					</div>

				</div>

				<div class="row last">
					<div class="input-wrapper">
						<a href="demo/AN_setup2b0_importkey.php" class="button cancel big">cancel</a>
						<a href="demo/AN_setup4a0_securitytoken.php" class="button primary next big">next</a>
					</div>
				</div>

			</div>
		</div>

	</div>

	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>