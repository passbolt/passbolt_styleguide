<!doctype html>
<html lang="en" >
<head>
    <meta charset="utf-8">
    <title>Frequently Asked Questions | Passbolt</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="../src/css/help.css">
</head>
<body>
<div id="container" class="page help search background">
    <!-- first header -->
    <?php include('includes/headers/AA_header.php'); ?>

    <!-- second header -->
    <div class="header second">
        <?php include('includes/AN_logo.php'); ?>
        <?php include('includes/AA_search.php'); ?>
    </div>

    <div class="panel main">
        <!-- wizard steps -->
        <div class="panel left">
            <!-- todo -->
        </div>
        <!-- main -->
        <div class="panel middle" data-spy="scroll" data-target=".scrollspy">
            <div class="grid grid-responsive-12">
                <div class="row">
                    <div class="col12">
                        <?php $_GET['breadcrumbs'] = array(
                            'home' => '/',
                            'help' => '/help',
                            'search' => '/search'
                        );
                        include('includes/LU_breadcrumbs.php'); ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col7 last">
                        <h2>Search results</h2>
                        <ul id="search-results" class="search-results">
                            <li class="no-result">
                                <h4>Oh, no! Your search did not match any documents...</h4>
                                <p>Here is a couple of suggestions:</p>
                                <ul class="suggestions">
                                    <li>
                                    Try on <a href="https://duckduckgo.com/?q=passbolt&t=hy&ia=web">duck duck go!</a>
                                    The search engine that doesn't track you.
                                    </li>
                                    <li>
                                        Make sure that all words are spelled correctly.
                                    </li>
                                    <li>
                                        Try more general keywords.
                                    </li>
                                    <li>
                                        Try fewer keywords.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>