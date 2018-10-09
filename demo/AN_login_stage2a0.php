<?php
/**
 * LOGIN: stage2 the user took too much time to enter the secret key password (wait)
 */
?>
<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js passboltplugin passboltplugin-config version alpha" lang="en">
<head>
    <title>Login | Passbolt</title>
    <?php include('includes/meta/AN_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="src/css/themes/default/api_login.css" />
<body>
<div id="container" class="login page">
    <?php include('includes/ALL_top_warning_messages.php'); ?>
    <?php include('includes/headers/AN_header_first.php'); ?>

    <!-- main -->
    <div class="grid">
        <div class="row js_main-login-section">
            <div class="col6 push1 information">
                <h2>Welcome back!</h2>
                <div class="plugin-check-wrapper">
                    <div class="plugin-check firefox success">
                        <p class="message">Nice one! Firefox plugin is installed and configured. You are good to go!.</p>
                    </div>
                </div>
                <div class="plugin-check-wrapper">
                    <div class="plugin-check gpg success">
                        <p class="message">Server identity is verified!
                            View the key: <a href="#">C7FF4211</a></p>
                    </div>
                </div>
            </div>
            <div class="col4 push1 last">
                <div class="logo">
                    <h1><a href="#"><span>Passbolt</span></a></h1>
                </div>
                <div class="users login form">
                    <div class="feedback">
                        <i class="fa huge fa-clock-o" ></i>
                        <p>The login session expired. You can try again in <span class="countdown">10</span> seconds. </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <?php include('includes/promoblocks/AN_promoblock_cloud.php'); ?>
            <?php include('includes/promoblocks/AN_promoblock_passboltpro.php'); ?>
            <?php include('includes/promoblocks/AN_promoblock_github.php'); ?>
        </div>
    </div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
