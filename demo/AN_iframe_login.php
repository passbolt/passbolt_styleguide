<!doctype html>
<html>
<head>
    <?php include('includes/LU_meta_iframe.php'); ?>
    <style>
        #js_master_password:focus,
        #js_master_password + .security-token {
            background:#ffbbbb;
            color:#000;
        }
        #js_master_password:focus + .security-token {
            background:#000;
            color:#ffbbbb;
        }
    </style>
</head>
<body>
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
		<a id="loginSubmit" href="#" class="button primary big">login</a>
	</div>
</div>
</body>
</html>