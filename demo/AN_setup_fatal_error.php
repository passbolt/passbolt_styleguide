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
			<h2>Damn...</h2>
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
					<li class="">
						<a href="demo/AN_setup3a0_setmasterpassword.php">3. Set a passphrase</a>
					</li>
					<li class="">
						<a href="demo/AN_setup4a0_securitytoken.php">4. Set a security token</a>
					</li>
					<li class="selected">
						<a href="demo/AN_setup5a0_login.php">5. Login!</a>
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
							<h3>An error occured</h3>
							<div class="message error clearfix">
								<p><strong>
									<i class="fa fa-times-circle"></i> Error!</strong>
								Something unexpected happened. The setup can't be completed.</p>
								<h4>What to do now ?</h4>
								<p>Please contact us or your system administrator, and provide the debug information below.</p>
								<p><a><i class="fa fa-toggle-down"></i> See debug info</a></p>
<textarea class="col12" height="200px">
error : Could not validate the user
{
	json : {
		debug info
	}
}
</textarea>
								</p>
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