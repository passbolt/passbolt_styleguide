<!doctype html>
<html class="passbolt no-js no-passboltplugin version alpha" lang="en">
<head>
	<title>Login</title>
	<?php include('includes/ALL_meta.php'); ?>
	<link rel="stylesheet" type="text/css" href="css/login.css" />
<body>
<div id="container" class="login page">
<?php include('includes/ALL_top_warning_messages.php'); ?>
<?php include('includes/AN_header_first.php'); ?>

	<!-- main -->
	<div class="grid">
		<div class="row">
			<div class="col6 push1 information">
				<h2>Welcome back!</h2>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox error">
						<p class="message">An add-on is required to use Passbolt. Download it at <a href="https://github.com/passbolt/passbolt_ff/raw/develop/passbolt-firefox-addon.xpi">addons.mozilla.org</a>.</p>
					</div>
				</div>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox warning">
						<p class="message">Firefox plugin is installed but is not configured. <a href="../demo/AN_register.php">Please register</a>!</p>
					</div>
				</div>
				<div class="plugin-check-wrapper">
					<div class="plugin-check firefox success">
						<p class="message">Nice one! Firefox plugin is installed and configured. You are good to go!.</p>
					</div>
				</div>
				<p>
					Passbolt is a simple password manager that allows you to easily share secrets with your team without making compromises on security!
					<a href="#">learn more</a>.
				</p>
			</div>
			<div class="col4 push1 last">
				<div class="logo">
					<h1><a href="#"><span>Passbolt</span></a></h1>
				</div>
				<div class="users login form">
					<form action="../demo/LU_passwords.php" id="UserLoginForm" method="post" accept-charset="utf-8">
						<input type="hidden" name="_method" value="POST"/>
						<fieldset>
							<legend>Please enter your username and password</legend>
							<div class="input text required">
								<label for="UserUsername">Username</label>
								<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"/>
							</div>
							<div class="input password required">
								<label for="UserPassword">Password</label>
								<input name="data[User][password]" class="required fluid" type="password" id="UserPassword" required="required"/>
							</div>
						</fieldset>
						<div class="actions-wrapper">
							<div class="submit"><input  type="submit" class="button primary" value="login" /></div>
							<a class="secondary" href="#">forgot password?</a>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="row">
			<?php include('includes/AN_promoblock_github.php'); ?>
			<?php include('includes/AN_promoblock_chromeplugin.php'); ?>
			<?php include('includes/AN_promoblock_donate.php'); ?>
		</div>
	</div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
