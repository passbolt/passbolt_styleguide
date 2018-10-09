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
			<h2>Success! Your secret key is ready. </h2>
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
					<li class="">
						<a href="demo/AN_setup2a0_createnewkey.php">2. Define your keys</a>
					</li>
					<li class="selected">
						<a href="demo/AN_setup3a0_setmasterpassword.php">3. Set a passphrase</a>
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
					<div class="col7">
						<div class="plugin-check-wrapper">
							<h3>Let's make a backup</h3>
							<p>All good! The secret key is stored in your add-on and ready to use.</p>
							<div class="success message backup-prompt">
								<a href="demo/AN_setup4a0_securitytoken.php" class="button primary next big">
									<i class="fa fa-fw fa-download"></i>
									<span>download</span>
								</a>
								<span class="help-text">Take some time to make a backup of your key (and store it in a safe location).</span>
							</div>
							<p>
								You should always make a backup. If you loose this key (by breaking or loosing your computer
								and not having a backup for example), your encrypted data will be lost even if you remember
								your passphrase.
							</p>
						</div>
					</div>
					<div class="col4 last">
						<h3>Pro tips</h3>
						<p>
							The secret key is itself encrypted with the passphrase, so it is only usable if one knows
							the passphrase.<br><br>
							It is a good practice to store a backup in a different location.
							You can, for example, print it and mail it to a family member (along with a nice postcard!) and ask them to keep it somewhere safe.
							<br><br>
							Or, even better, you can store it in a safe if you have one!
						</p>
					</div>
				</div>
				<div class="row last">
					<div class="input-wrapper">
						<a href="demo/AN_setup3a0_setmasterpassword.php" class="button cancel big">cancel</a>
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