<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../'; ?>
<!doctype html>
<html lang="en">
<head>
    <?php include('../includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page iframe mfa">
    <div class="grid grid-responsive-12">
        <div class="row">
            <div class="col12 last">
                <h3>Time Based One time password (TOTP)</h3>
            </div>
        </div>
        <div class="row">
            <div class="col7 how-it-works">
                <h4>How does it work?</h4>
                <img src="src/img/diagrams/totp.svg" alt="diagram showing how it works"/>
                <p>You sign in to passbolt just like you normally do.</p>
                <p>When using a new browser, you need an additional code from your phone.</p>
                <p>Once you enter this code, you can log in.</p>
            </div>
            <div class="col4 last">
                <h4>Requirements</h4>
                <div class="message notice">
                    <p>
                        To proceed you need to install an application that supports
                        Time Based One Time Passwords (TOTP) on your phone or
                        tablet such as
                        <a href="#" target="_blank" rel="noopener">Google Authenticator</a> or
                        <a href="#" target="_blank" rel="noopener">FreeOTP</a>.
                    </p>
                    <a class="button">learn more</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col7">
                <div class="actions-wrapper">
                    <a class="button cancel" href="demo/iframes/LU_iframe_mfa_select.php">cancel</a>
                    <a class="button primary" href="demo/iframes/LU_iframe_totp_setup_get.php">Let's get started!</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>