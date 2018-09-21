<div class="dialog-wrapper">
    <div class="dialog confirm delete-user-dialog">
        <div class="dialog-header">
            <h2>You cannot delete this user!</h2>
            <a class="dialog-close js-dialog-close" href="../demo/AD_users.php">
                <i class="fa fa-close"></i>
                <span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="js_dialog_content dialog-content">
            <div class="form-content intro">
                <p>
                    <strong>You are about to delete Ada Lovelace.</strong>
                </p>
                <p>
                    This user is the owner of passwords or groups.
                    You need to transfer the ownership to other users to continue.
                </p>
            </div>
            <div class="ownership-transfer scroll">
                <h3>Groups</h3>
                <ul class="ownership-transfer-items">
                    <li>
                        <div class="input select required">
                            <label for="Owner">IT-Support new manager:</label>
                            <select name="data[User][uuid]" id="OwnerId" class="fluid">
                                <option value="<UUID>" selected="selected">Ada Lovelace (ada@passbolt.com)</option>
                                <option value="<UUID>" >Betty Holberton (betty@passbolt.com)</option>
                                <option value="<UUID>" >Carol Shaw (carol@passbolt.com)</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div class="input select required">
                            <label for="Owner">HR new manager:</label>
                            <select name="data[User][uuid]" id="OwnerId" class="fluid">
                                <option value="<UUID>" selected="selected">Ada Lovelace (ada@passbolt.com)</option>
                                <option value="<UUID>" >Betty Holberton (betty@passbolt.com)</option>
                                <option value="<UUID>" >Carol Shaw (carol@passbolt.com)</option>
                            </select>
                        </div>
                    </li>
                </ul>
                <h3>Passwords</h3>
                <ul class="ownership-transfer-items">
                    <li>
                        <div class="input select required">
                            <label for="Owner">Apache (Password) new owner:</label>
                            <select name="data[User][uuid]" id="OwnerId" class="fluid">
                                <option value="<UUID>" selected="selected">Ada Lovelace (ada@passbolt.com)</option>
                                <option value="<UUID>" >Betty Holberton (betty@passbolt.com)</option>
                                <option value="<UUID>" >Carol Shaw (carol@passbolt.com)</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div class="input select required">
                            <label for="Owner">Bower (Password) new owner:</label>
                            <select name="data[User][uuid]" id="OwnerId" class="fluid">
                                <option value="<UUID>" selected="selected">Ada Lovelace (ada@passbolt.com)</option>
                                <option value="<UUID>" >Betty Holberton (betty@passbolt.com)</option>
                                <option value="<UUID>" >Carol Shaw (carol@passbolt.com)</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="submit-wrapper clearfix">
                <a class="button primary warning" href="../demo/AD_users.php">delete user</a>
                <a class="js-dialog-cancel cancel" href="../demo/AD_users.php">cancel</a>
            </div>
        </div>
    </div>
</div>
