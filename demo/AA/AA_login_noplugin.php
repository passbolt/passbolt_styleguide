<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
    <title>Login</title>
    <?php include('includes/meta/AN_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="../../src/css/themes/anew/api_login.css" />
</head>
<body>
<div id="container" class="container page login v240918">
    <div class="content">
        <div class="header">
            <div class="logo"><h1 class="visually-hidden">Passbolt</h1></div>
        </div>
        <div class="loading-bar">
            <svg width="452px" height="6px" viewBox="0 0 452 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Login" transform="translate(-374.000000, -252.000000)" fill-rule="nonzero">
                        <g id="Group-6" transform="translate(374.000000, 170.000000)">
                            <g id="Loading-bar" transform="translate(226.000000, 85.000000) scale(1, -1) translate(-226.000000, -85.000000) translate(0.000000, 82.000000)">
                                <path id="Rectangle4" d="M3,0 L449,0 C450.656854,-3.04359188e-16 452,1.34314575 452,3 L452,6 L0,6 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z" fill="#D40000" transform="translate(226.000000, 3.000000) scale(1, -1) translate(-226.000000, -3.000000) "></path>
                                <rect id="Rectangle5" fill="#DE8888" transform="translate(255.500000, 3.000000) scale(1, -1) translate(-255.500000, -3.000000) " x="151" y="0" width="209" height="6"></rect>
                                <rect id="Rectangle6" fill="#A72D2D" transform="translate(56.500000, 3.000000) scale(1, -1) translate(-56.500000, -3.000000) " x="13" y="0" width="87" height="6"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <span class="visually-hidden accessibility-status">Loading please wait...</span>
        </div>
        <div class="login-form">
            <h2>Welcome, let's get started</h2>
            <form>
                <div class="input text required">
                    <label for="UserUsername">Username</label>
                    <input name="data[User][username]" class="required fluid" maxlength="50" id="UserUsername" required value="ada@passbolt.com" type="text" disabled>
                </div>
                <div class="input text required">
                    <label for="UserUsername">Username</label>
                    <input name="data[User][passphrase]" class="required fluid" maxlength="50" id="UserUsername" required="required" value="" type="text">
                </div>
                <div class="input checkbox">
                    <input name="remember-me" id="rememberMe" type="checkbox">
                    <label for="rememberMe">Remember passphrase until I log out</label>
                </div>
                <div class="form-actions">
                    <a class="button primary big" role="button">login</a>
                    <a class="" href="#">already have an account?</a>
                </div>
            </form>
        </div>
    </div>
    <footer class="footer">
        <div class="ad">
            <a href="#" role="button" target="_blank" rel="noopener noreferrer" class="button primary">PRO</a>
            <a href="#" role="button" target="_blank" rel="noopener noreferrer">
                Support passbolt by switching to passbolt pro edition!</a>
        </div>
        <div class="version">
            <a href="https://help.passbolt.com/releases/" class="tooltip-left no-border" data-tooltip="2.3.0 / 2.2.1">
                <svg class="icon" aria-role="image" alt="heartbeat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"/>
                </svg>
                <span class="visually-hidden">Versions: 2.3.0 / 2.2.1</span>
            </a>
        </div>
    </footer>
</div>
</body>
</html>