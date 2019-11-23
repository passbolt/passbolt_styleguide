<div class="move-folder-dialog">
    <div class="dialog-wrapper">
        <div class="dialog confirm">
            <div class="dialog-header">
                <h2>Permissions Options</h2>
                <a class="dialog-close js-dialog-close" href="demo/LU_passwords_folders.php">
                    <?php include('includes/svg-icons/close.php'); ?>
                    <span class="visuallyhidden">close</span>
                </a>
            </div>
            <div class="js_dialog_content dialog-content">
                <div class="form-content">
                    <p>
                        Please select the permissions to apply:
                    </p>
                    <div class="permission-inherit">
                        <input type="radio" id="parent-permissions" name="permission" value="Apply parent folder permissions" checked>
                        <label for="parent-permissions">
                            <div class="permission-content">
                                <span><img src="src/img/folders/parent.png"></span>
                                <div class="content">Apply permissions from parent</div>
                                <div class="content-info">
                                    <span>The permissions will be applied from the target folder.</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="permission-inherit">
                        <input type="radio" id="child-permissions" name="permission" value="Keep children permissions as it is">
                        <label for="child-permissions">
                            <div class="permission-content">
                                <span><img src="src/img/folders/folder.png"></span>
                                <div class="content">Do not change permissions</div>
                                <div class="content-info">
                                    <span>Keep the permissions as they are.</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="permission-inherit">
                        <input id="manual-permissions" type="radio" name="permission" value="Choose permissions manually">
                        <label for="manual-permissions">
                            <div class="permission-content">
                                <span><img src="src/img/folders/manual.png"></span>
                                <div class="content">Choose permissions manually</div>
                                <div class="content-info">
                                    <span>Choose the permissions you want to apply to this folder.</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input type="submit" value="Continue" class="button primary" id="master-password-submit">
                    <a class="js-dialog-cancel cancel" href="demo/LU_passwords_folders.php">Cancel</a>
                </div>
            </div>
        </div>
    </div>
</div>