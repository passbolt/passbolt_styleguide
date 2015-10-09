<?php
/**
 * LOGIN: the user failed to provide the right secret key password
 */
?>
<!doctype html>
<html class="no-js passboltplugin passboltplugin-config version alpha" lang="en">
<head>
    <title>Login | Passbolt</title>
    <?php include('includes/ALL_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="css/login.css" />
<body>
<div id="container" class="login page">
    <?php include('includes/ALL_top_warning_messages.php'); ?>
    <?php include('includes/AN_header_first.php'); ?>

    <!-- main -->
    <div class="grid">
        <div class="row">
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
                    <iframe id="passbolt-iframe-login-form" src="../demo/AN_iframe_login_error.php" frameborder="0"></iframe>
                </div>
            </div>
        </div>
        <div class="row">
            <?php include('includes/AN_promoblock_github.php'); ?>
            <?php include('includes/AN_promoblock_chromeplugin.php'); ?>
            <?php include('includes/AN_promoblock_donate.php'); ?>
        </div>holidays specia
    </div>
</div>
<?php include('includes/AN_footer.php'); ?>
</body>
</html>
