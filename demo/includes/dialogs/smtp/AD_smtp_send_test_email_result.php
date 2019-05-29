<div class="dialog-wrapper ready">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Send test email</h2>
            <a href="demo/AD_admin_smtp_configuration.php" class="dialog-close">
                <i class="fa fa-close"></i><span class="visuallyhidden">close</span>
            </a>
        </div>
        <div class="dialog-content">
            <div class="form-content">
                <p><strong>The email could not be sent.</strong></p>
                <p class="inline-error">ERROR MESSAGE returned by the server, such as : A connection could not be established with the SMTP server.</p>
                <div class="error-trace">
                    <p><a>See debug trace</a></p>
                    <div class="message error hidden">
                        <pre>index.min.js:4563 PassboltApiFetchError: Failed to fetch
    at Function.ResourceService.findAll (chrome-extension://plcnjfjccnfooibklhmgbbhhcglljclp/index.min.js:12694:11)
(anonymous) @ index.min.js:4563
async function (async)
(anonymous) @ index.min.js:4560
(anonymous) @ index.min.js:11898</pre>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-wrapper clearfix">
            <a class="button primary" href="demo/AD_admin_smtp_configuration.php">Ok</a>
        </div>
    </div>
</div>
<script type="application/javascript">
    $('.dialog-content .error-trace a').click(() => {
        console.log('clic');
        console.log($('.dialog-content .error-trace .hidden').length);
        $('.dialog-content .error-trace .message').removeClass('hidden');
    });
</script>