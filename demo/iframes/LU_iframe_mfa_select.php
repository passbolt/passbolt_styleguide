<?php include('../_includes/bootstrap.php'); ?>
<?php $base = '../../'; ?>
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
                <h3>Multi factor authentication</h3>
            </div>
        </div>
        <div class="row">
            <div class="col7">
                <h4>Please select a provider</h4>
                <ul class="mfa-providers">
                    <li>
                        <a href="demo/iframes/LU_iframe_totp_setup_start.php" class="google-authenticator">
                            <img src="src/img/third_party/google-authenticator.svg" />
                            <span>Google Authenticator</span>
                        </a>
                        <div class="input toggle-switch">
                            <label for="create_users">Enabled</label>
                            <input class="toggle-switch-checkbox checkbox" id="create_users" type="checkbox" checked="checked" disabled="disabled">
                            <label class="toggle-switch-button" for="create_users"></label>
                        </div>
                    </li>
                    <li>
                        <a role="button" class="duo ">
                            <img src="src/img/third_party/duo.svg" />
                            <span>Duo MFA</span>
                        </a>
                        <div class="input toggle-switch">
                            <label for="create_users">Disabled</label>
                            <input class="toggle-switch-checkbox checkbox" id="create_users" type="checkbox" disabled="disabled">
                            <label class="toggle-switch-button" for="create_users"></label>
                        </div>
                    </li>
                    <li class="coming-soon">
                        <a role="button" class="duo">
                            <img src="src/img/third_party/yubikey.svg" />
                            <span>Yubikey</span>
                        </a>
                        <div class="input toggle-switch">
                            <label for="create_users">Coming soon</label>
                            <input class="toggle-switch-checkbox checkbox" id="create_users" type="checkbox" disabled="disabled">
                            <label class="toggle-switch-button" for="create_users"></label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col4 last">
                <h4>What is multi-factor authentication?</h4>
                <div class="message notice">
                    <p>
                        Multi-factor authentication (MFA) is a method of confirming a user's
                        identity that requires presenting two or more pieces of evidence (or factor).
                    </p>
                    <a class="button">learn more</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>