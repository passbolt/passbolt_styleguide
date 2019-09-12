<div class="dialog-wrapper ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Send test email</h2>
            <a href="demo/AD_admin_smtp_configuration.php" class="dialog-close">
            <span class="svg-icon">
                    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
                </span>    
            <span class="visuallyhidden">close</span>
            </a>

        </div>
        <div class="dialog-content">
            <div class="form-content">
                <p><strong>Test your configuration by sending a test email.</strong></p>
                <form class="ready">
                    <div class="input text required">
                        <label for="js_email">Email</label>
                        <input class="required form-element ready" maxlength="64" id="js_email" placeholder="email" type="text">
                        <div class="message ready"></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="submit-wrapper clearfix">
            <a class="button primary" href="demo/AD_admin_smtp_configuration_send_test_email.php?result=1">Send</a>
            <a class="cancel" href="demo/AD_admin_smtp_configuration.php">Cancel</a>
        </div>
    </div>
</div>