<div class="dialog-wrapper">
    <div class="dialog confirm delete-user-dialog">
        <div class="dialog-header">
            <h2>You cannot delete this user!</h2>
            <a class="dialog-close js-dialog-close" href="demo/AD_users.php">
            <span class="fa icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>
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
                <a class="button primary warning" href="demo/AD_users.php">delete user</a>
                <a class="js-dialog-cancel cancel" href="demo/AD_users.php">Cancel</a>
            </div>
        </div>
    </div>
</div>
