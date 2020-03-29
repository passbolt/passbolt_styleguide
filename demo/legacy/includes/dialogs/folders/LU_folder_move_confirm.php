<div class="dialog-wrapper">
	<div class="dialog confirm">
		<div class="dialog-header">
			<h2>Are you sure?</h2>
			<a class="dialog-close js-dialog-close" href="demo/legacy/LU_passwords_folders.php">
                <?php include('../includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">close</span>
			</a>
		</div>
		<div class="js_dialog_content dialog-content">
			<div class="form-content">
				<p>
                  You are about to move the <strong>Plants</strong> folder inside the <strong>Books</strong> folder.
                   This action will affect the permissions. This action cannot be undone.
                </p>
			</div>
			<div class="submit-wrapper clearfix">
<!--                <a class="secondary" href="demo/legacy/LU_folders_move_manage_permission.php">More Options</a>-->
                <input type="submit" value="Move" class="button primary">
				<a class="js-dialog-close cancel" href="demo/legacy/LU_folders_move.php">Cancel</a>
			</div>
		</div>
	</div>
</div>