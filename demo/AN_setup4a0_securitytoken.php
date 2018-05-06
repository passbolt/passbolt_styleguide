<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="version alpha">
<head>
	<?php include('includes/meta/AN_meta_setup.php'); ?>
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/farbtastic.js"></script>
	<script type="text/javascript" src="js/colorpicker.js"></script>
</head>
<body>
<div id="container" class="page setup">
	<!-- first header -->
	<?php include('includes/headers/AN_header_first_setup.php'); ?>

	<!-- second header -->
	<div class="header second">
		<?php include('includes/AN_logo.php'); ?>
		<div class="col2_3">
			<h2>We need a visual cue to protect us from the bad guys...</h2>
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
					<li class="selected">
						<a href="../demo/AN_setup4a0_securitytoken.php">4. Set a security token</a>
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
							<h3>Set a security token</h3>
							<p>Please choose a color and three letters (or remember the combination we conveniently generated for you.</p>

							<div class="colorpicker">
								<div class="input color">
									<input type="text" id="js_security_token_text" class="token" name="text" maxlength="3"/>
									<div id="js_field_name_feedback" class="message error">Error message for input text</div>
									<input type="hidden" id="js_security_token_background" name="background" />
									<input type="hidden" id="js_security_token_color" name="color" />
								</div>
								<div id="js_colorpicker"></div>
							</div>

						</div>

						<!-- right column -->
						<div class="col4 last">
							<h3>Wait, why do I need this?</h3>
							<p>
							This token is used to prevent malicious web pages to trick you by mimicking passbolt dialogs in order to
								to steal your data (aka. protect you from phishing attacks).
							</p>
							<p>
							This visual cue will be shown whenever we ask you for your passphrase and other sensitive places
								to help make sure you are dealing with an authentic passbolt dialog and not a fake one!
							</p>
							<p><a href="#">Learn more</a>.</p>
						</div>

					</div>

					<div class="row last">
						<div class="input-wrapper">
							<a href="../demo/AN_setup3b0_importedkeyok.php" class="button cancel big">cancel</a>
							<a href="../demo/AN_setup5a0_createloginpassword.php" class="button primary next big">next</a>
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