<div class="dialog-wrapper">
    <div class="dialog confirm delete-user-dialog">
        <div class="dialog-header">
            <h2>Delete user?</h2>
            <a class="dialog-close js-dialog-close" href="demo/AD_users.php">
            <?php include('includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content">
                <p>
                    Are you sure you want to delete <strong>Ada Lovelace (adalovelace@xyz.com)</strong>?
                </p>
                <p>
                    Warning: This action can't be undone. All the data associated with this user will be permanently deleted.
                </p>
            </div>

            <div class="submit-wrapper clearfix">
                <a class="button primary warning" href="demo/AD_users.php">Delete</a>
                <a class="js-dialog-cancel cancel" href="demo/AD_users.php">Cancel</a>
            </div>
        </div>
    </div>
</div>
