<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt no-js no-passboltplugin alpha version guest" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | Healthcheck</title>
    <?php include('includes/meta/LU_meta.php'); ?>
</head>
<body>
<div id="container" class="page status">
    <!-- header -->
    <header>
        <div class="header first ">
            <nav>
                <div class="top navigation primary">
                    <ul>
                        <li class="left"><a href="/"><span>home</span></a></li>
                        <li class="right"><a href="/login"><span>login</span></a></li>
                        <li class="right"><a href="/register"><span>register</span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <!-- main -->
    <div class="grid grid-responsive-12">
        <div class="row">
            <div class="col8">
                <h2>Passbolt API Status (v1.0.9)</h2>
                <h3>Core configuration</h3>
                <div id="url-rewriting-warning" class="message error">
                    URL rewriting is not properly configured on your server.	<a target="_blank" href="http://book.cakephp.org/2.0/en/installation/url-rewriting.html">Learn more.</a>
                </div>
                <div class="message success">Your version of PHP is 5.2.8 or higher.</div><div class="message success">Your tmp directory is writable.</div><div class="message success">The <em>FileEngine</em> is being used for core caching. To change the config edit core.php</div><div class="message success">Your database configuration file is present.</div><div class="message success">Passbolt is able to connect to the database.</div><div class="message error">Debug mode is on.</div><h3>Application configuration</h3>
                <div class="message error">SSL is not enabled.</div><div class="message success">PHP GPG Module is on.</div><div class="message error">Do not use the default GPG key for the server.</div><div class="message error">Selenium API endpoints are active. This setting should be used for testing only.</div><div class="message warning">Registration is open to everyone.</div><div class="message success">There is at least one admin account.</div><div class="message success">Serving the compiled version of the javascript app.</div><h3>Development tools</h3>
                <div class="message success">Phpunit v3.7.38 is installed.</div><div class="message warning">DebugKit is not installed. It is useful if you are extending passbolt. <a href="https://github.com/cakephp/debug_kit/tree/2.2">Learn more.</a></div></div>
            <div class="col4 last" style="margin-top:2.8em;">
                <h3>What is this page?</h3>
                <p>
                    This page is available to help administrators diagnose if something is wrong
                    with a passbolt installation and help keeping it secure. If you want more information on how to install passbolt
                    please checkout our step by step guide.
                </p>
                <a href="https://www.passbolt.com/help/" target="_blank" class="button primary big">
                    <i class="fa fa-fw fa-life-saver"></i>
                    Help
                </a>
            </div>
        </div>
    </div></div>
<!-- footer -->
<footer>
    <div class="footer">
        <ul class="footer-links">
            <li><a href="https://www.passbolt.com/terms" alt="terms of service">Terms</a></li>
            <li><a href="https://www.passbolt.com/privacy">Privacy</a></li>
            <li><a href="https://www.passbolt.com/credits">Credits</a></li>
            <li id="version">
                <a href="https://www.passbolt.com/credits" class="tooltip-left"
                   data-tooltip="1.0.9">
                    <i class="fa fa-heart-o"></i>
                    <span class="visuallyhidden">About</span>
                </a>
            </li>
        </ul>
    </div>
</footer>
</body>
</html>
