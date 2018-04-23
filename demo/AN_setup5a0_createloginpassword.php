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
			<h2>Alright sparky, let's create your first password!</h2>
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
						<!-- left column -->
						<div class="col7">
							<h3>This is your password to login in the application itself</h3>
							<p>Cheer up. The good news is you can now use your freshly configured plugin to generate and store it! That's right you do not need to remember it.</p>
							<div class="first-password-wrapper">
								<div class="input text required">
									<label for="PasswordName">Name</label>
									<input id="PasswordName" type="text" class="fluid" value="Passbolt Login" required="required" disabled="disabled"/>
								</div>
								<div class="input text required">
									<label for="PasswordURL">URL</label>
									<input id="PasswordURL" type="text" class="fluid" value="http://demo.passbolt.com" required="required" disabled="disabled"/>
								</div>
								<div class="input text required">
									<label for="PasswordUsername">Username</label>
									<input id="PasswordUsername" type="text" class="fluid" value="test@passbolt.com" required="required" disabled="disabled"/>
								</div>

								<div class="input-password-wrapper">
									<div class="input password required">
										<label for="js_field_password" class="hidden">New passphrase</label>
										<input name="passbolt.model.User.password" type="password" id="js_field_password" placeholder="enter your password here">
										<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear">
									</div>
									<ul class="actions inline">
										<li>
											<a href="#" id="js_show_pwd_button" class="button toggle mad_controller_component_button_controller mad_view_view js_component ready">

												<i class="fa fa-eye fa-fw fa-lg"></i>
												<span class="visuallyhidden">view</span>
											</a>
										</li>
										<li>
											<a href="#" id="js_gen_pwd_button" class="button mad_controller_component_button_controller mad_view_view js_component ready tooltip-right always-show large"
												data-tooltip="generate a random password">
												<i class="fa fa-magic fa-fw fa-lg"></i>
												<span class="visuallyhidden">generate</span>
											</a>
										</li>
									</ul>
									<div id="js_user_pwd_strength" class="password-complexity">
										<span class="progress"><span class="progress-bar fair"></span></span>
										<span class="complexity-text">complexity: <strong>fair</strong></span>
									</div>
								</div>
							</div>
						</div>

						<!-- right column -->
						<div class="col4 last"></div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="../demo/AN_setup4a0_securitytoken.php" class="button cancel big">cancel</a>
							<a href="../demo/LU_passwords.php" class="button primary next big">login!</a>
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