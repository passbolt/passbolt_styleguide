<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../../'; ?>
<!doctype html>
<html lang="en">
<head>
    <?php include('../includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page iframe mfa setup">
    <div class="grid grid-responsive-12">
        <div class="row">
            <div class="col12">
                <h3>Multi-factor authentication</h3>
            </div>
        </div>
        <div class="row">
            <div class="col7">
                <h4>Please select a provider</h4>
                <ul class="mfa-providers">
                    <li>
                        <a href="demo/legacy/iframes/LU_iframe_totp_setup_start.php" class="google-authenticator">
                            <img src="src/img/third_party/google-authenticator.svg" />
                            <span>Google Authenticator</span>
                        </a>
                        <div class="mfa-provider-status enabled">
                            Enabled
                        </div>
                    </li>
                    <li>
                        <a role="button" class="duo">
                            <img src="src/img/third_party/duo.svg" />
                            <span>Duo MFA</span>
                        </a>
                        <div class="mfa-provider-status disabled">
                            Disabled
                        </div>
                    </li>
                    <li class="coming-soon">
                        <a role="button" class="duo">
                            <img src="src/img/third_party/yubikey.svg" />
                            <span>Yubikey</span>
                        </a>
                        <div class="mfa-provider-status disabled">
                            Disabled
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col4 last">
                <h4>What is Multi-factor authentication?</h4>
                <div class="message notice">
                    <p>
                        Multi-factor authentication (MFA) is a method of confirming a user's
                        identity that requires presenting two or more pieces of evidence (or factor).
                    </p>
                    <a class="button">Learn more</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>