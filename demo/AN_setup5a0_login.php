<!doctype html>
<html lang="en" class="version alpha">
<head>
	<?php include('includes/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<div class="col1">
			<div class="logo">
				<img src="img/logo/logo.png" alt="passbolt">
				<h1><span>Passbolt</span></h1>
			</div>
		</div>
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
						<a href="../demo/AN_setup3a0_setmasterpassword.php">3. Set a master password</a>
					</li>
					<li class="">
						<a href="../demo/AN_setup4a0_securitytoken.php">4. Set a security token</a>
					</li>
					<li class="selected">
						<a href="../demo/AN_setup5a0_createloginpassword.php">5. Login!</a>
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
							<h3>Please wait... you are being redirected to the login page</h3>
							<p>Everything is in order, you can now sign in in passbolt.</p>
						</div>

						<!-- right collumn -->
						<div class="col4 last"></div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="../demo/LU_passwords.php" class="button primary next big processing">login!</a>
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