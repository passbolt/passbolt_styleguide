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
			<a href="#" id="js_show_pwd_button" class="button toggle mad_controller_component_button_controller mad_view_view js_component ready">
				<i class="icon eye big no-text"></i>
				<span>view</span>
			</a>
		</li>
		<li>
			<a href="#" id="js_gen_pwd_button" class="button mad_controller_component_button_controller mad_view_view js_component ready tooltip-right always-show large"
				 data-tooltip="generate a random password">
				<i class="icon key big no-text"></i>
				<span>generate</span>
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