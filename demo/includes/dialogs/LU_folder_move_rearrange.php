<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
  <?php include('includes/meta/LU_meta.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Attention!</h2>
			<a class="dialog-close js-dialog-close" href="demo/LU_passwords_folders.php">
			<span class="svg-icon">
          <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
      </span>
			<span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<div class="form-content">
				<p>
          The currently viewing folder has been re-organized by one of the owners. Reload to see the current view.
				</p>
			</div>
			<div class="submit-wrapper clearfix">
				<input type="submit" value="OK" class="button primary" id="master-password-submit">
			</div>
		</div>
	</div>
</div>
</body>
</html>