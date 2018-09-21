<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
    <?php include('includes/meta/LU_security_token_style.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog master-password">
		<div class="dialog-header">
			<h2>Please enter your passphrase</h2>
			<a class="dialog-close js-dialog-close" href="#">
				<i class="fa fa-close"></i>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">

			<div class="form-content">

				<div class="input text required">
					<label for="js_master_password">You need your passphrase to continue.</label>
                    <!-- The field below is invisible and used to receive the first focus after the iframe is loaded -->
                    <!-- This way we can control and treat the events received next -->
                    <input type="text" id="js_master_password_focus_first" class="focus_first">
					<input type="password" placeholder="password" id="js_master_password" maxlength="50">
					<div class="security-token">CKR</div>
				</div>

				<div class="input checkbox">
					<input type="checkbox" id="js_remember_master_password">
					<label for="js_remember_master_password">Remember it for </label>
				</div>
				<div class="input select">
					<select id="js_remember_master_password_duration">
						<option value="900">15 minutes</option>
						<option value="1800">30 minutes</option>
						<option value="3600">1 hour</option>
						<option value="-1">until I log out</option>
					</select>
				</div>

			</div>

			<div class="submit-wrapper clearfix">
				<a class="button primary" id="master-password-submit">OK</a>
				<a class="js-dialog-close cancel" href="#">cancel</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>