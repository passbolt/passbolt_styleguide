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
			<h2>You've made it!</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'That\s it!';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>The installation is complete</h3>
						<div class="message success">
							<strong>
								<i class="fa fa-check-circle"></i> Success!</strong>
							You have completed successfully the installation procedure, congrats!
							You will soon be redirected to passbolt to complete your account setup.
						</div>
						<div class="input-wrapper">
							<a href="demo/LU_passwords.php" class="button primary next big processing">login!</a>
							<a href="/login">Click here if you can't wait</a>.
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