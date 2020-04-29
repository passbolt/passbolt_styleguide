<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
    <?php include('includes/meta/LU_meta_login.php'); ?>
</head>
<body class="iframe">
<div class="login-form passphrase-entry">
	<div class="input text required">
		<label for="UserUsername">Username</label>
		<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"
			   value="test@passbolt.com" disabled="disabled"/>
	</div>
	<div class="input text required">
		<label for="js_master_password">Passphrase</label>
		<input type="password" placeholder="password" id="js_master_password" maxlength="50">
		<div class="security-token">CKR</div>
		<div class="message helptext">Please enter your passphrase</div>
	</div>
	<div class="submit-wrapper clearfix">
		<a id="loginSubmit" href="#" class="button primary big disabled processing">Login</a>
	</div>
</div>
</body>
</html>