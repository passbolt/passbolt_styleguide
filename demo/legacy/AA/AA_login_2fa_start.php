<?php include('_includes/bootstrap.php'); ?><!doctype html>
<?php if (!isset($base)) $base = '../../../'; ?>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
    <title>Login</title>
    <?php include('../includes/meta/AN_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="src/css/themes/default/api_login.css" />
</head>
<body>
<div id="container" class="container page login v240918">
    <div class="content">
        <div class="header">
            <div class="logo"><span class="visually-hidden">Passbolt</span></div>
        </div>
        <div class="login-form ">
            <h1>
                Enter the six digit number as presented on your phone or tablet.    </h1>
                <form method="post" accept-charset="utf-8" class="totp-setup" action="https://my.passbolt.io/mfa/verify/totp">
                    <div style="display:none;"><input type="hidden" name="_method" value="POST"/>
                        <input type="hidden" name="_csrfToken" autocomplete="off" value="6961335d9a590a4cd51d3335eee5390cee9a3cfd90ea246fff57fa88938a6ef151b03f02636f2ed1d4650a24013ba62a0589922f2728d53be705654b9d4e141e"/>
                    </div>
                    <div class="input text required">
                        <label for="totp">One Time Password (OTP)</label>
                        <input type="text" name="totp" placeholder="123456" required="required" id="totp"/>
                    </div>
                    <div class="input checkbox">
                    <input type="checkbox" name="remember" value="remember" id="remember">
                    <label for="remember" >Remember this device for a month.</label>
                </div>
                <div class="form-actions">
                    <button type="submit" class="button primary big" role="button">verify</button>
                    <a href="https://my.passbolt.io/mfa/verify/yubikey">
                        Or try with another provider    </a>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
</body>
</html>