<div class="container page quickaccess">
    <?php include('components/quickaccess_header.php'); ?>
    <div class="login-form">
        <div class="input text required">
            <label for="UserUsername">Username</label>
            <input name="data[User][username]" class="required" maxlength="50" type="text" id="UserUsername" required="required" value="ada@passbolt.com" disabled="disabled">
        </div>
        <div class="input text passphrase required error">
            <label for="passphrase">Passphrase</label>
            <input type="password" placeholder="passphrase" id="passphrase">
            <span class="security-token">RRR</span>
            <div class="error-message">This is not a valid passphrase.</div>
        </div>
        <div class="input checkbox small">
            <input type="checkbox" name="remember-me" id="remember-me">
            <label for="remember-me">Remember until I log out.</label>
        </div>
        <div class="submit-wrapper">
            <a id="login-submit" href="#" class="button primary big full-width" role="button">login</a>
        </div>
    </div>
</div>