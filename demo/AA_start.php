<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AA_meta.php'); ?>
	<?php include('includes/headers/AA_header_scripts.php'); ?>
</head>
<body>
<div id="container" class="page start">
    <?php include('includes/headers/AA_header.php'); ?>

    <div class="page-row">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12 last intro">
                    <h1>How would you like to use passbolt?</h1>
                    <h2>Your passbolt browser extension is not configured to point to any server right now.<br>
                        Passbolt requires a server to work.
                        So let's take a few minutes to get you started.
                    </h2>
                </div>
            </div>
            <div class="row">
                <div class="col6">
                    <div class="big-choice">
                        <h3>Cloud hosting</h3>
                        <p>
                            Choose this option if you do not have your own server, and you want us
                            to take care of the setup and maintenance for you.
                        </p>
                        <a href="#" class="dim button"><i class="fa fa-cloud-upload fa-fw"></i>  Coming soon!</a>
                    </div>
                </div>
                <div class="col6 last">
                    <div class="big-choice">
                        <div class="ribbon"><span>POPULAR</span></div>
                        <h3>Passbolt demo</h3>
                        <p>
                            Choose this option if you want to
                            quickly try out passbolt. Make sure you use a throw away email.
                            Do not store sensitive data on the demo!
                        </p>
                        <a href="#" class="button primary">Try with the demo</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col6">
                    <div class="big-choice">
                        <h3>Self hosted</h3>
                        <p>
                            If you already have your own server running, please follow the setup link
                            in your mailbox. Otherwise you can install a new server.
                        </p>
                        <a href="#" class="button dim"><i class="fa fa-book fa-fw"></i> Installation manual</a>
                    </div>
                </div>
                <div class="col6 last">
                    <div class="big-choice help">
                        <h3>Hmm... Help?</h3>
                        <p>You are not sure why you landed here or you would like to get some more information first.
                            Don't worry we got your back.</p>
                        <a href="#" class="button"><i class="fa fa-life-bouy fa-fw"></i> Online help</a> or
                        <a href="#">ask the community</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include('includes/AN_footer.php'); ?>
</div>
</body>
</html>