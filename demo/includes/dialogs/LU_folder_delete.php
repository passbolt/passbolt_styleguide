<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html>
<head>
  <?php include('includes/meta/LU_meta.php'); ?>
</head>
<body class="iframe">
<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Delete a folder?</h2>
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
        <!-- Are you sure you want to delete the folder <strong>Plants</strong>? -->
        You're about to delete the folder <strong>Plants</strong>.
				</p>
				<p>
          Warning: This folder is shared with other people. If you delete this folder, it will no longer be shared.
          <!-- Warning: This action can't be undone. It will permanently delete all the data associated with this folder and the data that you have shared. -->
        <!-- Warning: This action can't be undone. All the data associated with this folder will be deleted permanently. -->
        <!-- Warning: This action can't be undone. All the data that you have shared will be deleted permanently from the folder. -->
        </p>
        <p>
          <div class="input checkbox">
            <input id="permissions-for-folders"type="checkbox">
            <label for="permissions-for-folders">Delete all items in this folder</label>
          </div>
        </p>
      </div>
			<div class="submit-wrapper clearfix">
				<input type="submit" value="Delete" class="button primary warning" id="master-password-submit">
				<a class="js-dialog-close cancel" href="demo/LU_passwords_folders.php">Cancel</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>