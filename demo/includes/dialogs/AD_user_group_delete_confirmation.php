<div class="dialog-wrapper">
    <div class="dialog confirm delete-group-dialog">
        <div class="dialog-header">
            <h2>Are you sure?</h2>
            <a class="dialog-close js-dialog-close" href="demo/AD_users.php">
            <span class="svg-icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content">
                <p>
                    <strong>You are about to delete the group "IT Support"!</strong>
                </p>
                <p>
                    This group owns 5 passwords. Please select a group manager to replace as the owner.
                    Other users in this group will lose access to the passwords.
                </p>
                <div class="input select required">
                    <label for="Owner">New Owner</label>
                    <select name="data[User][uuid]" id="OwnerId" class="fluid">
                        <option value="<UUID>" selected="selected">Ada Lovelace (ada@passbolt.com)</option>
                        <option value="<UUID>" >Betty Holberton (betty@passbolt.com)</option>
                        <option value="<UUID>" >Carol Shaw (carol@passbolt.com)</option>
                    </select>
                </div>
            </div>

            <div class="submit-wrapper clearfix">
                <a class="button primary warning" href="demo/AD_users.php">Delete group</a>
                <a class="js-dialog-cancel cancel" href="demo/AD_users.php">Cancel</a>
            </div>
        </div>
    </div>
</div>