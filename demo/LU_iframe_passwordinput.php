<!doctype html>
<html>
<head>
	<?php include('includes/LU_meta_iframe.php'); ?>
	<style>
		#js_field_password:focus,
		#js_field_password ~ .security-token {
			background:#ffbbbb;
			color:#000;
		}
		#js_field_password:focus ~ .security-token {
			background:#000;
			color:#ffbbbb;
		}
	</style>
</head>
<body>
<div class="form-content">
<div class="input-password-wrapper">
	<div class="input password required">
		<label for="js_field_password" class="hidden">New master password</label>
		<input name="passbolt.model.User.password" type="password" id="js_field_password" placeholder="enter your password here">
		<input class="required hidden" maxlength="50" type="text" id="js_field_password_clear">
		<div class="security-token">CKR</div>
	</div>
	<ul class="actions inline">
		<li>
			<a href="#" id="js_secret_view" class="button toggle">
				<i class="fa fa-eye fa-fw fa-lg"></i>
				<span class="visuallyhidden">view</span>
			</a>
		</li>
		<li>
			<a href="#" id="js_secret_generate" class="button">
				<i class="fa fa-magic fa-fw fa-lg"></i>
				<span class="visuallyhidden">generate</span>
			</a>
		</li>
	</ul>

	<div id="js_user_pwd_strength" class="password-complexity">
		<span class="progress"><span class="progress-bar fair"></span></span>
		<span class="complexity-text">complexity: <strong>excellent</strong></span>
	</div>
</div>
</div>
</body>
</html>
