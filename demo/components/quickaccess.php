<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt ce edition js websqldatabase draganddrop cssscrollbar" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt - Quick Access</title>
    <?php if (!isset($base)) { $base = '../../'; } ?>
    <base href="<?= $base; ?>">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="src/img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="src/css/themes/anew/ext_quickaccess.css">
    <style>
        .container-wrapper {
            box-sizing: border-box;
            width:26rem;
            margin-top:5em;
            box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
            float:left;
            margin-left:5em;
        }
    </style>
</head>
<body>
<div class="container-wrapper do-not-use">
    <div class="container page quickaccess">
        <?php include('../includes/quickaccess/quickaccess_header.php'); ?>
        <div class="login-form">
            <div class="input text required">
                <label for="UserUsername">Username</label>
                <input name="data[User][username]" class="required fluid" maxlength="50" type="text" id="UserUsername" required="required" value="ada@passbolt.com" disabled="disabled">
            </div>
            <div class="input text passphrase required">
                <label for="passphrase">Passphrase</label>
                <input type="password" placeholder="passphrase" id="passphrase">
                <span class="security-token">RRR</span>
            </div>
            <div class="input checkbox small">
                <input type="checkbox" name="remember-me" id="rememberMe">
                <label for="rememberMe">Remember until I log out</label>
            </div>
            <div class="submit-wrapper">
                <a id="loginSubmit" href="#" class="button primary big full-width" role="button">login</a>
            </div>
        </div>
    </div>
</div>
<div class="container-wrapper do-not-use">
    <div class="container page quickaccess">
        <?php include('../includes/quickaccess/quickaccess_header.php'); ?>
        <div class="login-form">
            <div class="input text required">
                <label for="UserUsername">Username</label>
                <input name="data[User][username]" class="required" maxlength="50" type="text" id="UserUsername" required="required" value="ada@passbolt.com" disabled="disabled">
            </div>
            <div class="input text passphrase required error">
                <label for="passphrase">Passphrase</label>
                <input type="password" placeholder="passphrase" id="passphrase">
                <span class="security-token">RRR</span>
                <div class="error-message">This is not a valid passphrase</div>
            </div>
            <div class="input checkbox small">
                <input type="checkbox" name="remember-me" id="remember-me">
                <label for="rememberMe">Remember until I log out</label>
            </div>
            <div class="submit-wrapper">
                <a id="login-submit" href="#" class="button primary big full-width" role="button">login</a>
            </div>
        </div>
    </div>
</div>
<div class="container-wrapper do-not-use">
    <div class="container page quickaccess">
        <?php include('../includes/quickaccess/quickaccess_header.php'); ?>
        <div class="index-list">
            <div class="search">
                <div class="input text required">
                    <input name="search" maxlength="50" type="text" id="UserUsername" required="required" placeholder="search">
                    <a id="search-submit" href="#" class="search-submit button" role="button">
                        <span class="visually-hidden">search</span>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="magnifying glass icon"><path id="search-icon" d="M15.781 13.844a.723.723 0 0 1 .219.531.723.723 0 0 1-.219.531l-.875.875a.723.723 0 0 1-.531.219.723.723 0 0 1-.531-.219l-3.125-3.125a.723.723 0 0 1-.219-.531v-.5C9.333 12.542 8 13 6.5 13a6.313 6.313 0 0 1-3.266-.875 6.567 6.567 0 0 1-2.359-2.36A6.313 6.313 0 0 1 0 6.5c0-1.187.292-2.276.875-3.266A6.567 6.567 0 0 1 3.235.875 6.313 6.313 0 0 1 6.5 0c1.187 0 2.276.292 3.266.875a6.567 6.567 0 0 1 2.359 2.36c.583.989.875 2.078.875 3.265 0 1.5-.458 2.833-1.375 4h.5c.208 0 .385.073.531.219l3.125 3.125zM6.5 10.5c.73 0 1.401-.177 2.016-.531a3.891 3.891 0 0 0 1.453-1.453A3.966 3.966 0 0 0 10.5 6.5c0-.73-.177-1.401-.531-2.016a3.891 3.891 0 0 0-1.453-1.453A3.966 3.966 0 0 0 6.5 2.5c-.73 0-1.401.177-2.016.531a3.891 3.891 0 0 0-1.453 1.453A3.966 3.966 0 0 0 2.5 6.5c0 .73.177 1.401.531 2.016a3.891 3.891 0 0 0 1.453 1.453A3.966 3.966 0 0 0 6.5 10.5z" fill-rule="evenodd"/></svg>
                        </span>
                    </a>
                </div>
            </div>
            <div class="list-container scroll">
                <div class="list-section">
                    <div class="list-title">
                        <h2>Suggested</h2>
                    </div>
                    <ul class="list-items">
                        <li class="resource-entry">
                            <a href="#">
                                <span class="title">Twitter</span>
                                <span class="username">(@passbolt)</span>
                                <span class="url">https://www.twitter.com/auth/login</span>
                            </a>
                        </li>
<!--                        <li class="resource-entry">-->
<!--                            <a href="#">-->
<!--                                <span class="title">Mastodon</span>-->
<!--                                <span class="username">(@passbolt)</span>-->
<!--                                <span class="url">https://www.twitter.com/auth/login</span>-->
<!--                            </a>-->
<!--                        </li>-->
                    </ul>
                </div>
                <div class="list-section">
                    <div class="list-title">
                        <h2>Browse</h2>
                    </div>
                    <ul class="list-items">
                        <li class="filter-entry">
                            <a href="#filters">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="filter icon"><path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/></svg>
                                </span>
                                <span class="filter">Filters</span>
                            </a>
                        </li>
                        <li class="filter-entry">
                            <a href="#groups">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-label="group icon"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/></svg>
                                </span>
                                <span class="filter">Groups</span>
                            </a>
                        </li>
                        <li class="filter-entry">
                            <a href="#tags">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-label="tags icon"><path d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"/></svg>
                                </span>
                                <span class="filter">Tags</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="submit-wrapper">
                <a id="createSubmit" href="#" class="button primary big full-width" role="button">create new</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>