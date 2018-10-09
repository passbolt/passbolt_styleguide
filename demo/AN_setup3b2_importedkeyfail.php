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
			<h2>D'oh, this is not going to work!</h2>
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
				<form>
					<div class="row">
						<!-- left column -->
						<div class="col7">
							<h3>Information for public and secret key</h3>
							<table class="table-info">
								<tr>
									<td>Owner Name</td>
									<td>
										Mr. Testy Test
									</td>
								</tr>
								<tr>
									<td>Owner Email</td>
									<td class="error">
										test@passbolt
										<span class="alt side">test1@passbolt.com</span>
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
									<td class="error">18 march 2014 21:00</td>
								</tr>
								<tr>
									<td>Key Length</td>
									<td>2048</td>
								</tr>
								<tr>
									<td>Algorithm</td>
									<td class="error">DSA</td>
								</tr>
							</table>
						</div>

						<!-- right column -->
						<div class="col5 last">
							<div class="message error side-message">
								<p>
									<strong>Error:</strong> There is a problem with this key.
									Here are the issues you need fix before continuing:
								</p>
									<ul>
										<li>1. the email selected by your administrator do not match the email in your key.</li>
										<li>2. The key is expired.</li>
										<li>3. The private key was not found.</li>
									</ul>
								<p>
									You need to fix that by either
										<a href="demo/AN_setup2b0_importkey.php">importing another key</a> or
										<a href="demo/AN_setup2a0_createnewkey.php">generating a new one</a>.
								</p>
							</div>
						</div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="demo/AN_setup2b0_importkey.php" class="button cancel big">cancel</a>
							<a href="demo/AN_setup4a0_securitytoken.php" class="button primary next big disabled">next</a>
						</div>
					</div>

				</form>

			</div>
		</div>

	</div>

	<!-- footer -->
	<div class="footer">
		<span class="copyright">&copy; 2015 passbolt.com </span>
	</div>
</div>
</body>
</html>