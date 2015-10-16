<!doctype html>
<html>
<head>
	<?php include('includes/LU_meta_iframe.php'); ?>
</head>
<body>
<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Do you really want to delete password ?</h2>
			<a class="dialog-close js-dialog-close" href="#">
				<i class="icon close no-text"></i>
				<span>close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<div class="form-content">
				<p>
					Please confirm you really want to delete the password. Ater clicking ok, the password will be <strong>deleted permanently</strong>.
				</p>
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