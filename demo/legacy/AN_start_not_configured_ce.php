<?php include('_includes/bootstrap.php'); ?><!doctype html>
<html class="alpha version no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt | The open source password manager for teams</title>
    <?php include('includes/meta/AN_meta_setup.php'); ?>
</head>
<body>
<div id="container" class="page start">
    <?php include('includes/headers/AN_header_first_setup.php'); ?>

    <div class="page-row">
        <div class="grid grid-responsive-12">
            <div class="row">
                <div class="col12 last intro">
                    <h1>Passbolt is not configured yet!</h1>
                    <h2>If you see this page, it means that passbolt is present on your server but not configured. You can configure it using one of the two methods below.</h2>
                </div>
            </div>
            <div class="row">
                <div class="col6">
                    <div class="big-choice">
                        <h3>Manual configuration</h3>
                        <p>
                            Choose this option if you want to configure passbolt step by step manually following the documentation.
                        </p>
                        <a href="https://help.passbolt.com/hosting/install" target="_blank" rel="noopener" class="dim button">
                            <i class="fa fa-cogs fa-fw"></i>  Follow the documentation
                        </a>
                    </div>
                </div>
                <div class="col6 last">
                    <div class="big-choice">
                        <div class="ribbon"><span>PRO</span></div>
                        <h3>Wizard configuration</h3>
                        <p>
                            Don't want the hassle of a manual configuration?
                            Passbolt Pro includes a configuration wizard that will get you started in minutes.
                        </p>
                        <a href="https://www.passbolt.com/services/pro" target="_blank" rel="noopener" class="button primary">
                            <i class="fa fa-cubes fa-fw"></i> Upgrade to passbolt pro
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