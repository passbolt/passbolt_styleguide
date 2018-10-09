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
			<h2>Enter your SMTP server settings.</h2>
		</div>
	</div>

	<div class="panel main ">
		<!-- wizard steps -->
		<div class="panel left">
			<div class="navigation wizard">
				<?php
				$sectionSelected = 'Emails';
				include('includes/nav/AN_nav_webinstaller_sections.php');
				?>
			</div>
		</div>
		<!-- main -->
		<div class="panel middle">
			<div class="grid grid-responsive-12 information">
				<div class="row">
					<div class="col7">
						<h3>SMTP server configuration</h3>
						<div class="input text required">
							<label for="SmtpHost">SMTP host</label>
							<input name="data[Smtp][host]" class="required fluid" id="SmtpHost" required="required" type="text" placeholder="host name or ip address">
						</div>
						<div class="input text required">
							<label for="SmtpTls">Use TLS?</label>
							<select name="data[Smtp][tls]" class="required fluid" id="SmtpTls" required="required">
								<option value="1">Yes</option>
								<option value="0">No</option>
							</select>
						</div>
						<div class="input text required">
							<label for="SmtpPort">Port</label>
							<input name="data[Smtp][port]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="port" value="587">
						</div>
						<div class="input text required">
							<label for="SmtpUsername">Username</label>
							<input name="data[Smtp][username]" class="required fluid" id="SmtpPort" required="required" type="text" placeholder="username">
						</div>
						<div class="input text required">
							<label for="SmtpPassword">Password</label>
							<input name="data[Smtp][password]" class="required fluid" id="SmtpPassword" required="required" type="password" placeholder="password">
						</div>

						<div class="submit-input-wrapper">
							<a href="demo/AN_webinstaller3a0_server_keys.php" class="button big">cancel</a>
							<a href="demo/AN_webinstaller5a0_options.php" class="button big primary">next</a>
						</div>
					</div>
					<div class="col5 last">
						<p>&nbsp;</p>
						<div class="message warning">
							<strong>Pro tip: a cron job is required</strong><br>
							Once your installation is complete, do not forget to set a cron job in order to have your emails sent automatically. <br><a href="#">Read the doc</a>
						</div>
						<h2>Why do I need a SMTP server?</h2>
						<p>Passbolt needs an smtp server in order to send invitation emails after an account creation and to send email notifications.</p>
						<p>You can find configuration examples for some of the most popular email providers in our <a href="https://help.passbolt.com" target="_blank" rel="noopener">knowledge base</a></p>

						<h2>Send test email</h2>
						<p>Test your configuration by sending a test email.</p>
						<div class="message error">
							Email could not be sent: error message<br>
							<a href="#">See debug trace</a>
						</div>
						<div class="input text required">
							<label for="EmailTo">Email</label>
							<input name="data[Smtp][test_email]" class="required fluid" id="EmailTo" required="required" type="text" placeholder="email">
							<a href="#" class="button big">send test email</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>