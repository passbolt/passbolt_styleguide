<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="no-js no-passboltplugin version alpha" lang="en">
<head>
    <title>Login</title>
    <?php include('includes/meta/AN_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="src/css/themes/anew/api_login.css" />
    <script>
        document.documentElement.classList.add('js');
        document.documentElement.classList.remove('no-js');
    </script>
</head>
<body>
<div class="no-js visuallyhidden overlay">
    <div class="message error">
        <span>
            <svg class="icon fa fas fas-exclamation-triangle" role="img" aria-label="warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
            </svg>
        </span>
        <span>
            Sorry, passbolt needs javascript to work. Please enable javascript and refresh this page.
        </span>
    </div>
</div>
<div id="container" class="container page login v240918">
    <div class="content">
        <div class="header">
            <div class="logo"><span class="visually-hidden">Passbolt</span></div>
        </div>
        <div class="infinite loading-bar animated">
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
                <div class="input text required">
                    <label for="UserUsername">Username</label>
                    <input name="data[User][username]" class="required fluid" maxlength="50" id="UserUsername" required value="ada@passbolt.com" type="text" disabled>
                </div>
                <div class="input text required error">
                    <label for="UserUsername">Username</label>
                    <input name="data[User][passphrase]" class="required fluid" maxlength="50" id="UserUsername" required="required" value="" type="password">
                    <div class="error message">This is not a valid passphrase.</div>
                </div>
                <div class="input checkbox error">
                    <input name="remember-me" id="rememberMe" type="checkbox">
                    <label for="rememberMe">Remember passphrase until I log out</label>
                    <div class="error message">Please agree.</div>
                </div>
                <div class="form-actions">
                    <input type="button" class="button primary big" role="button" value="login"/>
                    <a href="#new">already have an account?</a>
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