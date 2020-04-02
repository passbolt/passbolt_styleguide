<div class="dialog-wrapper">
    <div class="dialog confirm">
        <div class="dialog-header">
            <h2>Are you sure?</h2>
            <a class="dialog-close js-dialog-close" href="demo/legacy/LU_folders.php" target="_parent">
                <?php include('../includes/svg-icons/close.php'); ?>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content">
                <p>
                    You're about to delete the folder <strong>Plants</strong>.
                    Other users may loose access. This action cannot be undone.
                </p>
                <div class="input checkbox">
                    <input id="permissions-for-folders"type="checkbox">
                    <label for="permissions-for-folders">Also delete items inside this folder</label>
                </div>
            </div>
            <div class="submit-wrapper clearfix">
                <a class="button primary warning" role="button" href="demo/legacy/LU_folders.php" target="_parent">Delete</a>
                <a class="js-dialog-close cancel" href="demo/legacy/LU_folders.php" target="_parent">Cancel</a>
            </div>
        </div>
    </div>
</div>