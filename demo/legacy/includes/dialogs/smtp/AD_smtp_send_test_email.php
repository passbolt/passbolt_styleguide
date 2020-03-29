<div class="dialog-wrapper ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Send test email</h2>
            <a href="demo/legacy/AD_admin_smtp_configuration.php" class="dialog-close" role="button">
            <?php include('includes/svg-icons/close.php'); ?>    
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
            <a class="button primary" href="demo/legacy/AD_admin_smtp_configuration_send_test_email.php?result=1">Send</a>
            <a class="cancel" href="demo/legacy/AD_admin_smtp_configuration.php">Cancel</a>
        </div>
    </div>
</div>