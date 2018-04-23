<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html lang="en" class="alpha version">
<head>
    <meta charset="utf-8">
    <title>Frequently Asked Questions | Passbolt</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="../src/css/help.css">
    <script src="../src/js/jquery-3.3.1.min.js"></script>
    <script src="../src/js/bootstrap-scrollspy.js"></script>
	<script src="../src/js/greedynav.js"></script>
</head>
<body id="faq-list">
<div id="container" class="help page help-home background">
    <!-- first header -->
    <?php include('includes/headers/AA_header.php'); ?>

    <!-- second header -->
    <div class="header second">
        <?php include('includes/AN_logo.php'); ?>
        <div class="col2 search-wrapper">
            <h2 class="visuallyhidden">Help Search</h2>
            <div>
                <form class="search ready" action="/search.html" method="get">
                    <div class="input required">
                        <label for="search-box">Search</label>
                        <input id="search-box" name="query" maxlength="64" placeholder="Help search" class="fuzzy-search" type="search">
                    </div>
                    <button value="search">
                        <i class="fa fa-fw fa-search"></i>
                        <span class="text visuallyhidden">search</span>
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
            <div class="navigation wizard scrollspy" role="navigation">
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
                                'home' => '/',
                                'help' => '/help'
                          );
                    include('includes/LU_breadcrumbs.php'); ?>
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
    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>