<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_legacy.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Delete password?</h2>
			<a class="dialog-close js-dialog-close" href="#">
			<?php include('includes/svg-icons/close.php'); ?>
				<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<div class="form-content">
				<p>
				Are you sure you want to delete the selected password <strong>monsoonIsComing...</strong>?
				</p>
				<p>
				Warning: Once the password is deleted, it’ll be removed permanently and will not be recoverable.
				</p>
			</div>

			<div class="submit-wrapper clearfix">
				<input type="submit" value="Delete" class="button primary warning">
				<a class="js-dialog-close cancel" href="#">Cancel</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>
