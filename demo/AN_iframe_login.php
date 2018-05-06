<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
    <?php include('includes/meta/LU_meta_iframe.php'); ?>
    <?php include('includes/meta/LU_security_token_style.php'); ?>
</head>
<body class="iframe">
<div class="login-form master-password ">
	<div class="input text required">
		<label for="UserUsername">Username</label>
		<input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required"
			   value="test@passbolt.com" disabled="disabled"/>
	</div>
	<div class="input text required">
		<label for="js_master_password">Master password</label>
		<input type="password" placeholder="password" id="js_master_password" maxlength="50">
		<div class="security-token">CKR</div>
		<div class="message helptext">Please enter your secret key password</div>
	</div>
	<div class="submit-wrapper clearfix">
		<a id="loginSubmit" href="#" class="button primary big disabled processing">login</a>
	</div>
</div>
</body>
</html>