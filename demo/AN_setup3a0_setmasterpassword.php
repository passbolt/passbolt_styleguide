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
			<h2>Now let's setup your passphrase!</h2>
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
				<form>
					<div class="row">
						<!-- left column -->
						<div class="col7">
							<h3>Set your passphrase</h3>
							<p>This password is the only password you will need to remember from now on so make sure you choose it wisely! </p>

							<div class="input-password-wrapper">
								<div class="input password required">
									<label for="js_field_password" class="hidden">New passphrase</label>
									<input name="passbolt.model.User.password" type="password" id="js_field_password" placeholder="enter your password here">
									<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear" style="display: none;">
								</div>
								<ul class="actions inline">
									<li>
										<a href="#" id="js_show_pwd_button"
											 class="button toggle mad_controller_component_button_controller mad_view_view js_component ready tooltip-right always-show large"
											 	data-tooltip="click here to view in clear text">
											<i class="fa fa-eye fa-lg"></i>
											<span class="visuallyhidden">view</span>
										</a>
									</li>
								</ul>
								<div id="js_user_pwd_strength" class="password-complexity">
									<span class="progress"><span class="progress-bar fair"></span></span>
									<span class="complexity-text">complexity: <strong>fair</strong></span>
								</div>
							</div>

							<div class="password-hints">
								<p>Some tips for choosing a strong password:</p>
								<ul>
									<li class="success">It is at least 8 char in length</li>
									<li class="error">It contains lower and uppercase character</li>
									<li>It contains letters and numbers</li>
									<li>It contains special characters (like / or * or %)</li>
									<li>It is not part of a dictionary</li>
								</ul>
							</div>
						</div>

						<!-- right column -->
						<div class="col4 last">

						</div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="demo/AN_setup2a0_createnewkey.php" class="button cancel big">cancel</a>
							<a href="demo/AN_setup3a1_creatingkeywait.php" class="button primary next big">next</a>
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