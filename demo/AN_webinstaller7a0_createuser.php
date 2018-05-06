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
			<h2>Installation is done. Create first user account!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'First user';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>User details</h3>
						<div class="input text required">
							<label for="FirstName">First name</label>
							<input name="data[User][first_name]" class="required fluid" id="FirstName" required="required" type="text" placeholder="First name">
						</div>
						<div class="input text required">
							<label for="LastName">Last name</label>
							<input name="data[User][last_name]" class="required fluid" id="LastName" required="required" type="text" placeholder="Last name">
						</div>
						<div class="input text required">
							<label for="EmailAddress">Email address</label>
							<input name="data[User][email_address]" class="required fluid" id="FirstName" required="required" type="text" placeholder="Email">
						</div>

						<div class="submit-input-wrapper">
<!--							<a href="../demo/AN_webinstaller3a0_server_keys.php" class="button big disabled">cancel</a>-->
							<a href="../demo/AN_webinstaller8a0_done.php" class="button big primary">Create user account</a>
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