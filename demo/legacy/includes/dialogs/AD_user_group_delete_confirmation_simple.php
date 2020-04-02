<div class="dialog-wrapper">
    <div class="dialog confirm delete-group-dialog">
        <div class="dialog-header">
            <h2>Are you sure?</h2>
            <a class="dialog-close js-dialog-close" href="demo/legacy/AD_users.php">
            <?php include('includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content">
                <p>
                    <strong>You are about to delete the group "IT Support"!</strong>
                </p>
                <p>This group is not associated with any password. You are good to go!</p>
            </div>

            <div class="submit-wrapper clearfix">
                <a class="button primary warning" href="demo/legacy/AD_users.php">Delete group</a>
                <a class="js-dialog-cancel cancel" href="demo/legacy/AD_users.php">Cancel</a>
            </div>
        </div>
    </div>
</div>