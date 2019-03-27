<?php include('../_includes/bootstrap.php'); ?><!doctype html>
<html class="passbolt ce edition" lang="en">
<head>
    <meta charset="utf-8">
    <title>Passbolt - Quick Access</title>
    <?php if (!isset($base)) { $base = '../../'; } ?>
    <base href="<?= $base; ?>">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="src/img/webroot/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="src/css/themes/<?= $theme; ?>/ext_quickaccess.css">
    <script type="text/javascript" src="src/js/simple-scrollbar.js"></script>
    <style>
        .container-item {
            height:500px;
            float:left;
        }
        .container-wrapper {
            box-sizing: border-box;
            width:26rem;
            margin-top:3em;
            box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
            margin-left:4em;
            margin-bottom:5em;
        }
    </style>
</head>
<body>
<div class="container-item">
<div class="container-wrapper">
    <?php include('../includes/quickaccess/quickaccess_login.php'); ?>
</div>
</div>
<div class="container-item">
<div class="container-wrapper">
    <?php include('../includes/quickaccess/quickaccess_passphrase.php'); ?>
</div>
</div>
<div class="container-item">
<div class="container-wrapper">
    <?php include('../includes/quickaccess/quickaccess_passphrase_wrong.php'); ?>
</div>
</div>
<div class="container-item">
<div class="container-wrapper">
    <?php include('../includes/quickaccess/quickaccess_search_results.php'); ?>
</div>
</div>
</div>
<div class="container-item">
    <div class="container-wrapper">
        <?php include('../includes/quickaccess/quickaccess_search_empty.php'); ?>
    </div>
</div>

<div class="container-item">
    <div class="container-wrapper">
        <?php include('../includes/quickaccess/quickaccess_resource_create.php'); ?>
    </div>
</div>
<div class="container-item">
    <div class="container-wrapper">
        <?php include('../includes/quickaccess/quickaccess_search_filters.php'); ?>
    </div>
</div>
<div class="container-item">
    <div class="container-wrapper">
        <?php include('../includes/quickaccess/quickaccess_search_filters_results.php'); ?>
    </div>
</div>
<div class="container-item">
<div class="container-wrapper">
    <?php include('../includes/quickaccess/quickaccess_resource_view.php'); ?>
</div>
</div>
</body>
</html>