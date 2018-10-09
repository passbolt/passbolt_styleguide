<?php include('_includes/bootstrap.php'); ?><!doctype html>
<?php if (!isset($base)) $base = '../../'; ?>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
    <title>Login</title>
    <?php include('../includes/meta/AN_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="src/css/themes/anew/api_login.css" />
</head>
<body>
<div id="container" class="container page login v240918">
    <div class="content">
        <div class="header">
            <div class="logo"><span class="visually-hidden">Passbolt</span></div>
        </div>
        <div class="infinite loading-bar ">
            <svg role="img" aria-label="Loading please wait..." width="452px" height="7px" viewBox="0 0 452 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Login" transform="translate(-374.000000, -251.000000)" fill-rule="nonzero">
                        <g id="Group-6" transform="translate(374.000000, 170.000000)">
                            <g id="svg-loading-bar" transform="translate(226.000000, 84.500000) scale(1, -1) translate(-226.000000, -84.500000) translate(0.000000, 81.000000)">
                                <path d="M3,0 L449,0 C450.656854,-3.04359188e-16 452,1.34314575 452,3 L452,7 L0,7 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z" id="Background" fill="#D40000" transform="translate(226.000000, 3.500000) scale(1, -1) translate(-226.000000, -3.500000) "></path>
                                <path d="M7.5,3.5 L444.5,3.5" id="svg-loading-bar-line1" stroke="#D40000" stroke-width="7" stroke-linecap="square"></path>
                                <path d="M7.5,3.5 L444.5,3.5" id="svg-loading-bar-line2" stroke="#D40000" stroke-width="7" stroke-linecap="square"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div class="login-form ">
            <h1>Welcome, let's get started</h1>
            <form>
                <div class="input text required error">
                    <label for="UserUsername">One Type password</label>
                    <input name="data[User][passphrase]" class="required fluid" maxlength="50" id="UserUsername" required="required" value="" type="password">
                    <div class="error-message">This is not a valid passphrase.</div>
                </div>
                <div class="input checkbox">
                    <input name="remember-me" id="rememberMe" type="checkbox">
                    <label for="rememberMe">Do not ask again on this device.</label>
                </div>
                <div class="form-actions">
                    <button type="submit" class="button primary big processing" role="button">login</button>
                </div>
            </form>
        </div>
        <div class="login-form-footer">
            <a href="#privacy">privacy policy</a>
            <span class="separator"></span>
            <a href="#tos">credits</a>
        </div>
    </div>
    <footer class="footer">
        <div class="ad">
            <a href="#pro" role="button" target="_blank" rel="noopener noreferrer" class="button primary">PRO</a>
            <a href="#pro" target="_blank" rel="noopener noreferrer">
                Support passbolt by switching to passbolt pro edition!</a>
        </div>
        <div class="version">
            <a href="https://help.passbolt.com/releases/" class="tooltip-left no-border" data-tooltip="2.3.0 / 2.2.1">
                <svg class="icon fa fas fas-heartbeat" role="img" aria-label="heartbeat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"/>
                </svg>
                <span class="visually-hidden">Versions: 2.3.0 / 2.2.1</span>
            </a>
        </div>
    </footer>
</div>
</body>
</html>