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
			<h2>Alright sparky, it's time to log in!</h2>
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
					<li class="">
						<a href="../demo/AN_setup3a0_setmasterpassword.php">3. Set a passphrase</a>
					</li>
					<li class="">
						<a href="../demo/AN_setup4a0_securitytoken.php">4. Set a security token</a>
					</li>
					<li class="selected">
						<a href="../demo/AN_setup5a0_login.php">5. Login!</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12">
				<form>
					<div class="row">
						<!-- left collumn -->
						<div class="col7">
							<h3>The setup is complete</h3>
							<div class="message success">
								<strong>
									<i class="fa fa-check-circle"></i> Success!</strong>
								You have completed successfully the setup, thank you!
								You will soon be redirected to the login page.
							</div>
							<div class="input-wrapper">
								<a href="../demo/LU_passwords.php" class="button primary next big processing">login!</a>
								<a href="/login">Click here if you can't wait</a>.
							</div>
							<p>
						</div>
						<!-- right collumn -->
						<div class="col4 last">
						</div>
					</div>
				</form>

			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>