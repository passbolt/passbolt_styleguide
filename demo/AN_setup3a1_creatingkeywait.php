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
			<h2>Give us a second while we crunch them numbers!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<ul>
					<li class="">
						<a href="../demo/AN_setup1a0_plugincheckfail.php">1. Get the plugin</a>
					</li>
					<li class="">
						<a href="../demo/AN_setup2a0_createnewkey.php">2. Define your keys</a>
					</li>
					<li class="selected">
						<a href="../demo/AN_setup3a0_setmasterpassword.php">3. Set a passphrase</a>
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
							<h3>Generating the secret and public key</h3>

							<div class="progress-bar-wrapper">
								<span class="progress-bar big infinite"><span class="progress "></span></span>
							</div>

							<p>We are generating your public and secret keys. This may take a while. Just take a deep breath and enjoy being in the moment. </p>

						</div>

						<!-- right column -->
						<div class="col4 last"></div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
<!--							<a href="../demo/AN_setup3a0_setmasterpassword.php" class="button cancel big">cancel</a>-->
							<a href="../demo/AN_setup4a0_securitytoken.php" class="button primary next big processing">next</a>
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