<div class="dialog-wrapper">
    <div class="dialog passphrase-entry">
        <div class="dialog-header"><h2>Please enter your passphrase</h2>
            <a class="dialog-close">
                <?php include('../includes/svg-icons/close.php'); ?>
                <span class="visually-hidden">cancel</span>
            </a>
        </div>
        <div class="dialog-content">
            <form>
                <div class="form-content">
                    <div class="input text required">
                        <label for="passphrase-entry-form-passphrase">You need your passphrase to continue.</label><input id="passphrase-entry-form-passphrase" type="password" name="passphrase" placeholder="Passphrase" required="" class="required " style="" value="">
                        <div class="security-token" style="background: rgb(64, 28, 131) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">z4n</div>
                    </div>
                    <div>
                        <div class="input checkbox">
                            <input id="passphrase-entry-form-remember-me" type="checkbox" name="rememberMe"><label for="passphrase-entry-form-remember-me">Remember it for </label>
                        </div>
                        <div class="input select"><select name="rememberMeDuration">
                                <option value="300">5 minutes</option>
                                <option value="900">15 minutes</option>
                                <option value="1800">30 minutes</option>
                                <option value="3600">1 hour</option>
                                <option value="-1">until I log out</option>
                            </select></div>
                    </div>
                </div>
                <div class="submit-wrapper clearfix">
                    <input type="submit" class="button primary" role="button" value="OK"><a class="cancel">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>