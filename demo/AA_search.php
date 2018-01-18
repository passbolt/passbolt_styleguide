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
<div id="container" class="page search">
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
                    <div class="col7">
                        <h1>Search results</h1>
                        <ul id="search-results" class="search-results">
                            <li>
                                <h2><a href="/hosting/install.html">Install passbolt server component</a></h2>
                                <a href="https://help.passbolt.com/hosting/install" class="url">
                                    https://help.passbolt.com/hosting/install
                                </a>
                                <p>
                                    How to install passbolt on your server. Introduction    Passbolt is reported
                                    to work on a large variety of operating system configurations. Therefore
                                    this help page is a generic guide...
                                </p>
                            </li>
                            <li>
                                <h2><a href="/hosting/backup.html">Backing up a passbolt installation</a></h2>
                                <a href="https://help.passbolt.com/hosting/backup" class="url">
                                    https://help.passbolt.com/hosting/backup
                                </a>
                                <p>
                                    How to update passbolt on your server. Backing up passbolt
                                    Making regular backups is a critical aspect of managing a passbolt instance.
                                    Because passbolt stores important informatio...
                                </p>
                            </li>
                            <li>
                                <h2><a href="/hosting/nope.html">Backing up a passbolt installation</a></h2>
                                <a href="https://help.passbolt.com/hosting/nope" class="url">
                                    https://help.passbolt.com/hosting/backup1
                                </a>
                                <p>
                                    How to update passbolt on your server. Backing up passbolt
                                    Making regular backups is a critical aspect of managing a passbolt instance.
                                    Because passbolt stores important informatio...
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="col4 push1 last">
                        <div class="message tldr notice">
                            <p>Not finding what you are looking for? You can also ask the community on the forum.</p>
                            <a href="#" class="button privary">Ask away!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>