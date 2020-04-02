<?php include('includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="alpha version">
<head>
    <meta charset="utf-8">
    <title>Frequently Asked Questions | Passbolt</title>
    <?php include('includes/meta/AA_meta.php'); ?>
    <link rel="stylesheet" type="text/css" href="src/css/help.css" />
</head>
<body id="faq-list">
<div id="container" class="help page help-home background">
    <!-- first header -->
    <?php include('includes/headers/AA_header.php'); ?>

    <!-- second header -->
    <div class="header second">
        <?php include('includes/headers/AA_logo.php'); ?>
        <div class="col2 search-wrapper">
            <h2 class="visuallyhidden">Help Search</h2>
            <div>
                <form class="search ready" action="/search.html" method="get">
                    <div class="input required">
                        <label for="search-box">Search</label>
                        <input id="search-box" name="query" maxlength="64" placeholder="Help search" class="fuzzy-search" type="search">
                    </div>
                    <button value="search">
                    <span class="svg-icon icon-only search">
                        <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
                    </span>
                        <span class="text visuallyhidden">Search</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="col3">
            <div class="edit-on-github">
                <a href="https://github.com/passbolt/passbolt_help/edit/master/{{ page.path }}" class="button">
                    <i class="fa fa-github-alt fa-fw"></i> Edit on github</a>
            </div>
        </div>
    </div>

    <div class="panel main">
        <!-- wizard steps -->
        <div class="panel left">
            <div class="navigation-help wizard scrollspy" role="navigation">
                <ul class="nav">
                    <li>
                        <h2>Getting started</h2>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    <li>
                        <a href="#">End user manual</a>
                    </li>
                    <li>
                        <a href="#">Report a bug</a>
                    </li>
                    <li>
                        <h2>Advanced topics</h2>
                    </li>
                    <li>
                        <a href="#">Administrator manual</a>
                    </li>
                    <li>
                        <a href="#">Technical doc</a>
                    </li>

                    <li>
                        <a href="#">Small prints</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- main -->
        <div class="panel middle" data-spy="scroll" data-target=".scrollspy">
            <div class="grid grid-responsive-12">
                <div class="row">
                    <div class="col12">
                    <?php $_GET['breadcrumbs'] = array(
                                'Home' => '/',
                                'Help' => '/help'
                          );
                    include('includes/AA_breadcrumbs.php'); ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col12">
                        <h2>Getting started</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col4">
                        <a class="tile first" href="AA_legal_terms.php">
                            <span class="tile-teaser"><i class="fa fa-compass fa-fw"></i></span>
                            <span class="tile-title">FAQ</span>
                            <span class="tile-description">Everybody have to starts somewhere.</span>
                        </a>
                    </div>
                    <div class="col4">
                        <a class="tile" href="AA_legal_terms.php">
                            <span class="tile-teaser"><i class="fa fa-life-saver fa-fw"></i></span>
                            <span class="tile-title">End user manual</span>
                            <span class="tile-description">A quick how-to for basic tasks in passbolt.</span>
                        </a>
                    </div>
                    <div class="col4 last">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-firefox fa-fw"></i></span>
                            <span class="tile-title">Firefox plugin</span>
                            <span class="tile-description">We will put this one on your tab!</span>
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col4">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-bug fa-fw"></i></span>
                            <span class="tile-title">Found a bug?</span>
                            <span class="tile-description">Search for existing bugs, and report new ones!</span>
                        </a>
                    </div>
                    <div class="col4">
                        <a class="tile" href="mailto:contact@passbolt.com">
                            <span class="tile-teaser"><i class="fa fa-hand-peace-o fa-fw"></i></span>
                            <span class="tile-title">Want to talk to a human?</span>
                            <span class="tile-description">It's ok to send us an email.</span>
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col12">
                        <h2>Advanced topics</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col4 ">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-terminal fa-fw"></i></span>
                            <span class="tile-title">CLI Client</span>
                            <span class="tile-description">$ sudo make me a sandwitch</span>
                        </a>
                    </div>
                    <div class="col4">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-gears fa-fw"></i></span>
                            <span class="tile-title">Administrator manual</span>
                            <span class="tile-description">Need to host or administer Passbolt?</span>
                        </a>
                    </div>
                    <div class="col4 last">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-shield fa-fw"></i></span>
                            <span class="tile-title">Security</span>
                            <span class="tile-description">Risks and mitigation strategies</span>
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col4">
                        <a class="tile" href="#">
                            <span class="tile-teaser"><i class="fa fa-code fa-fw"></i></span>
                            <span class="tile-title">Technical documentation</span>
                            <span class="tile-description">Want to learn how passbolt works?</span>
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col12">
                        <h2>Other topics</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col4">
                        <a class="tile" href="AA_legal_terms.php">
                            <span class="tile-teaser"><i class="fa fa-balance-scale fa-fw"></i></span>
                            <span class="tile-title">Legal small prints</span>
                            <span class="tile-description">Read our terms and conditions & privacy policy.</span>
                        </a>
                    </div>
                    <div class="col4 last">
                        <a class="tile" href="#">
                            <div class="ribbon"><span>PRO</span></div>
                            <span class="tile-teaser"><i class="fa fa-balance-scale fa-fw"></i></span>
                            <span class="tile-title">A very pro card</span>
                            <span class="tile-description">Wait. Are you really a pro?</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include('includes/footers/AA_footer.php'); ?>
</div>
</body>
</html>