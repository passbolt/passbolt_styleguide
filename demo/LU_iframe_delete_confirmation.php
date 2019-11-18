<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
	<?php include('includes/meta/LU_meta_iframe.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Delete password?</h2>
			<a class="dialog-close js-dialog-close" href="#">
			<span class="svg-icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
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
				<input type="submit" value="Delete" class="button primary warning" id="master-password-submit">
				<a class="js-dialog-close cancel" href="#">Cancel</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>
