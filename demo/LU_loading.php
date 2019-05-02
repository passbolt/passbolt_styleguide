<?php
/**  Loading screen */
?>
<?php include('_includes/bootstrap.php'); ?>
<!doctype html>
<html class="passbolt no-js version launching no-passboltplugin" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt - The simple password management system</title>
    <!--
             ____                  __          ____
            / __ \____  _____ ____/ /_  ____  / / /_
           / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
          / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
         /_/    \__,_/____/____/_.___/\____/_/\__/

         The password management solution
         (c) 2019 Passbolt SA

     -->
    <?php if (!isset($base)) { $base = '../'; } ?>
    <base href="<?= $base; ?>">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="src/css/themes/<?= $theme; ?>/api_main.css">
    <link rel="stylesheet" type="text/css" href="src/css/themes/default/ext_external.css" />
</head>
<body>
<!-- main -->
<div id="container" class="page ">
    <div class="launching-screen">
        <div class="launching-screen-holder">
            <div class="logo no-img">
                <h1><span>Passbolt</span></h1>
            </div>
            <div class="progress-bar-wrapper">
                <span class="progress-bar big infinite"><span class="progress "></span></span>
            </div>
            <p class="details">loading, please wait...</p>
        </div>
    </div>
    <div id="js_app_controller"></div>
</div>
<footer>
    <div class="footer">
        <ul class="footer-links">
            <li class="error message"><a href="https://help.passbolt.com/faq/hosting/why-unsafe" title="terms of service">Unsafe mode</a></li>
            <li><a href="https://www.passbolt.com/terms" title="terms of service">Terms</a></li>
            <li><a href="https://www.passbolt.com/credits">Credits</a></li>
            <li id="version">
                <a href="https://www.passbolt.com/credits" class="tooltip-left" data-tooltip="2.0.7">
                    <i class="fa fa-heart-o"></i>
                    <span class="visuallyhidden">Versions</span>
                </a>
            </li>
        </ul>
    </div>
</footer>
<!--<script src="https://www.passbolt.test/js/app/steal.production.js?v=2.0.7"></script></body>-->
</html>
