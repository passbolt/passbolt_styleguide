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
<div class="dialog-wrapper">
	<div class="dialog master-password">
		<div class="dialog-header">
			<h2>Please enter your master password</h2>
			<a class="dialog-close js-dialog-close" href="#">
				<i class="icon close no-text"></i>
				<span>close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">

			<div class="form-content">

				<div class="input text required">
					<label for="js_master_password">You need your master password to continue.</label>
					<input type="password" placeholder="password" id="js_master_password" maxlength="50">
					<div class="security-token">CKR</div>
				</div>

				<div class="input checkbox">
					<input type="checkbox" id="js_remember_master_password">
					<label for="js_remember_master_password">Remember it for 5 minutes</label>
				</div>

			</div>

			<div class="submit-wrapper clearfix">
				<input type="submit" value="OK" class="button primary" id="master-password-submit">
				<a class="js-dialog-close cancel" href="#">cancel</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>